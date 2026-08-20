'use client';

import { graphQLRequests, tokenApi, TOKEN_LOGO_URL } from '@/constants/api';
import { fetchTokenList } from '@/constants/apiServer';
import {
  LOGO_URL,
  SINGLE_CHAIN_ID,
  TITLE,
  TWITTER_URL,
  WIDGET_CURRENT_CONFIG,
} from '@/constants/config';
import { useFetchTokenList } from '@/hooks/useFetchTokenList';
import { useWidgetRouterSubscribe } from '@/hooks/useWidgetRouterSubscribe';
import { submitUserTxTracking } from '@/submission/submitTx/submitUserTxTracking';
import { StateText } from '@/submission/types';
import { generateProxyUrl } from '@/utils/imgProxy';
import { useGlobalStatus } from '@/utils/useGlobalStatus';
import { SwapTokenChangeContext } from './SwapTokenChangeContext';
import { useWalletStore } from '@dodoex/wallet-web3';
import { useQuery } from '@tanstack/react-query';
import {
  WidgetProps,
  MetadataFlag as MetadataFlagWidget,
  UnstyleWidget,
  Message,
  TokenInfo,
} from '@dodoex/widgets';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSubmitTxKey(metadata: Record<string, any>, brief?: string) {
  if (!metadata || !Object.keys(metadata).length) return null;
  let result = '';
  Object.keys(metadata).some((key) => {
    switch (key) {
      case MetadataFlagWidget.approve:
        result = `common.approve.brief ${brief?.split(' ')?.[1] ?? ''}`;
        return true;
      case MetadataFlagWidget.reset:
        result = `common.approve.resetBrief ${brief?.split(' ')?.[1] ?? ''}`;
        return true;
      case MetadataFlagWidget.swap:
        result = 'tradingCard.submissionBrief';
        return true;
      case MetadataFlagWidget.crossChain:
        result = 'bridge.order.execute-bridge';
        return true;
      case MetadataFlagWidget.addLiquidity:
        result = 'liquidity.operate.title';
        return true;
      case MetadataFlagWidget.removeLiquidity:
        result = 'liquidity.operate.remove.title';
        return true;
      case MetadataFlagWidget.createDPPPool:
      case MetadataFlagWidget.createDSPPool:
      case MetadataFlagWidget.createDVMPool:
      case MetadataFlagWidget.createGSPPool:
        result = 'pool.my-pools.create-a-pool';
        return true;
      case MetadataFlagWidget.stakeMining:
        result = 'mining.stake';
        return true;
      case MetadataFlagWidget.unstakeMining:
        result = 'mining.submit.remove-title';
        return true;
      case MetadataFlagWidget.claimMining:
        result = 'mining.deposit.receive-reward';
        return true;
      case MetadataFlagWidget.submissionCreateMetaKey:
        result = 'nav.create-mining';
        return true;
      case MetadataFlagWidget.createAMMV2Position:
        result = 'pool.amm-v2.create.title';
        return true;
      case MetadataFlagWidget.removeLiqidityAMMV2Position:
        result = 'pool.amm-v2.remove-liquidity.title';
        return true;
      case MetadataFlagWidget.addLiquidityAMMV2Position:
        result = 'pool.amm-v2.add-liquidity.title';
        return true;
      case MetadataFlagWidget.createAMMV3Pool:
        result = 'pool.amm-v3.create.title';
        return true;
      case MetadataFlagWidget.addAMMV3Pool:
        result = 'pool.amm-v3.add-liquidity.title';
        return true;
      case MetadataFlagWidget.removeAMMV3Pool:
        result = 'pool.amm-v3.remove-liquidity.title';
        return true;
      case MetadataFlagWidget.claimAMMV3Pool:
        result = 'pool.amm-v3.receive-reward.title';
        return true;

      default:
        return false;
    }
  });
  return result;
}

export function getTokenLogoUrl({
  chainId,
  address,
  width: widthProps,
  height: heightProps,
}: {
  chainId?: number | null;
  address?: string | null;
  width?: number;
  height?: number;
}) {
  let logoUrl = '';
  if (address && chainId) {
    logoUrl = `${TOKEN_LOGO_URL}/${chainId}/${address.toLocaleLowerCase()}`;
    const devicePixelRatio =
      typeof document !== 'undefined' ? (window.devicePixelRatio ?? 3) : 3;

    const width = widthProps
      ? String(Math.round(widthProps * devicePixelRatio))
      : undefined;
    const height = heightProps
      ? String(Math.round(heightProps * devicePixelRatio))
      : undefined;
    logoUrl = generateProxyUrl({
      url: logoUrl,
      height,
      width,
    });
  }
  return logoUrl;
}

const ShownFollowXKey = 'ShownFollowXKey';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const LAST_FROM_TOKEN_KEY = 'DODO_WIDGET_LAST_FROM_TOKEN';
const LAST_TO_TOKEN_KEY = 'DODO_WIDGET_LAST_TO_TOKEN';

function getErrorSummary(error: unknown) {
  if (!error || typeof error !== 'object') {
    return { message: String(error) };
  }
  const value = error as {
    code?: string;
    message?: string;
    reason?: string;
  };
  return {
    code: value.code,
    reason: value.reason,
    message: value.message,
  };
}

type WidgetPropsWithUrlTokens = WidgetProps & {
  urlFromTokenAddress?: string;
  urlToTokenAddress?: string;
  urlFromTokenSymbol?: string;
  urlToTokenSymbol?: string;
};

function ExecutionDialogExtra() {
  const shownFollowX = window.localStorage.getItem(ShownFollowXKey);
  if (shownFollowX) {
    return null;
  }

  return (
    <div
      className="flex items-center p-3 w-[300px] justify-between bg-[#326AFD1A] rounded-xl cursor-pointer mt-6"
      onClick={() => {
        window.localStorage.setItem(ShownFollowXKey, '1');
        window.open(TWITTER_URL, '_blank');
      }}
    >
      <div className="flex flex-col">
        <div className="text-sm text-active mb-[2px]">Follow FaroSwap</div>
        <div className="text-xs text-secondary">
          For upcoming Points&Rewards
        </div>
      </div>
      <div className="flex items-center justify-center w-16 h-8 bg-primary rounded-3xl">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3019 7.92451L15.399 1.99951H14.1912L9.76531 7.14411L6.23041 1.99951H2.15332L7.49879 9.77905L2.15332 15.9923H3.36125L8.03504 10.5595L11.7682 15.9923H15.8452L10.3016 7.92451H10.3019ZM8.64746 9.84759L8.10585 9.07292L3.79648 2.90882H5.65178L9.1295 7.88345L9.6711 8.65811L14.1917 15.1244H12.3364L8.64746 9.84789V9.84759Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Widget({
  children,
  tokenList: tokenListProps,
  initialDataTokenList,
  urlFromTokenAddress,
  urlToTokenAddress,
  urlFromTokenSymbol,
  urlToTokenSymbol,
  ...props
}: React.PropsWithChildren<
  WidgetPropsWithUrlTokens & {
    initialDataTokenList?: Awaited<ReturnType<typeof fetchTokenList>>['data'];
  }
>) {
  const { provider, account, chainId } = useWalletStore();
  useWidgetRouterSubscribe();

  const walletState = React.useMemo(
    () => ({ account, chainId, provider }),
    [account, chainId, provider],
  );

  const { tokenList: tokenListClient, isPending: isTokenListPending } =
    useFetchTokenList({
      initialData: initialDataTokenList,
    });
  const availableTokenList = React.useMemo(
    () =>
      tokenListClient.length > 0
        ? tokenListClient
        : Array.isArray(tokenListProps)
          ? tokenListProps
          : [],
    [tokenListClient, tokenListProps],
  );
  const urlFromTokenQueryConfig = tokenApi.getFetchTokenQuery(
    SINGLE_CHAIN_ID,
    urlFromTokenAddress,
    ZERO_ADDRESS,
  );
  const urlToTokenQueryConfig = tokenApi.getFetchTokenQuery(
    SINGLE_CHAIN_ID,
    urlToTokenAddress,
    ZERO_ADDRESS,
  );
  const urlFromTokenQuery = useQuery({
    ...urlFromTokenQueryConfig,
    enabled: !!urlFromTokenAddress,
    queryFn: async () => {
      console.info('[swap-url-token] Fetching from address', {
        address: urlFromTokenAddress,
      });
      try {
        const token = await urlFromTokenQueryConfig.queryFn();
        console.info('[swap-url-token] Fetched from address', { token });
        return token;
      } catch (error) {
        console.error('[swap-url-token] Failed to fetch from address', {
          address: urlFromTokenAddress,
          error: getErrorSummary(error),
        });
        throw error;
      }
    },
  });
  const urlToTokenQuery = useQuery({
    ...urlToTokenQueryConfig,
    enabled: !!urlToTokenAddress,
    queryFn: async () => {
      console.info('[swap-url-token] Fetching to address', {
        address: urlToTokenAddress,
      });
      try {
        const token = await urlToTokenQueryConfig.queryFn();
        console.info('[swap-url-token] Fetched to address', { token });
        return token;
      } catch (error) {
        console.error('[swap-url-token] Failed to fetch to address', {
          address: urlToTokenAddress,
          error: getErrorSummary(error),
        });
        throw error;
      }
    },
  });
  const urlFromSymbolToken = availableTokenList.find(
    (token) => token.symbol.toLowerCase() === urlFromTokenSymbol?.toLowerCase(),
  );
  const urlToSymbolToken = availableTokenList.find(
    (token) => token.symbol.toLowerCase() === urlToTokenSymbol?.toLowerCase(),
  );
  const defaultFromToken =
    props.defaultFromToken ??
    urlFromTokenQuery.data ??
    urlFromSymbolToken ??
    undefined;
  const defaultToToken =
    props.defaultToToken ??
    urlToTokenQuery.data ??
    urlToSymbolToken ??
    undefined;
  const isUrlTokenLoading =
    (!!urlFromTokenAddress && urlFromTokenQuery.isPending) ||
    (!!urlToTokenAddress && urlToTokenQuery.isPending) ||
    (!!urlFromTokenSymbol && isTokenListPending) ||
    (!!urlToTokenSymbol && isTokenListPending);
  const hasUrlDefaultFromToken = Boolean(
    props.defaultFromToken || urlFromTokenAddress || urlFromTokenSymbol,
  );
  const hasUrlDefaultToToken = Boolean(
    props.defaultToToken || urlToTokenAddress || urlToTokenSymbol,
  );
  const hasUrlDefaultToken = hasUrlDefaultFromToken || hasUrlDefaultToToken;
  const tokenList = React.useMemo(() => {
    const tokens = availableTokenList;
    const defaultTokens = [defaultFromToken, defaultToToken].filter(
      (token): token is NonNullable<typeof token> => !!token,
    );

    return [
      ...tokens,
      ...defaultTokens.filter(
        (defaultToken) =>
          !tokens.some(
            (token) =>
              token.chainId === defaultToken.chainId &&
              token.address.toLowerCase() ===
                defaultToken.address.toLowerCase(),
          ),
      ),
    ];
  }, [availableTokenList, defaultFromToken, defaultToToken]);
  const fromTokenRef = React.useRef(defaultFromToken);
  const toTokenRef = React.useRef(defaultToToken);
  const availableTokenListRef = React.useRef(availableTokenList);
  const initialTokenChangeSidesRef = React.useRef(new Set<'from' | 'to'>());
  const preserveInitialUrlRef = React.useRef({ from: false, to: false });
  const [isSwapReady, setIsSwapReady] = React.useState(!hasUrlDefaultToken);

  React.useEffect(() => {
    console.info('[swap-url-token] Resolved URL token state', {
      urlFromTokenAddress,
      urlToTokenAddress,
      urlFromTokenSymbol,
      urlToTokenSymbol,
      fromQueryStatus: urlFromTokenQuery.status,
      toQueryStatus: urlToTokenQuery.status,
      fromQueryData: urlFromTokenQuery.data,
      toQueryData: urlToTokenQuery.data,
      fromSymbolToken: urlFromSymbolToken,
      toSymbolToken: urlToSymbolToken,
      defaultFromToken,
      defaultToToken,
      tokenListSize: tokenList.length,
      tokenListContainsDefaultFrom: defaultFromToken
        ? tokenList.some(
            (token) =>
              token.chainId === defaultFromToken.chainId &&
              token.address.toLowerCase() ===
                defaultFromToken.address.toLowerCase(),
          )
        : false,
      tokenListContainsDefaultTo: defaultToToken
        ? tokenList.some(
            (token) =>
              token.chainId === defaultToToken.chainId &&
              token.address.toLowerCase() ===
                defaultToToken.address.toLowerCase(),
          )
        : false,
      isUrlTokenLoading,
      isSwapReady,
    });
  }, [
    defaultFromToken,
    defaultToToken,
    isSwapReady,
    isUrlTokenLoading,
    tokenList,
    urlFromTokenAddress,
    urlFromTokenQuery.data,
    urlFromTokenQuery.status,
    urlFromTokenSymbol,
    urlFromSymbolToken,
    urlToTokenAddress,
    urlToTokenQuery.data,
    urlToTokenQuery.status,
    urlToTokenSymbol,
    urlToSymbolToken,
  ]);

  React.useEffect(() => {
    availableTokenListRef.current = availableTokenList;
  }, [availableTokenList]);

  React.useLayoutEffect(() => {
    if (hasUrlDefaultFromToken) {
      window.localStorage.removeItem(LAST_FROM_TOKEN_KEY);
    }
    if (hasUrlDefaultToToken) {
      window.localStorage.removeItem(LAST_TO_TOKEN_KEY);
    }
  }, [hasUrlDefaultFromToken, hasUrlDefaultToToken]);

  React.useLayoutEffect(() => {
    initialTokenChangeSidesRef.current.clear();
    preserveInitialUrlRef.current = {
      from: hasUrlDefaultFromToken,
      to: hasUrlDefaultToToken,
    };
  }, [
    defaultFromToken?.address,
    defaultFromToken?.chainId,
    defaultToToken?.address,
    defaultToToken?.chainId,
    hasUrlDefaultFromToken,
    hasUrlDefaultToToken,
  ]);

  React.useEffect(() => {
    if (!hasUrlDefaultToken) {
      setIsSwapReady(true);
      return;
    }
    if (isUrlTokenLoading) {
      setIsSwapReady(false);
      return;
    }

    setIsSwapReady(false);
    const frame = window.requestAnimationFrame(() => {
      setIsSwapReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hasUrlDefaultToken, isUrlTokenLoading, tokenList]);

  React.useEffect(() => {
    if (defaultFromToken) {
      fromTokenRef.current = defaultFromToken;
    }
    if (defaultToToken) {
      toTokenRef.current = defaultToToken;
    }
  }, [defaultFromToken, defaultToToken]);

  const getUrlTokenParam = React.useCallback((token: TokenInfo) => {
    const isListed = availableTokenListRef.current.some(
      (listedToken) =>
        listedToken.chainId === token.chainId &&
        listedToken.address.toLowerCase() === token.address.toLowerCase(),
    );
    return isListed ? token.symbol : token.address;
  }, []);

  const updateSwapUrl = React.useCallback(() => {
    const fromToken = fromTokenRef.current;
    const toToken = toTokenRef.current;
    if (!fromToken || !toToken) {
      return;
    }
    window.history.replaceState(
      window.history.state,
      '',
      `/swap/${getUrlTokenParam(fromToken)}/${getUrlTokenParam(toToken)}`,
    );
  }, [getUrlTokenParam]);

  const handlePayTokenChange = React.useCallback(
    (token: TokenInfo) => {
      fromTokenRef.current = token;
      if (
        preserveInitialUrlRef.current.from &&
        !initialTokenChangeSidesRef.current.has('from')
      ) {
        initialTokenChangeSidesRef.current.add('from');
        return;
      }
      updateSwapUrl();
    },
    [updateSwapUrl],
  );

  const handleReceiveTokenChange = React.useCallback(
    (token: TokenInfo) => {
      toTokenRef.current = token;
      if (
        preserveInitialUrlRef.current.to &&
        !initialTokenChangeSidesRef.current.has('to')
      ) {
        initialTokenChangeSidesRef.current.add('to');
        return;
      }
      updateSwapUrl();
    },
    [updateSwapUrl],
  );

  return (
    <React.Suspense>
      <UnstyleWidget
        apikey={process.env.NEXT_PUBLIC_API_KEY}
        tokenList={tokenList}
        colorMode="light"
        width="100%"
        height="100%"
        crossChain
        walletState={walletState}
        // @ts-ignore
        graphQLRequests={graphQLRequests}
        defaultChainId={SINGLE_CHAIN_ID}
        onlyChainId={SINGLE_CHAIN_ID}
        noDocumentLink
        noSubmissionDialog
        onConnectWalletClick={() => {
          useGlobalStatus.setState({
            openConnectWallet: true,
          });
          return true;
        }}
        noPowerBy
        noUI
        noAutoConnect
        showSubmissionSubmittedDialog
        dappMetadata={{
          name: TITLE,
          logoUrl: LOGO_URL,
        }}
        onTxSubmit={async (tx, data) => {
          const key = getSubmitTxKey(data.metadata, data.brief);
          console.log(tx, data);
          if (!key) {
            console.error('metadata not matched', {
              tx,
              data,
            });
            return;
          }
          let safeTxHash: string | undefined;
          delete data.subtitle;
          if (useWalletStore.getState().connected?.isSafe) {
            safeTxHash = tx;
            // delete data.tx;
          }
          const account = useWalletStore.getState().account as string;
          const to = data.to || data.contract;
          const submitUserTxTrackingOptions = {
            key,
            hash: tx,
            chainId: data.chainId ?? useWalletStore.getState().chainId,
            from: data.from || account,
            account,
            to,
            nonce: data.nonce as number,
            extra: {
              safeTxHash,
              ...data,
              status: StateText.Running,
            },
          };
          const res = await submitUserTxTracking(submitUserTxTrackingOptions);
          if (res) {
            //
          }
        }}
        onTxSuccess={async (tx, data) => {
          const key = getSubmitTxKey(data.metadata, data.brief);
          if (!key) return;
          const account = useWalletStore.getState().account as string;
          const to = data.to || data.contract || undefined;
          const submitUserTxTrackingOptions = {
            key,
            hash: tx,
            chainId: data.chainId ?? useWalletStore.getState().chainId,
            from: data.from || account,
            account,
            nonce: data.nonce as number,
            to,
            extra: {
              status: StateText.Success,
              transactionHash: data.receipt.transactionHash,
              transactionReceipt: data.receipt,
            },
          };
          const res = await submitUserTxTracking(submitUserTxTrackingOptions);
          if (res) {
            //
          }
        }}
        onTxReverted={async (tx, data) => {
          const key = getSubmitTxKey(data.metadata, data.brief);
          if (!key) return;
          const account = useWalletStore.getState().account as string;
          const to = data.to || data.contract || undefined;
          const submitUserTxTrackingOptions = {
            key,
            hash: tx,
            chainId: data.chainId ?? useWalletStore.getState().chainId,
            from: data.from || account,
            account,
            to,
            nonce: data.nonce as number,
            extra: {
              status: StateText.Failed,
              transactionHash: data.receipt.transactionHash,
              transactionReceipt: data.receipt,
            },
          };
          const res = await submitUserTxTracking(submitUserTxTrackingOptions);
          if (res) {
          }
        }}
        onTxFail={async () => {
          // @ts-ignore
          if (typeof window !== 'undefined' && window.clarity) {
            // @ts-ignore
            window.clarity('event', `tx failed`);
          }
        }}
        getTokenLogoUrl={getTokenLogoUrl}
        executionDialogExtra={<ExecutionDialogExtra />}
        {...props}
        {...WIDGET_CURRENT_CONFIG}
        defaultFromToken={defaultFromToken}
        defaultToToken={defaultToToken}
      >
        <Message />
        <SwapTokenChangeContext.Provider
          value={{
            onPayTokenChange: handlePayTokenChange,
            onReceiveTokenChange: handleReceiveTokenChange,
          }}
        >
          {isSwapReady && children}
        </SwapTokenChangeContext.Provider>
      </UnstyleWidget>
    </React.Suspense>
  );
}

'use client';
import WalletIcon from '@/assets/icons/wallet.svg';
import { truncatePoolAddress } from '@/utils/address';
import { Trans } from '@lingui/macro';
import React, { useMemo } from 'react';
import { useWalletStore, WalletType } from '@dodoex/wallet-web3';
import {
  WalletDialog,
  WalletConnectProvider,
  LangProvider,
} from '@dodoex/wallet-web3-react';
import SingleChainLogo from '@/assets/logo/single-chain.svg';
import SingleChainBCLogo from '@/assets/logo/single-chain-bc.svg';
import { useGlobalStatus } from '@/utils/useGlobalStatus';
import { Loading } from '@dodoex/icons';
import Tooltip from '../Tooltip';
import { TransactionList } from './ActivityList';
import { useTransactionList } from '@/hooks/useTransactionList';
import { SINGLE_CHAIN_ID, SINGLE_CHAIN_NAME } from '@/constants/config';
import { walletWeb3 } from '@/utils/web3';
import { graphQLRequests } from '@/constants/api';
import SendTokenPage from './SendTokenPage';
import { getEtherscanPage } from '@dodoex/widgets';
import { basicTokenMap, ChainId } from '@dodoex/api';
import { getTokenLogoUrl } from '../Widget';
import { encryptFiatPriceToken } from '@dodoex/auth-web-sdk';
import { useFetchTokenList } from '@/hooks/useFetchTokenList';
import BigNumber from 'bignumber.js';
import { RpcProxyProvider } from '@/constants/RpcProxyProvider';

function WalletPendingBtn(props: React.PropsWithChildren) {
  const { account } = useWalletStore();
  const chainId = SINGLE_CHAIN_ID;
  const fetchTransactionQuery = useTransactionList({
    account,
    chainId,
  });
  const len = fetchTransactionQuery.pendingList.length;
  if (!len) return <>{props.children}</>;
  return (
    <Tooltip
      placement="bottom-end"
      title={
        <div className="w-[382px] overflow-y-auto">
          <TransactionList
            account={account}
            isLoading={
              fetchTransactionQuery.isLoading || fetchTransactionQuery.isPending
            }
            list={fetchTransactionQuery.pendingList}
          />
        </div>
      }
    >
      <button
        className="btn gap-2 primary"
        onClick={() => useGlobalStatus.setState({ openConnectWallet: true })}
      >
        <WalletIcon />
        {len}&nbsp;
        <Trans>pending...</Trans>
        <Loading className="w-5 text-primaryContract animate-spin" />
      </button>
    </Tooltip>
  );
}

export default function ConnectWalletBtn() {
  const account = useWalletStore((state) => state.account);
  const open = useGlobalStatus((state) => state.openConnectWallet);
  const { tokenList } = useFetchTokenList();
  const priorityWalletTypes = useMemo(
    () => [WalletType.OKX, WalletType.BinanceChain, WalletType.TopNod],
    [],
  );

  return (
    <>
      <WalletPendingBtn>
        <button
          className="btn gap-2 bg-paperDarkContrast text-xs md:text-sm"
          onClick={() => useGlobalStatus.setState({ openConnectWallet: true })}
        >
          <WalletIcon />
          {account ? (
            truncatePoolAddress(account)
          ) : (
            <Trans>Connect a wallet</Trans>
          )}
        </button>
      </WalletPendingBtn>
      {!!walletWeb3 && (
        <WalletConnectProvider
          value={{
            chainId: SINGLE_CHAIN_ID,
            // @ts-ignore
            graphQLRequests,
            tokenList,
            encryptFiatPriceToken,
            SendTokenPage,
            getChain: (chainId) => {
              return {
                name: SINGLE_CHAIN_NAME,
                scanUrl: getEtherscanPage(chainId),
                gasToken: basicTokenMap[chainId as ChainId],
                logo: <SingleChainLogo />,
                logoBg: <SingleChainBCLogo />,
              };
            },
            getTokenLogoUrl,
            loadAccountListEthBalance: async (accountList, chainId) => {
              const balanceMap: Map<string, number | null> = new Map();
              const provider = new RpcProxyProvider(undefined, chainId);
              const promiseList = accountList.map(async (account) => {
                const balance = await provider.getBalance(account);
                const balanceRes = new BigNumber(balance.toString())
                  .div(1e18)
                  .toNumber();
                balanceMap.set(account, balanceRes);
              });
              await Promise.all(promiseList);
              return balanceMap;
            },
          }}
        >
          <React.Suspense>
            <LangProvider locale="en">
              <WalletDialog
                open={open}
                onClose={() =>
                  useGlobalStatus.setState({ openConnectWallet: false })
                }
                walletWeb3={walletWeb3}
                priorityWalletType={priorityWalletTypes}
              />
            </LangProvider>
          </React.Suspense>
        </WalletConnectProvider>
      )}
    </>
  );
}

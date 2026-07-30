import SwapWidget from '@/components/SwapWidget';
import WidgetServer from '@/components/WidgetServer';
import { fetchTokenList } from '@/constants/apiServer';
import { SINGLE_CHAIN_ID } from '@/constants/config';
import { isAddress } from '@ethersproject/address';
import { TokenInfo } from '@dodoex/widgets';

/**
 * Resolve a listed token from a URL segment. Address parameters that are not
 * in tokenList are resolved client-side through ERC20_HELPER.isERC20.
 */
function resolveTokenFromParam(
  param: string | undefined,
  tokenList: TokenInfo[] | undefined,
): TokenInfo | undefined {
  if (!param || param === 'default') {
    return undefined;
  }
  const paramsArray = param.split('-');
  const hasChainId = paramsArray.length > 1 && Number(paramsArray[0]) > 0;
  const chainId = hasChainId ? Number(paramsArray[0]) : SINGLE_CHAIN_ID;
  const tokenIdentifier = hasChainId ? paramsArray.slice(1).join('-') : param;
  if (!tokenIdentifier) {
    return undefined;
  }
  const normalizedIdentifier = tokenIdentifier.toLowerCase();
  return tokenList?.find(
    (item) =>
      (!item.chainId || item.chainId === chainId) &&
      (item.symbol === tokenIdentifier ||
        item.address?.toLowerCase() === normalizedIdentifier),
  );
}

function getUnlistedTokenAddress(
  param: string | undefined,
  resolvedToken: TokenInfo | undefined,
): string | undefined {
  if (!param || resolvedToken) {
    return undefined;
  }

  const paramsArray = param.split('-');
  const hasChainId = paramsArray.length > 1 && Number(paramsArray[0]) > 0;
  const chainId = hasChainId ? Number(paramsArray[0]) : SINGLE_CHAIN_ID;
  const tokenAddress = hasChainId ? paramsArray.slice(1).join('-') : param;

  return chainId === SINGLE_CHAIN_ID && isAddress(tokenAddress)
    ? tokenAddress
    : undefined;
}

export default async function Page({
  params,
}: {
  params?: {
    from: string;
    to: string;
  };
}) {
  const { from, to } = params || {};
  const { tokenList } = await fetchTokenList();
  const defaultFromToken = resolveTokenFromParam(from, tokenList);
  const defaultToToken = resolveTokenFromParam(to, tokenList);

  return (
    <WidgetServer
      defaultFromToken={defaultFromToken}
      defaultToToken={defaultToToken}
      urlFromTokenAddress={getUnlistedTokenAddress(from, defaultFromToken)}
      urlToTokenAddress={getUnlistedTokenAddress(to, defaultToToken)}
    >
      <SwapWidget />
    </WidgetServer>
  );
}

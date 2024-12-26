import { tokenApi } from '@/constants/api';
import { ChainId, contractConfig } from '@dodoex/api';
import { useWalletStore } from '@dodoex/wallet-web3';
import { TokenInfo } from '@dodoex/widgets';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export function useFetchToken(
  token: TokenInfo | undefined | null,
  {
    contractAddress,
    skipQuery,
  }: {
    contractAddress?: string;
    skipQuery?: boolean;
  } = {},
) {
  const { account } = useWalletStore();
  const [chainId, proxyContractAddress] = React.useMemo(() => {
    if (!token) return [undefined, contractAddress];
    return [
      token.chainId,
      contractAddress ?? contractConfig[token.chainId as ChainId].DODO_APPROVE,
    ];
  }, [token, contractAddress]) as [number | undefined, string | undefined];

  const tokenQuery = useQuery(
    tokenApi.getFetchTokenQuery(
      // skip the query
      skipQuery ? undefined : chainId,
      token?.address,
      account,
      proxyContractAddress,
    ),
  );
  return tokenQuery;
}

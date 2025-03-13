import { graphQLRequests } from '@/constants/api';
import { fetchTokenList } from '@/constants/apiServer';
import { SINGLE_CHAIN_ID, ERC20_DOMAIN } from '@/constants/config';
import { TokenApi } from '@dodoex/api';
import { TokenInfo } from '@dodoex/widgets';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export function useFetchTokenList({
  initialData,
}: { initialData?: Awaited<ReturnType<typeof fetchTokenList>>['data'] } = {}) {
  const erc20Query = useQuery({
    ...graphQLRequests.getQuery(TokenApi.graphql.fetchErc20SwapCrossList, {
      where: {
        chainId: SINGLE_CHAIN_ID,
        page: 1,
        pageSize: 1000,
      },
    }),
    initialData,
  });
  const tokenList = React.useMemo(
    () =>
      erc20Query.data?.erc20_swapCrossChainList
        ?.filter(
          (token) =>
            !token?.domains?.length ||
            !ERC20_DOMAIN ||
            token?.domains?.some((domain) => domain?.name === ERC20_DOMAIN),
        )
        ?.map(
          (token) =>
            ({
              ...token,
              logoURI: token?.logoImg,
            }) as TokenInfo,
        ) ?? [],
    [erc20Query.data],
  );

  return {
    tokenList,
    ...erc20Query,
  };
}

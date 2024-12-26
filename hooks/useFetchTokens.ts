import { useQueries } from '@tanstack/react-query';
import { tokenApi } from '@/constants/api';
import BigNumber from 'bignumber.js';
import { TokenInfo } from '@dodoex/widgets';

type TokenInfoMap = Map<
  string,
  {
    balance: BigNumber;
    allowance: BigNumber;
  }
>;

export default function useFetchTokens({
  account,
  tokenList,
  blockNumber,
  skip,
}: {
  account: string | undefined;
  tokenList?: TokenInfo[];
  blockNumber?: number;
  skip?: boolean;
}) {
  const tokensQueries = useQueries({
    queries: (tokenList ?? []).map((token) => {
      const query = tokenApi.getFetchTokenQuery(
        token.chainId,
        token.address,
        account,
      );

      return {
        queryKey: blockNumber
          ? [...query.queryKey, blockNumber]
          : query.queryKey,
        enabled: query.enabled && !skip,
        queryFn: query.queryFn,
      };
    }),
    combine: (results) => {
      const tokenInfoMap = new Map() as TokenInfoMap;
      results.forEach((result) => {
        const itemData = result.data;
        if (itemData) {
          tokenInfoMap.set(`${itemData.chainId}-${itemData.address}`, itemData);
        }
      });
      return {
        tokenInfoMap,
        data: results.map((result) => result.data),
        isPending: results.some((result) => result.isPending),
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });

  return tokensQueries;
}

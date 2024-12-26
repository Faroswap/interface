import BigNumber from 'bignumber.js';
import React from 'react';
import { useFetchFiatPrice } from './useFetchFiatPrice';
import { getTokenFiatPriceList } from '@/constants/localstorage';
import { tokenApi } from '@/constants/api';
import { useQueryClient } from '@tanstack/react-query';
import useFetchTokens from './useFetchTokens';
import { isEqualWith } from 'lodash';
import { useFetchTokenList } from './useFetchTokenList';

type TokenResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof tokenApi.getFetchTokenQuery>['queryFn']>>
>;

export function useHasBalanceTokenList({
  account,
  chainId,
  visible,
}: {
  account: string | undefined;
  chainId: number;
  visible: boolean;
}) {
  const queryClient = useQueryClient();
  const [hasBalanceTokenList, setHasBalanceTokenList] = React.useState<
    TokenResult[]
  >([]);
  const fiatPriceQuery = useFetchFiatPrice(hasBalanceTokenList);

  const { tokenList } = useFetchTokenList();
  const fetchTokenQuery = useFetchTokens({
    account,
    tokenList,
    skip: !visible,
  });
  React.useEffect(() => {
    let time: NodeJS.Timeout;
    const commonKey = tokenApi
      .getFetchTokenQuery(chainId, undefined, account)
      .queryKey.filter((item) => !!item);
    const unSubscribe = queryClient.getQueryCache().subscribe((event) => {
      try {
        const isNotMatch = commonKey.some(
          (key) => !event.query.queryKey.includes(key),
        );
        if (!isNotMatch) {
          clearTimeout(time);
          time = setTimeout(() => {
            const tokenQueriesData = queryClient.getQueriesData<TokenResult>({
              queryKey: commonKey,
            });
            let newHasBalanceTokenList = [] as TokenResult[];
            const hasBalanceAddressSet = new Set<string>();
            tokenQueriesData.forEach((value) => {
              const token = value[1];
              if (
                token &&
                token.balance?.gt(0) &&
                !hasBalanceAddressSet.has(token.address)
              ) {
                hasBalanceAddressSet.add(token.address);
                newHasBalanceTokenList.push(token);
              }
            });
            newHasBalanceTokenList = newHasBalanceTokenList.sort((a, b) =>
              a.balance.gt(b.balance) ? -1 : 1,
            );
            if (
              !isEqualWith(
                newHasBalanceTokenList,
                hasBalanceTokenList,
                (newValue, oldValue, key) => {
                  if (key === 'balance' && BigNumber.isBigNumber(newValue)) {
                    return newValue.isEqualTo(oldValue);
                  }
                  return undefined;
                },
              )
            ) {
              setHasBalanceTokenList(newHasBalanceTokenList);
            }
          }, 100);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    });

    return () => {
      unSubscribe();
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient, account, chainId]);

  const tokenLoading = fetchTokenQuery.isLoading || fetchTokenQuery.isPending;

  const hasBalanceList = React.useMemo(() => {
    return hasBalanceTokenList
      .map((token) => {
        const fiatPriceBalance = fiatPriceQuery.data?.get(token.address)
          ? token.balance.times(fiatPriceQuery.data?.get(token.address) ?? 0)
          : undefined;
        return {
          ...token,
          fiatPriceBalance,
        };
      })
      .sort((a, b) => {
        if (a.fiatPriceBalance && b.fiatPriceBalance) {
          return a.fiatPriceBalance.gt(b.fiatPriceBalance) ? -1 : 1;
        }
        const cacheFiatPriceObject = getTokenFiatPriceList();
        const aFiatPrice = cacheFiatPriceObject[a.address];
        const bFiatPrice = cacheFiatPriceObject[b.address];
        if (!aFiatPrice || !bFiatPrice) return a.balance.gt(b.balance) ? -1 : 1;
        return a.balance.times(aFiatPrice).gt(b.balance.times(bFiatPrice))
          ? -1
          : 1;
      });
  }, [hasBalanceTokenList, fiatPriceQuery.data]);

  const allFiatPriceBalance = React.useMemo(() => {
    let result = new BigNumber(0);
    hasBalanceList.forEach((token) => {
      if (token.fiatPriceBalance) {
        result = result.plus(token.fiatPriceBalance);
      }
    });
    return result;
  }, [hasBalanceList]);

  return {
    tokenLoading: !!tokenLoading && !hasBalanceList.length,
    hasBalanceList,
    fiatPriceQuery,
    allFiatPriceBalance,
    allFiatPriceBalanceLoading:
      (fiatPriceQuery.isLoading && !!hasBalanceTokenList.length) ||
      tokenLoading,
  };
}

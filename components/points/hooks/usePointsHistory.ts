import { graphQLRequests } from '@/constants/api';
import { ERC20_DOMAIN, SINGLE_CHAIN_ID } from '@/constants/config';
import { graphql } from '@/gql';
import { useWalletStore } from '@dodoex/wallet-web3';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Tab } from '../pcTabs';
import React from 'react';

const document = graphql(`
  query FetchPointsHistory($where: Points_activityhistoryFilter) {
    points_activity_history(where: $where) {
      list {
        id
        activityId
        points
        time
        type
        inviteeAddress
      }
      page
      count
      pageSize
    }
  }
`);

export type Point = {
  activityId: number;
  id: number;
  points: string;
  time: number;
  type: string;
  inviteeAddress: string;
};

export function usePointsHistory({ sourceType }: { sourceType: Tab }) {
  const { account } = useWalletStore();
  // @ts-ignore
  const queryOptions = graphQLRequests.getInfiniteQuery(document, 'page', {
    where: {
      user: account?.toLowerCase(),
      chainId: SINGLE_CHAIN_ID,
      domain: ERC20_DOMAIN,
      sourceType,
      pageSize: 5,
    },
  });
  const fetchQuery = useInfiniteQuery({
    ...queryOptions,
    enabled: !!account,
    initialPageParam: 1,
    getNextPageParam: (item) => {
      const { page, pageSize, count } = item.points_activity_history ?? {};
      if (!page || !pageSize || !count) return null;
      let totalPage = Math.floor(count / pageSize);
      if (count % pageSize) {
        totalPage += 1;
      }
      if (page >= totalPage) return null;
      return page + 1;
    },
  });

  const pointHistory = React.useMemo(() => {
    const result = [] as Array<Point>;
    fetchQuery.data?.pages.forEach((item) => {
      item.points_activity_history?.list?.forEach((point) => {
        result.push(point as Point);
      });
    });
    return result;
  }, [fetchQuery.data]);

  return {
    ...fetchQuery,
    pointHistory,
  };
}

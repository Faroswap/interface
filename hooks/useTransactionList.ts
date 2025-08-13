import { graphQLRequests } from '@/constants/api';
import { StateText } from '@/submission/types';
import { SystemApi } from '@dodoex/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSyncOrderPendingList } from './useSyncOrderPendingList';
import React from 'react';
import { useGlobalStatus } from '@/utils/useGlobalStatus';

export type NoticeTransactionList = NonNullable<
  NonNullable<
    ReturnType<
      NonNullable<
        (typeof SystemApi.graphql.fetchNoticeCenterTransactionList)['__apiType']
      >
    >['notice_center_transactionList']
  >['list']
>;

export function useTransactionList({
  account,
  chainId,
}: {
  account: string | undefined;
  chainId?: number;
}) {
  const fetchQuery = useInfiniteQuery({
    ...graphQLRequests.getInfiniteQuery(
      SystemApi.graphql.fetchNoticeCenterTransactionList,
      'page',
      {
        where: {
          limit: 10,
          user: account,
          chainId,
          refreshNow: true,
        },
      },
    ),
    enabled: !!account,
    initialPageParam: 1,
    getNextPageParam: (item) => {
      const { page, limit, count } = item.notice_center_transactionList ?? {};
      if (!page || !limit || !count) return null;
      let totalPage = Math.floor(count / limit);
      if (count % limit) {
        totalPage += 1;
      }
      if (page >= totalPage) return null;
      return page + 1;
    },
  });

  const [list, pendingList] = React.useMemo(() => {
    const list = [] as NoticeTransactionList;

    fetchQuery.data?.pages?.forEach((page) => {
      page.notice_center_transactionList?.list?.forEach((item) => {
        if (!item?.extend?.safeTxHash) {
          list.push(item);
        }
      });
    });
    const pendingList =
      list.filter((item) => item?.extend.status === StateText.Running) ?? [];
    useGlobalStatus.setState({ showFollowX: list.length === 0 })
    return [list, pendingList];
  }, [fetchQuery.data]);

  useSyncOrderPendingList({
    pendingList,
  });

  return {
    ...fetchQuery,
    list,
    pendingList,
  };
}

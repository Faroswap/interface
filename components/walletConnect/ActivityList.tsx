import {
  NoticeTransactionList,
  useTransactionList,
} from '@/hooks/useTransactionList';
import {
  getTitleText,
  SubmissionStatusIcon,
  SubmissionTypeIcon,
} from '@/submission/module';
import { StateText } from '@/submission/types';
import { formatReadableTimeAgo } from '@/utils/time';
import { increaseArray } from '@/utils/utils';
import { EmptyDataIcon } from '@dodoex/components';
import { ArrowRight, Loading } from '@dodoex/icons';
import { useWalletStore } from '@dodoex/wallet-web3';
import { getEtherscanPage } from '@dodoex/widgets';
import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import { debounce } from 'lodash';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

export default function ActivityList({
  getScrollParent,
  fetchTransactionQuery,
}: {
  getScrollParent: () => HTMLDivElement | null;
  fetchTransactionQuery: ReturnType<typeof useTransactionList>;
}) {
  const { account } = useWalletStore();

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <InfiniteScroll
      useWindow={false}
      hasMore={fetchTransactionQuery.hasNextPage}
      threshold={300}
      getScrollParent={getScrollParent}
      loadMore={debounce(() => {
        if (
          fetchTransactionQuery.hasNextPage &&
          !fetchTransactionQuery.isFetchingNextPage
        ) {
          fetchTransactionQuery.fetchNextPage();
        }
      }, 500)}
    >
      <TransactionList
        account={account}
        isLoading={fetchTransactionQuery.isLoading}
        isFetchingNextPage={fetchTransactionQuery.isFetchingNextPage}
        list={fetchTransactionQuery.list}
      />
    </InfiniteScroll>
  );
}

export function TransactionList({
  account,
  isLoading,
  isFetchingNextPage,
  list,
}: {
  account: string | undefined;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  list: NoticeTransactionList;
}) {
  return (
    <>
      {isLoading && (
        <>
          {increaseArray(3).map((i) => (
            <div key={i} className="relative flex w-full pl-6 pr-12 py-5">
              <div className="absolute bottom-0 right-6 left-20 h-[1px] bg-border" />
              <div className="animate-pulse bg-skeleton rounded-full w-10 h-10" />
              <div className="ml-2 flex-1">
                <div className="animate-pulse bg-skeleton rounded-[2px] h-[22px]" />
                <div className="mt-1 animate-pulse bg-skeleton rounded-[2px] h-4 w-32" />
              </div>
            </div>
          ))}
        </>
      )}
      {!isLoading && !list.length && (
        <div className="flex items-center justify-center flex-col mt-14 gap-3 text-sm text-secondary">
          <EmptyDataIcon />
          <Trans>This is empty</Trans>
        </div>
      )}
      {!isLoading &&
        list?.map((item) => {
          if (!item?.key || !item.chainId) return null;
          const tx = item.extend?.tx;
          const status = item.extend?.status;
          let url = '';
          if (tx) {
            if (status === StateText.Warning && account) {
              url = getEtherscanPage(item.chainId, account, 'address');
            } else {
              url = getEtherscanPage(item.chainId, tx, 'tx');
            }
          }
          return (
            <div
              key={item.id}
              className={clsx('relative flex pl-5 py-4', {
                'cursor-pointer hover:bg-hover [&:not(:hover)>svg:last-child]:invisible':
                  url,
              })}
              onClick={() => {
                if (!url) return;
                window.open(url);
              }}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-paperContrast">
                <SubmissionTypeIcon brief={item.key} />
                <div className="absolute -bottom-1 -right-1 flex w-4 h-4 text-primary-contrastText bg-paperContrast border rounded-full">
                  <SubmissionStatusIcon status={status} />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center font-semibold">
                  {getTitleText(item.key, status)}
                </div>
                <div className="mt-3 text-xs text-secondary">
                  {formatReadableTimeAgo({
                    time: Number(item.createTime),
                  })}
                </div>
              </div>
              {url ? (
                <ArrowRight className="mr-6 w-[18px] h-[18px] self-center" />
              ) : (
                <div />
              )}
            </div>
          );
        })}
      {isFetchingNextPage ? (
        <div className="flex items-center justify-center gap-1 mt-4 text-secondary text-sm">
          <Loading className="w-5 text-active animate-spin" />
          <Trans>Loading more</Trans>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

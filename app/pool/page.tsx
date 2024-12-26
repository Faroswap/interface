'use client';
import Widget from '@/components/Widget';
import { PageType, PoolList, useRouterStore, Page } from '@dodoex/widgets';
import React from 'react';

export default function PoolPage({
  searchParams,
}: {
  searchParams: {
    tab: string;
  };
}) {
  React.useEffect(() => {
    if (useRouterStore.getState().page?.type !== PageType.Pool) {
      useRouterStore.getState().push({
        type: PageType.Pool,
        params: searchParams?.tab
          ? {
              tab: searchParams.tab,
            }
          : undefined,
      } as Page<PageType.Pool>);
    }
  }, [searchParams]);
  return (
    <div className="pb-10 overflow-hidden flex flex-col [&_.widget-module-container]:pb-0">
      <Widget>
        <PoolList
          params={
            searchParams.tab
              ? {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  tab: searchParams.tab as any,
                }
              : undefined
          }
        />
      </Widget>
    </div>
  );
}

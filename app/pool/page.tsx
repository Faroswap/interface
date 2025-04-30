'use client';
import PoolBanner from '@/components/banner/PoolBanner';
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

  const scrollRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className="pb-10 overflow-y-auto flex flex-col [&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:p-0 md:[&_.widget-module-container]:pl-5 max-md:[&_.widget-module-container]:h-max  [&_.widget-module-container]:overflow-visible md:[&_.widget-module-container]:max-h-full"
      ref={scrollRef}
    >
      <PoolBanner />
      <Widget>
        <PoolList
          scrollRef={scrollRef}
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

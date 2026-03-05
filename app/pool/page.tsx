'use client';
import PoolBanner from '@/components/banner/PoolBanner';
import Widget from '@/components/Widget';
import { PageType, PoolList, useRouterStore, Page } from '@dodoex/widgets';
import React from 'react';

export default function PoolPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab: string;
  }>;
}) {
  const resolvedSearchParams = React.use(searchParams);
  React.useEffect(() => {
    if (useRouterStore.getState().page?.type !== PageType.Pool) {
      useRouterStore.getState().push({
        type: PageType.Pool,
        params: resolvedSearchParams?.tab
          ? {
              tab: resolvedSearchParams.tab,
            }
          : undefined,
      } as Page<PageType.Pool>);
    }
  }, [resolvedSearchParams]);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className="pb-10 overflow-y-auto h-full flex flex-col [&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:p-0 md:[&_.widget-module-container]:px-5 max-md:[&_.widget-module-container]:h-max  [&_.widget-module-container]:overflow-visible md:[&_.widget-module-container]:max-h-full"
      ref={scrollRef}
    >
      <PoolBanner />
      <Widget>
        <PoolList
          scrollRef={scrollRef}
          params={
            resolvedSearchParams.tab
              ? {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  tab: resolvedSearchParams.tab as any,
                }
              : undefined
          }
        />
      </Widget>
    </div>
  );
}

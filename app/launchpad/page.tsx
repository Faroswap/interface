'use client';
import Widget from '@/components/Widget';
import {
  PageType,
  CrowdpoolingList,
  useRouterStore,
  Page,
} from '@dodoex/widgets';
import React from 'react';

export default function LaunchpadPage({
  searchParams,
}: {
  searchParams: {
    tab: string;
  };
}) {
  React.useEffect(() => {
    if (useRouterStore.getState().page?.type !== PageType.CrowdpoolingList) {
      useRouterStore.getState().push({
        type: PageType.CrowdpoolingList,
        params: searchParams?.tab
          ? {
              tab: searchParams.tab as 'all' | 'my',
            }
          : undefined,
      } as Page<PageType.CrowdpoolingList>);
    }
  }, [searchParams]);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className="pb-10 overflow-y-auto h-full flex flex-col [&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:p-0 md:[&_.widget-module-container]:px-5 max-md:[&_.widget-module-container]:h-max  [&_.widget-module-container]:overflow-visible md:[&_.widget-module-container]:max-h-full"
      ref={scrollRef}
    >
      <Widget>
        <CrowdpoolingList
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

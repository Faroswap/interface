'use client';
import Widget from '@/components/Widget';
import { PageType, useRouterStore, MyCrowdpoolingList } from '@dodoex/widgets';
import React from 'react';

export default function MyLaunchpadPage() {
  React.useEffect(() => {
    if (useRouterStore.getState().page?.type !== PageType.MyCrowdpoolingList) {
      useRouterStore.getState().push({
        type: PageType.MyCrowdpoolingList,
      });
    }
  }, []);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  return (
    <div
      className="pb-10 overflow-y-auto h-full flex flex-col [&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:p-0 md:[&_.widget-module-container]:px-5 max-md:[&_.widget-module-container]:h-max  [&_.widget-module-container]:overflow-visible md:[&_.widget-module-container]:max-h-full"
      ref={scrollRef}
    >
      <Widget>
        <MyCrowdpoolingList />
      </Widget>
    </div>
  );
}

'use client';
import Widget from '@/components/Widget';
import { PageType, useRouterStore, CrowdpoolingCreate } from '@dodoex/widgets';
import React from 'react';

export default function Page() {
  React.useEffect(() => {
    const { page, push } = useRouterStore.getState();
    if (page?.type !== PageType.CreateCrowdpooling) {
      push({
        type: PageType.CreateCrowdpooling,
      });
    }
  }, []);

  return (
    <div className="[&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:pt-2 md:[&_.widget-module-container]:px-5">
      <Widget>
        <CrowdpoolingCreate />
      </Widget>
    </div>
  );
}

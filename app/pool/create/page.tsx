'use client';
import Widget from '@/components/Widget';
import { useMediaDevices } from '@dodoex/components';
import { PageType, PoolCreate, useRouterStore } from '@dodoex/widgets';
import React from 'react';

export default function Page() {
  const { isMobile } = useMediaDevices();
  React.useEffect(() => {
    const { page, push } = useRouterStore.getState();
    if (page?.type !== PageType.CreatePool) {
      push({
        type: PageType.CreatePool,
      });
    }
  }, []);

  return (
    <div className="[&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:pt-2 md:[&_.widget-module-container]:px-5">
      <Widget>
        <PoolCreate cardMode={!isMobile} />
      </Widget>
    </div>
  );
}

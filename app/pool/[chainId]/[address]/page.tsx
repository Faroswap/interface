'use client';
import Widget from '@/components/Widget';
import { useMediaDevices } from '@dodoex/components';
import { PageType, PoolDetail, useRouterStore } from '@dodoex/widgets';
import React from 'react';

export default function Page({
  params,
}: {
  params: Promise<{
    address: string;
    chainId: string;
  }>;
}) {
  const { isMobile } = useMediaDevices();
  const { address, chainId } = React.use(params);
  React.useEffect(() => {
    const { page, push } = useRouterStore.getState();
    if (page?.type !== PageType.PoolDetail) {
      push({
        type: PageType.PoolDetail,
        params: { address, chainId: Number(chainId) },
      });
    }
  }, [address, chainId]);

  return (
    <div className="[&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:pt-2 md:[&_.widget-module-container]:px-5">
      <Widget>
        <PoolDetail
          params={{ address, chainId: Number(chainId) }}
          cardMode={!isMobile}
        />
      </Widget>
    </div>
  );
}

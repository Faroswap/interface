'use client';
import Widget from '@/components/Widget';
import { useMediaDevices } from '@dodoex/components';
import { PageType, PoolModify, useRouterStore } from '@dodoex/widgets';
import React from 'react';

export default function Page({
  params: { address, chainId },
}: {
  params: {
    address: string;
    chainId: string;
  };
}) {
  const { isMobile } = useMediaDevices();
  React.useEffect(() => {
    const { page, push } = useRouterStore.getState();
    if (page?.type !== PageType.ModifyPool) {
      push({
        type: PageType.ModifyPool,
        params: { address, chainId: Number(chainId) },
      });
    }
  }, [address, chainId]);

  return (
    <div className="[&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:pt-2 md:[&_.widget-module-container]:px-5">
      <Widget>
        <PoolModify
          params={{ address, chainId: Number(chainId) }}
          cardMode={!isMobile}
        />
      </Widget>
    </div>
  );
}

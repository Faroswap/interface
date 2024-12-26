'use client';
import Widget from '@/components/Widget';
import { PageType, PoolDetail, useRouterStore } from '@dodoex/widgets';
import React from 'react';

export default function Page({
  params: { address, chainId },
}: {
  params: {
    address: string;
    chainId: string;
  };
}) {
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
    <div className="pb-5">
      <Widget>
        <PoolDetail params={{ address, chainId: Number(chainId) }} />
      </Widget>
    </div>
  );
}

'use client';
import Widget from '@/components/Widget';
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
    <div className="pb-5">
      <Widget>
        <PoolModify params={{ address, chainId: Number(chainId) }} />
      </Widget>
    </div>
  );
}

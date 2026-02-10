'use client';
import Widget from '@/components/Widget';
import {
  PageType,
  CrowdpoolingDetail,
  useRouterStore,
} from '@dodoex/widgets';
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
    if (page?.type !== PageType.CrowdpoolingDetail) {
      push({
        type: PageType.CrowdpoolingDetail,
        params: { address, chainId: Number(chainId) },
      });
    }
  }, [address, chainId]);

  return (
    <div className="[&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:pt-2 md:[&_.widget-module-container]:px-5">
      <Widget>
        <CrowdpoolingDetail
          params={{ address, chainId: Number(chainId) }}
        />
      </Widget>
    </div>
  );
}

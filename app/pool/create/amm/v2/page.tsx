'use client';
import Widget from '@/components/Widget';
import { PageType, AMMV2Create, useRouterStore } from '@dodoex/widgets';
import React from 'react';

export default function Page() {
  React.useEffect(() => {
    const { page, push } = useRouterStore.getState();
    if (page?.type !== PageType.createPoolAMMV2) {
      push({
        type: PageType.createPoolAMMV2,
      });
    }
  }, []);

  return (
    <div className="pb-5">
      <Widget>
        <AMMV2Create />
      </Widget>
    </div>
  );
}

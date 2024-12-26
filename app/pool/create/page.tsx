'use client';
import Widget from '@/components/Widget';
import { PageType, PoolCreate, useRouterStore } from '@dodoex/widgets';
import React from 'react';

export default function Page() {
  React.useEffect(() => {
    const { page, push } = useRouterStore.getState();
    if (page?.type !== PageType.CreatePool) {
      push({
        type: PageType.CreatePool,
      });
    }
  }, []);

  return (
    <div className="pb-5">
      <Widget>
        <PoolCreate />
      </Widget>
    </div>
  );
}

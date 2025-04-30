'use client';
import Widget from '@/components/Widget';
import { AddLiquidityV3, PageType, useRouterStore } from '@dodoex/widgets';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

export default function Page() {
  const { push, back } = useRouter();

  const searchParams = useSearchParams();

  const params = useMemo<{
    from?: string | undefined;
    to?: string | undefined;
    fee?: string | undefined;
  }>(() => {
    const from = searchParams.get('from') ?? undefined;
    const to = searchParams.get('to') ?? undefined;
    const fee = searchParams.get('fee') ?? undefined;

    return {
      from,
      to,
      fee,
    };
  }, [searchParams]);

  React.useEffect(() => {
    const { page, push } = useRouterStore.getState();
    if (page?.type !== PageType.createPoolAMMV3) {
      push({
        type: PageType.createPoolAMMV3,
        params,
      });
    }
  }, [params]);

  return (
    <div className="[&_.widget-module-container]:bg-transparent md:[&_.widget-module-container]:pt-2 md:[&_.widget-module-container]:px-5">
      <Widget>
        <AddLiquidityV3
          handleGoBack={() => back()}
          handleGoToPoolList={() => push('/pool')}
          params={params}
        />
      </Widget>
    </div>
  );
}

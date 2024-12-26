'use client';

import Widget from '@/components/Widget';
import { MiningList } from '@dodoex/widgets';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Home() {
  const { push } = useRouter();

  const handleGotoDetail = useCallback(
    ({
      mining,
      pool,
      chainId,
    }: {
      mining: string;
      pool: string;
      chainId: number;
    }) => {
      push(`/mining/${mining}/${pool}?chainId=${chainId}`);
    },
    [push],
  );

  const handleGotoPoolDetail = useCallback(
    ({ pool, chainId }: { pool: string; chainId: number }) => {
      push(`/pool/${chainId}/${pool}`);
    },
    [push],
  );

  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="relative w-full bg-paper">
        <Widget>
          <MiningList
            handleGotoCreate={() => push('/mining/create')}
            handleGotoDetail={handleGotoDetail}
            handleGotoPoolDetail={handleGotoPoolDetail}
          />
        </Widget>
      </div>
    </div>
  );
}

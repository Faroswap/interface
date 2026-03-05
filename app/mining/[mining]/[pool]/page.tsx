'use client';
import Widget from '@/components/Widget';
import { MiningDetail } from '@dodoex/widgets';
import { useRouter } from 'next/navigation';
import { useCallback, use } from 'react';

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{
    mining: string;
    pool: string;
    chainId: string;
  }>;
  searchParams: Promise<{ chainId: string }>;
}) {
  const { mining, pool } = use(params);
  const { chainId } = use(searchParams);

  const { push } = useRouter();

  const handleGotoMiningList = useCallback(() => {
    push(`/mining?mining=${mining}&address=${pool}`);
  }, [mining, pool, push]);

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
          <MiningDetail
            query={{
              mining,
              address: pool,
              chainId: Number(chainId),
            }}
            handleGotoMiningList={handleGotoMiningList}
            handleGotoPoolDetail={handleGotoPoolDetail}
          />
        </Widget>
      </div>
    </div>
  );
}

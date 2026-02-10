import { useRouter } from 'next/navigation';
import { generateMiningDetailUrl } from '@/utils/mining';
import React from 'react';
import { useRouterStore, PageType } from '@dodoex/widgets';

export function useWidgetRouterSubscribe() {
  const router = useRouter();
  React.useEffect(() => {
    const unsubscribe = useRouterStore.subscribe((state) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params = state.page?.params as any;
      if (state.page?.type === PageType.MiningDetail) {
        const { chainId, miningContractAddress, stakeTokenAddress } = params;
        router.push(
          generateMiningDetailUrl({
            chainId,
            miningContractAddress,
            stakeTokenAddress,
          }),
        );
      } else if (state.page?.type === PageType.PoolDetail) {
        const { chainId, address } = params;
        router.push(`/pool/${chainId}/${address}`);
      } else if (state.page?.type === PageType.CreatePool) {
        router.push(`/pool/create`);
      } else if (state.page?.type === PageType.createPoolAMMV2) {
        router.push(`/pool/create/amm/v2`);
      } else if (state.page?.type === PageType.createPoolAMMV3) {
        if (params?.from) {
          router.push(
            `/pool/create/amm/v3?from=${params.from}&to=${params?.to}&fee=${params?.fee}`,
          );
        } else {
          router.push(`/pool/create/amm/v3`);
        }
      } else if (state.page?.type === PageType.Pool) {
        router.push(`/pool${params?.tab ? `?tab=${params?.tab}` : ''}`);
      } else if (state.page?.type === PageType.ModifyPool) {
        const { chainId, address } = params;
        router.push(`/pool/${chainId}/${address}/modify`);
      } else if (state.page?.type === PageType.CrowdpoolingList) {
        router.push(
          `/launchpad${params?.tab ? `?tab=${params?.tab}` : ''}`,
        );
      } else if (state.page?.type === PageType.CrowdpoolingDetail) {
        const { chainId, address } = params;
        router.push(`/launchpad/${chainId}/${address}`);
      } else if (state.page?.type === PageType.CreateCrowdpooling) {
        router.push(`/launchpad/create`);
      } else if (state.page?.type === PageType.CrowdpoolingPoolDetail) {
        const { chainId, address } = params;
        router.push(`/launchpad/pool/${chainId}/${address}`);
      } else if (state.page?.type === PageType.MyCrowdpoolingList) {
        router.push(`/launchpad/my`);
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

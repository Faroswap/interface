'use client';
import { RewardCard, RewardCardLoading } from '@/components/reward/RewardCard';
import GoBack from '@/components/GoBack';
import LoadingSkeleton from '@/components/Skeleton/LoadingSkeleton';
import { useFetchFiatPrice } from '@/hooks/useFetchFiatPrice';
import { useFetchReward } from '@/hooks/useFetchReward';
import { useGlobalStatus } from '@/utils/useGlobalStatus';
import { Button, EmptyDataIcon } from '@dodoex/components';
import { useWalletStore } from '@dodoex/wallet-web3';
import { FailedList, formatReadableNumber } from '@dodoex/widgets';
import { Trans } from '@lingui/macro';
import BigNumber from 'bignumber.js';

export default function Reward({
  initialDataTokenList,
}: {
  initialDataTokenList?: Parameters<
    typeof useFetchReward
  >[0]['initialDataTokenList'];
}) {
  const { account, chainId } = useWalletStore();
  const rewardListQuery = useFetchReward({
    account,
    chainId,
    initialDataTokenList,
  });
  const fiatPriceQuery = useFetchFiatPrice(
    rewardListQuery.data?.map((reward) => reward.token) ?? [],
  );
  let totalRewardPrice = 0;
  if (rewardListQuery.data?.length && fiatPriceQuery.data?.size) {
    rewardListQuery.data?.forEach((token) => {
      const usd = fiatPriceQuery.data?.get(token.address);
      if (usd) {
        totalRewardPrice += new BigNumber(token.claimableRewards)
          .times(usd)
          .toNumber();
      }
    });
  }

  const notListLen = rewardListQuery.data?.length;

  return (
    <div className="pt-7 px-5 md:px-10 pb-10">
      <GoBack />
      <div className="my-5 md:mt-7 md:mb-10 flex max-md:flex-col md:items-center gap-2 justify-between leading-none">
        <div className="text-[32px] font-semibold">
          <Trans>My Airdrop</Trans>
        </div>
        <div className="flex items-center gap-2 md:gap-5">
          <div className="text-secondary text-base">
            <Trans>Total:</Trans>
          </div>
          <LoadingSkeleton
            loading={fiatPriceQuery.isLoading || rewardListQuery.isLoading}
            loadingClassName="w-[30px]"
            className="md:text-[32px] font-semibold"
          >
            ${formatReadableNumber({ input: totalRewardPrice })}
          </LoadingSkeleton>
        </div>
      </div>
      {/* content */}
      {!notListLen && rewardListQuery.isLoading && !rewardListQuery.error && (
        <div className="grid gap-5 md:grid-cols-3 md:gap-[30px]">
          <RewardCardLoading />
        </div>
      )}
      {!notListLen && rewardListQuery.error && (
        <div className="flex items-center justify-center flex-col h-[320px] gap-3 bg-paper rounded-2xl text-sm text-secondary">
          <FailedList refresh={rewardListQuery.refetch} />
        </div>
      )}
      {!notListLen && !rewardListQuery.error && !rewardListQuery.isLoading && (
        <div className="flex items-center justify-center flex-col h-[320px] gap-3 bg-paper rounded-2xl text-sm text-secondary">
          <EmptyDataIcon
            sx={{
              width: 60,
              height: 60,
              borderRadius: 12,
            }}
          />
          <Trans>No rewards</Trans>
          {!account && (
            <Button
              size={Button.Size.small}
              onClick={() =>
                useGlobalStatus.setState({ openConnectWallet: true })
              }
            >
              <Trans>Connect a wallet</Trans>
            </Button>
          )}
        </div>
      )}
      {!!notListLen && (
        <div className="grid gap-5 md:grid-cols-3 md:gap-[30px]">
          {rewardListQuery.data?.map((token) => {
            return (
              <RewardCard
                token={token}
                key={token.id}
                refetch={() => rewardListQuery.refetch()}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

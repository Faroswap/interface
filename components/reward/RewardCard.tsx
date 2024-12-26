import BigNumber from 'bignumber.js';
import { ReactNode } from 'react';
import LoadingSkeleton from '../Skeleton/LoadingSkeleton';
import { Trans } from '@lingui/macro';
import { Button, QuestionTooltip } from '@dodoex/components';
import { Reward } from '@/hooks/useFetchReward';
import { formatReadableNumber } from '@dodoex/widgets';
import clsx from 'clsx';
import TokenLogo from '../TokenLogo';
import { useWalletStore } from '@dodoex/wallet-web3';
import {
  encodeLockedTokenVaultClaim,
  encodeMerkleDistributorClaim,
} from '@dodoex/dodo-contract-request';
import { useMutation } from '@tanstack/react-query';
import { useSubmissionExecute } from '@/submission/useSubmissionExecute';
import { OpCode } from '@/submission/spec';

interface PreminingItem {
  unClaimedRewards: BigNumber;
  lockedRewards: BigNumber;
  tip?: ReactNode;
}

export function RewardCardLoading() {
  return (
    <div className="rounded-2xl bg-paper overflow-hidden">
      <div className="p-5 bg-[linear-gradient(135deg,#ED5AD5_0%,#EC7E92_50.1%,#9C90DF_80.71%,#A3BCE2_100%)]">
        <div className="flex items-center gap-[6px]">
          <div className="animate-pulse bg-skeleton rounded-full w-8 h-8" />
          <div className="animate-pulse bg-skeleton rounded-[4px] w-[100px] h-5" />
        </div>
        <LoadingSkeleton
          loading
          className="mt-[10px] mb-[7px] text-secondary text-sm"
        />
      </div>
      <div className="pt-3 pb-5 px-5">
        <div className="animate-pulse bg-skeleton rounded-[4px] w-[60px] h-5" />
      </div>
    </div>
  );
}

export function RewardCard({
  token,
  preminingItem,
  refetch,
}: {
  token?: Reward;
  preminingItem?: PreminingItem;
  refetch?: () => void;
}) {
  const chainId = token?.token?.chainId;
  let titleName: ReactNode = '';
  let bgClassName =
    'bg-[linear-gradient(135deg,#ED5AD5_0%,#EC7E92_50.1%,#9C90DF_80.71%,#A3BCE2_100%)]';
  let lockRewardText = '';
  let totalClaimableRewards = new BigNumber(0);

  if (preminingItem) {
    titleName = <Trans>Pre-allocation Rewards</Trans>;
    bgClassName =
      'bg-[linear-gradient(45deg,#393837_0%,#595854_50.65%,#393837_100%)]';
    lockRewardText = formatReadableNumber({
      input: preminingItem.lockedRewards,
      showDecimals: 6,
    });
    totalClaimableRewards = preminingItem.unClaimedRewards;
  } else if (token) {
    let titleKey = token.nameKey as ReactNode;
    if (titleKey === 'airdrop.live01.name') {
      titleKey = <Trans>vDODO Airdrop </Trans>;
    } else {
      bgClassName =
        'bg-[linear-gradient(45deg,rgba(226,128,127,0.3)_0%,rgba(236,126,146,0.3)_50.1%,rgba(156,144,223,0.3)_80.71%,rgba(163,188,226,0.3)_100%)]';
    }
    titleName = titleKey || <Trans>Airdrop Rewards</Trans>;
    lockRewardText = formatReadableNumber({
      input: token.lockedRewards,
      showDecimals: 2,
    });
    totalClaimableRewards = token.claimableRewards;
  } else {
    throw new Error('RewardCard component must has token or preminingItem.');
  }

  const { account } = useWalletStore();
  const execute = useSubmissionExecute();
  const claimMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (reward: Reward) => {
      if (!account) return;
      const { contractAddress, merkle } = reward;
      try {
        let executeData = '';
        if (merkle) {
          const { index, amout, proof } = merkle;
          executeData = encodeMerkleDistributorClaim(
            index,
            account,
            amout,
            proof,
          );
        } else {
          executeData = await encodeLockedTokenVaultClaim();
        }
        if (!executeData) {
          throw new Error('contract claim data is null');
        }
        return execute({
          brief: 'mining.rewardSummary.claim',
          spec: {
            opcode: OpCode.TX,
            data: executeData,
            to: contractAddress,
            value: '0x0',
          },
          successBack: () => refetch?.(),
        });
      } catch (error) {
        console.error('claim airdrop sendTransaction error', error);
      }
    },
  });

  return (
    <div className="rounded-2xl bg-paper overflow-hidden">
      <div className={clsx('p-5', bgClassName)}>
        <div className="flex items-center justify-between">
          {token ? (
            <h2 className="flex items-center text-[28px] font-semibold">
              <TokenLogo
                address={token.address}
                chainId={chainId}
                width={32}
                height={32}
                marginRight={6}
              />
              {formatReadableNumber({
                input: totalClaimableRewards,
                showDecimals: token.showDecimals,
              })}
            </h2>
          ) : (
            <h2 className="flex items-center text-[28px] font-semibold gap-[6px]">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
              >
                <circle cx="8.15999" cy="8.32" r="7.84" fill="#FFE804" />
                <path
                  d="M9.19809 6.75893C9.95597 6.92515 10.6608 7.28849 11.2423 7.82216C12.062 8.57438 12.5653 9.59882 12.6595 10.7067L12.7333 11.5749H11.5919L11.5263 10.8029C11.4562 9.97941 11.0821 9.21797 10.4729 8.65887C9.86364 8.09974 9.07247 7.79184 8.24516 7.79184H8.07485C7.24754 7.79184 6.45639 8.09974 5.84715 8.65887C5.2379 9.21797 4.86379 9.97941 4.79374 10.8029L4.72811 11.5749H3.58667L3.66052 10.7067C3.75474 9.59882 4.25803 8.57438 5.07771 7.82216C5.65799 7.28963 6.36096 6.92675 7.11698 6.76004C7.07668 6.7274 7.03703 6.69198 6.99859 6.65358C6.66106 6.31639 6.54123 5.88943 6.73093 5.69989C6.9013 5.5297 7.26341 5.60905 7.57995 5.87125C7.63982 5.40296 7.87527 5.05333 8.15686 5.05333C8.43843 5.05333 8.67391 5.40296 8.73378 5.87125C9.05032 5.60905 9.4124 5.5297 9.5828 5.69989C9.7725 5.88943 9.65266 6.31639 9.31513 6.65358C9.27714 6.69154 9.23792 6.7266 9.19809 6.75893Z"
                  fill="#1A1A1B"
                />
                <path
                  d="M7.04489 9.25134C6.81885 9.25134 6.63561 9.57703 6.63561 9.9788C6.63561 10.3806 6.81885 10.7063 7.04489 10.7063C7.27094 10.7063 7.45418 10.3806 7.45418 9.9788C7.45418 9.57703 7.27094 9.25134 7.04489 9.25134Z"
                  fill="#1A1A1B"
                />
                <path
                  d="M8.86583 9.9788C8.86583 9.57703 9.04907 9.25134 9.27512 9.25134C9.50116 9.25134 9.6844 9.57703 9.6844 9.9788C9.6844 10.3806 9.50116 10.7063 9.27512 10.7063C9.04907 10.7063 8.86583 10.3806 8.86583 9.9788Z"
                  fill="#1A1A1B"
                />
              </svg>
              {formatReadableNumber({
                input: totalClaimableRewards,
                showDecimals: 6,
              })}
            </h2>
          )}
          <Button
            variant={Button.Variant.outlined}
            size={Button.Size.small}
            disabled={totalClaimableRewards.lte(0) || !account}
            isLoading={claimMutation.isPending}
            onClick={() => {
              if (!token?.contractAddress) return;
              claimMutation.mutate(token);
            }}
          >
            <Trans>Claim</Trans>
          </Button>
        </div>
        <div className="flex items-center mt-[10px] mb-[7px] text-sm text-secondary">
          {titleName}
          {/* {titleName}｜{' '}
          <a
            href=""
            rel="noopener noreferrer"
            target="_blank"
            className="underline hover:text-primary"
          >
            Details
          </a> */}
        </div>
      </div>
      <div className="pt-3 pb-5 px-5">
        <div className="font-semibold">{lockRewardText}</div>
        <div className="text-xs text-secondary">
          <Trans>Locked</Trans>
          {preminingItem && preminingItem.tip && (
            <span>
              <QuestionTooltip ml={8} title={preminingItem.tip} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

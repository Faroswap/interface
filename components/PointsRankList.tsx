import { useWalletStore } from '@dodoex/wallet-web3';
import Dialog from './Dialog';
import { truncatePoolAddress } from '@/utils/address';
import clsx from 'clsx';
import { usePointLeaderboard } from './points/hooks/usePointsLeaderboard';
import LoadingSkeleton from './Skeleton/LoadingSkeleton';
import { formatReadableNumber, formatTokenAmountNumber } from '@dodoex/widgets';

export default function PointsRankList({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { account } = useWalletStore();
  const fetchLeader = usePointLeaderboard();
  const overallRanks =
    fetchLeader.data?.points_activity_leaderboard?.overallRanks;
  const userRank =
    fetchLeader.data?.points_activity_leaderboard?.currentUserRank?.rank;

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col gap-2 p-5">
        <div className="flex justify-between mb-3">
          <div className="text-xl font-semibold">Leaderboard</div>
          <div className="cursor-pointer" onClick={onClose}>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.8791 6.65127L14.0304 11.5L18.8791 16.3487L17.2629 17.965L12.4142 13.1162L7.56544 17.965L5.9492 16.3487L10.7979 11.5L5.9492 6.65127L7.56544 5.03502L12.4142 9.88376L17.2629 5.03502L18.8791 6.65127Z"
                fill="#1D1D1D"
              />
            </svg>
          </div>
        </div>
        <div className="flex px-6 py-3 bg-main rounded-lg">
          <div className="basis-1/3 text-secondary">#</div>
          <div className="basis-1/3 text-secondary">Address</div>
          <div className="basis-1/3 text-secondary flex justify-end">
            Points
          </div>
        </div>
        {account && (!userRank || userRank > 3) && (
          <div className="flex px-6 py-5 rounded-lg bg-primary/5 text-active">
            <div className="basis-1/3">
              <LoadingSkeleton
                loading={fetchLeader.isLoading}
                loadingClassName="w-5"
              >
                {userRank}
              </LoadingSkeleton>
              (You)
            </div>
            <div className="basis-1/3">{truncatePoolAddress(account)}</div>
            <LoadingSkeleton className="basis-1/3 flex justify-end">
              {formatTokenAmountNumber({
                input:
                  fetchLeader.data?.points_activity_leaderboard?.currentUserRank
                    ?.totalPoints,
              })}
            </LoadingSkeleton>
          </div>
        )}

        {overallRanks?.map((currentRank, i) => {
          const rank = i + 1;
          const bg = leaderboardBackgroundColorMap[i] || '';
          const active = rank == userRank;

          return (
            <div
              className={clsx('flex px-6 py-5 bg-main rounded-lg', {
                'bg-primary/5 text-active': active,
              })}
              key={i}
            >
              <LoadingSkeleton
                className="basis-1/3 flex items-center md:gap-1"
                loading={fetchLeader.isLoading}
                loadingClassName="w-5"
              >
                <div
                  className={clsx(
                    'rounded-full flex items-center justify-center w-6 h-6 text-primary',
                    bg,
                  )}
                >
                  {rank}
                </div>
                {active && <span className="max-md:text-secondary">(You)</span>}
              </LoadingSkeleton>
              <LoadingSkeleton
                className="basis-1/3"
                loading={fetchLeader.isLoading}
                loadingClassName="w-5"
              >
                {currentRank?.user
                  ? truncatePoolAddress(currentRank?.user)
                  : undefined}
              </LoadingSkeleton>
              <LoadingSkeleton
                className="basis-1/3 flex justify-end"
                loading={fetchLeader.isLoading}
                loadingClassName="w-5"
              >
                {formatReadableNumber({
                  input: currentRank?.totalPoints ?? '',
                })}
              </LoadingSkeleton>
            </div>
          );
        })}
        {/* <div className="flex px-6 py-5 bg-main rounded-lg items-center justify-center text-secondary cursor-pointer"> */}
        {/*   <div className="mr-1">Load more</div> */}
        {/*   <svg */}
        {/*     width="15" */}
        {/*     height="14" */}
        {/*     viewBox="0 0 15 14" */}
        {/*     fill="none" */}
        {/*     xmlns="http://www.w3.org/2000/svg" */}
        {/*   > */}
        {/*     <path */}
        {/*       d="M11.4248 6.04565L10.5082 5.12903L7.30001 8.3372L4.09185 5.12903L3.17523 6.04565L7.30002 10.1704L11.4248 6.04565Z" */}
        {/*       fill="currentColor" */}
        {/*     /> */}
        {/*   </svg> */}
        {/* </div> */}
      </div>
    </Dialog>
  );
}

export const leaderboardBackgroundColorMap = {
  0: 'md:bg-[#FBC945]',
  1: 'md:bg-[#C2C2C2]',
  2: 'md:bg-[#BA8A3D]',
} as {
  [key: number]: string;
};

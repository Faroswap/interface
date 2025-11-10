import { truncatePoolAddress } from '@/utils/address';
import SwapIcon from '@/assets/nav/swap.svg';
import PoolIcon from '@/assets/nav/pool.svg';
import ReferralIcon from '@/assets/nav/referral.svg';
import SocialIcon from '@/assets/nav/social.svg';
import bgImage from '@/assets/points/total-bg.png';
import PointsRankList, {
  leaderboardBackgroundColorMap,
} from '@/components/PointsRankList';
import React, { useState } from 'react';
import { useWalletStore } from '@dodoex/wallet-web3';
import { Trans } from '@lingui/macro';
import { increaseArray } from '@/utils/utils';
import clsx from 'clsx';
import { TabPanel, Tabs, TabsButtonGroup } from '@dodoex/components';
import LoadingSkeleton from '../Skeleton/LoadingSkeleton';
import { formatTokenAmountNumber } from '@dodoex/widgets';
import { Tab } from './pcTabs';
import { usePointUserSummary } from './hooks/usePointsUserSummary';

enum PointTab {
  trading = 1,
  social,
}

export default function Total({
  onChangeTab,
}: {
  onChangeTab: (tab: Tab) => void;
}) {
  const { account } = useWalletStore();
  const [isShowRankList, setIsShowRankList] = useState(false);
  const [pointTab, setPointTab] = useState(PointTab.social);
  const fetchUserSummary = usePointUserSummary();

  return (
    <div className="flex gap-3 flex-1 md:flex-row flex-col">
      <div
        className="p-5 basis-1/2 bg-paper rounded-3xl bg-bottom bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: `${bgImage.width / 3}px ${bgImage.height / 3}px`,
        }}
      >
        <Tabs value={pointTab} onChange={(_, v) => setPointTab(v as PointTab)}>
          <div className="flex flex-col md:items-center md:justify-center md:py-5 gap-2">
            <TabsButtonGroup
              variant="inPaper"
              tabs={[
                { key: PointTab.trading, value: 'My Trading Points' },
                { key: PointTab.social, value: 'My Social Points' },
              ]}
              tabSx={{
                px: 12,
                py: 6,
                typography: 'body2',
                fontWeight: 600,
                '&.base--selected': {
                  backgroundColor: 'background.default',
                  color: 'text.primary',
                },
              }}
            />
          </div>
          <TabPanel value={PointTab.trading}>
            <>
              <div className="flex md:flex-col items-center md:justify-center gap-2">
                <div className="text-[32px] font-semibold md:leading-[44px]">
                  -
                </div>
                <button className="flex flex-col px-3 py-1 md:py-[6px] rounded-lg text-xs md:text-sm font-semibold bg-primary text-primary-contrastText">
                  <Trans>Claim Rewards</Trans>
                  <div className="text-[10px] leading-[14px] text-primary-contrastText/50">
                    (<Trans>Coming Soon</Trans>)
                  </div>
                </button>
                {/* <button className="bg-[##FEE94F] py-2 px-5 flex items-center justify-center h-[35px] rounded-lg bg-[#FEE94F]"> */}
                {/*   <svg */}
                {/*     width="19" */}
                {/*     height="19" */}
                {/*     viewBox="0 0 19 19" */}
                {/*     fill="none" */}
                {/*     xmlns="http://www.w3.org/2000/svg" */}
                {/*   > */}
                {/*     <path */}
                {/*       d="M5.52549 11.0002H3.50049C2.67549 11.0002 2.00049 11.6752 2.00049 12.5002V16.2502C2.00049 16.6252 2.37549 17.0002 2.75049 17.0002H5.52549C5.90049 17.0002 6.27549 16.6252 6.27549 16.2502V11.7502C6.27549 11.3002 5.90049 11.0002 5.52549 11.0002ZM10.4755 8.00016H8.45049C7.62549 8.00016 6.95049 8.67516 6.95049 9.50016V16.2502C6.95049 16.6252 7.25049 17.0002 7.70049 17.0002H11.2255C11.6755 17.0002 11.9755 16.6252 11.9755 16.2502V9.50016C11.9755 8.67516 11.3005 8.00016 10.4755 8.00016ZM15.5005 13.2502H13.4755C13.1005 13.2502 12.7255 13.6252 12.7255 14.0002V16.2502C12.7255 16.6252 13.1005 17.0002 13.4755 17.0002H16.2505C16.7005 17.0002 17.0005 16.6252 17.0005 16.2502V14.7502C17.0005 13.9252 16.3255 13.2502 15.5005 13.2502ZM11.7505 4.17516C11.9755 3.95016 12.0505 3.65016 11.9755 3.42516C11.9005 3.20016 11.6755 3.05016 11.3005 2.97516L10.5505 2.82516L10.4755 2.75016L10.1005 1.92516C9.80049 1.32516 9.12549 1.32516 8.82549 1.92516L8.45049 2.75016L8.37549 2.82516L7.62549 2.97516C7.32549 2.97516 7.10049 3.12516 7.02549 3.42516C6.95049 3.65016 7.02549 3.95016 7.25049 4.17516L7.77549 4.77516C7.77549 4.77516 7.85049 4.85016 7.85049 4.92516L7.70049 5.52516C7.55049 6.05016 7.77549 6.27516 7.92549 6.35016C8.00049 6.50016 8.30049 6.57516 8.75049 6.35016L9.42549 5.97516H9.57549L10.2505 6.35016C10.4755 6.42516 10.6255 6.50016 10.7755 6.50016C10.9255 6.50016 11.0755 6.42516 11.0755 6.42516C11.2255 6.35016 11.3755 6.12516 11.3005 5.60016L11.1505 4.92516C11.1505 4.92516 11.1505 4.77516 11.2255 4.77516L11.7505 4.17516Z" */}
                {/*       fill="currentColor" */}
                {/*     /> */}
                {/*   </svg> */}
                {/*   <span className="ml-1">44</span> */}
                {/* </button> */}
              </div>

              <div className="grid pt-5 grid-cols-2 gap-3">
                <DashboardItem
                  icon={<SwapIcon />}
                  label={<Trans>Swaps</Trans>}
                  value="-"
                />
                <DashboardItem
                  icon={<PoolIcon />}
                  label={<Trans>Liquidity</Trans>}
                  value="-"
                />
                <DashboardItem
                  icon={<ReferralIcon />}
                  label={<Trans>Referral</Trans>}
                  value="-"
                />
              </div>
            </>
          </TabPanel>
          <TabPanel value={PointTab.social}>
            <>
              <div className="flex md:flex-col items-center md:justify-center gap-2 max-md:mt-2">
                <LoadingSkeleton
                  className="text-[32px] font-semibold md:leading-[44px]"
                  loading={fetchUserSummary.isLoading}
                  loadingClassName="w-20"
                >
                  {formatTokenAmountNumber({
                    input:
                      fetchUserSummary.data?.points_activity_userSummary
                        ?.socialMediaPoints ?? '',
                  })}
                </LoadingSkeleton>
                <button
                  className="flex flex-col px-5 py-2 rounded-lg text-xs md:text-sm font-semibold border border-current text-active hover:opacity-70"
                  onClick={() => onChangeTab(Tab.Social)}
                >
                  <Trans>View more</Trans>
                </button>
              </div>
              <div className="flex flex-col gap-3 md:items-center mt-5 md:mt-10 p-5 md:py-3 bg-white rounded-lg">
                <div className="flex items-center gap-2 font-semibold">
                  <div className="bg-primary/10 flex justify-center items-center w-10 h-10 rounded-lg text-active">
                    <SocialIcon />
                  </div>
                  <Trans>Social media</Trans>
                </div>
                <div className="text-sm text-secondary md:text-center">
                  These points are earned through verified social activities on
                  Discord. They are tracked separately and not combined with
                  your other points such as Swap ,Liquidity or Referral Points.
                </div>
              </div>
            </>
          </TabPanel>
        </Tabs>
      </div>

      <div className="p-5 basis-1/2 bg-paper rounded-3xl flex flex-col gap-2">
        <PointsRankList
          open={isShowRankList}
          onClose={() => setIsShowRankList(false)}
        />
        <div className="flex justify-between items-center mb-3">
          <div className="text-xl font-semibold">
            trading points leaderboard
          </div>
          <div
            className="cursor-pointer md:flex hidden text-secondary hover:text-primary"
            onClick={() => setIsShowRankList(true)}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 3.5L17.3 5.8L14.41 8.67L15.83 10.09L18.7 7.2L21 9.5V3.5H15ZM3 9.5L5.3 7.2L8.17 10.09L9.59 8.67L6.7 5.8L9 3.5H3V9.5ZM9 21.5L6.7 19.2L9.59 16.33L8.17 14.91L5.3 17.8L3 15.5V21.5H9ZM21 15.5L18.7 17.8L15.83 14.91L14.41 16.33L17.3 19.2L15 21.5H21V15.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="flex px-6 py-3 bg-main rounded-lg justify-between text-sm">
          <div className="flex md:basis-2/3 basis-1/2">
            <div className="basis-1/2 md:flex hidden text-secondary">#</div>
            <div className="basis-1/2 text-secondary">Address</div>
          </div>
          <div className="md:basis-1/3 basis-1/2 text-secondary flex justify-end">
            Points
          </div>
        </div>
        {account && (
          <div className="flex px-6 md:py-5 py-3 bg-main rounded-lg justify-between bg-primary/5 text-active items-center text-sm">
            <div className="flex flex-col-reverse md:flex-row md:basis-2/3 basis-1/2">
              <div className="basis-1/2 md:text-active text-secondary">
                -(You)
              </div>
              <div className="basis-1/2">{truncatePoolAddress(account)}</div>
            </div>
            <div className="flex md:basis-1/3 basis-1/2 justify-end">-</div>
          </div>
        )}
        {increaseArray(3).map((_, i) => (
          <div
            className="flex px-6 md:py-5 py-3 bg-main rounded-lg justify-between items-center text-sm"
            key={i}
          >
            <div className="flex flex-col-reverse md:flex-row md:basis-2/3 basis-1/2">
              <div className="basis-1/2">
                <div
                  className={clsx(
                    'rounded-full flex items-center md:justify-center md:w-6 md:h-6 md:text-primary text-secondary',
                    leaderboardBackgroundColorMap[i],
                  )}
                >
                  <span className="md:hidden">#</span>
                  {i + 1}
                </div>
              </div>
              <div className="basis-1/2">-</div>
            </div>
            <div className="flex md:basis-1/3 basis-1/2 justify-end">-</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="flex rounded-lg flex-1 items-center px-5 py-3 bg-main">
      <div className="bg-primary/10 md:flex hidden justify-center items-center w-10 h-10 rounded-lg text-active">
        {icon}
      </div>
      <div className="md:ml-5">
        <div className="text-sm text-secondary mb-1">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

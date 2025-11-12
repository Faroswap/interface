import { DISCORD_URL } from '@/constants/config';
import { Trans } from '@lingui/macro';
import DiscordIcon from '@/assets/icons/discord.svg';
import LoadingSkeleton from '../Skeleton/LoadingSkeleton';
import Image from 'next/image';
import swapPointsImage from '@/assets/points/socia-media-points.png';
import { usePointUserSummary } from './hooks/usePointsUserSummary';
import { formatReadableNumber } from '@dodoex/widgets';
import UpdateTime from './UpdateTime';

export default function SocialMedia() {
  const title = 'My Social Media Points';
  const fetchUserSummary = usePointUserSummary();

  return (
    <div className="flex max-md:flex-col gap-3">
      <div className="md:p-5 rounded-3xl md:bg-paper flex-1">
        <h5 className="text-2xl font-semibold">
          💠 <Trans>Social Media Missions — How to Join</Trans>
        </h5>
        <div className="mt-3 text-[18px]">
          <Trans>
            We use our Discord tools to verify user activities and distribute
            points.Please follow the steps below to set up your account and
            start earning Social Media Points:
          </Trans>
        </div>
        <ul className="mt-2 flex flex-col gap-2 text-[18px] list-decimal list-inside">
          <li>
            Join the FaroSwap Discord:{' '}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-active hover:opacity-80 underline"
            >
              {DISCORD_URL}
            </a>
          </li>
          <li>
            Verify in{' '}
            <span className="p-1 ml-2 bg-paperDarkContrast text-base rounded">
              #✅丨verify
            </span>
            <div className="mt-[2px] text-secondary text-base">
              After verification, you’ll gain access to the full server.
            </div>
          </li>
          <li>
            Complete advanced verification in{' '}
            <span className="p-1 ml-2 bg-paperDarkContrast text-base rounded">
              #✅丨verify-dolphins🐬
            </span>
            <div className="mt-[2px] text-secondary text-base">
               Only verified members can participate in the Points Missions.
            </div>
          </li>
          <li>
            Once verified, you’ll see the  💠 ENGAGE ECOSYSTEM section.
            <div className="mt-1">
              Follow the guide in
              <span className="p-1 ml-2 bg-paperDarkContrast text-base rounded">
                #💠丨how-to-engage
              </span>
            </div>
            <div className="mt-1">
              to bind your Twitter account and EVM wallet address.
            </div>
          </li>
        </ul>
        <div className="mt-2 pt-2 border-t text-sm text-secondary">
          ※ No wallet authorization is required — the binding is only used for
          task verification and points accumulation.
        </div>
        <a
          className="mt-7 inline-flex items-center justify-center gap-3 h-12 rounded-lg min-w-[280px] bg-primary text-primary-contrastText font-semibold hover:opacity-90"
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <DiscordIcon />
          Verify in Discord
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.22703 12.7124L10.6811 6.25825L4.75206 6.25825L4.75736 4.75741H13.2426V13.2427H11.7471L11.7418 7.31891L5.28769 13.773L4.22703 12.7124Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>

      <div className="md:hidden h-[96px]" />
      <div className="md:hidden flex md:flex-row flex-col fixed bottom-0 left-0 right-0 w-full">
        <div className="flex flex-1 items-center justify-between bg-paper rounded-t-3xl p-5 relative z-10">
          <div className="flex flex-col">
            <div className="text-xs font-semibold mb-2">{title}</div>
            <LoadingSkeleton
              className="text-2xl font-semibold mb-1"
              loading={fetchUserSummary.isLoading}
              loadingClassName="w-20"
            >
              {formatReadableNumber({
                input:
                  fetchUserSummary.data?.points_activity_userSummary
                    ?.socialMediaPoints ?? '',
              })}
            </LoadingSkeleton>
            <UpdateTime />
          </div>
        </div>
      </div>

      <div className="w-[375px] md:flex flex-col hidden">
        <div className="bg-paper rounded-3xl p-5 mb-3 w-[375px] hidden md:flex">
          <div className="flex items-center mr-5">
            <Image
              src={swapPointsImage}
              alt="icon"
              width={swapPointsImage.width / 3}
              height={swapPointsImage.height / 3}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-semibold mb-2">{title}</div>
            <LoadingSkeleton
              className="text-2xl font-semibold mb-1"
              loading={fetchUserSummary.isLoading}
              loadingClassName="w-20"
            >
              {formatReadableNumber({
                input:
                  fetchUserSummary.data?.points_activity_userSummary
                    ?.socialMediaPoints ?? '',
              })}
            </LoadingSkeleton>
            <UpdateTime />
          </div>
        </div>
      </div>
    </div>
  );
}

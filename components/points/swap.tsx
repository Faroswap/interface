import { Trans } from '@lingui/macro';
// import TokenLogo from '../TokenLogo';
import { Point } from './Points';
import { Tab } from './pcTabs';
import { SINGLE_CHAIN_ID } from '@/constants/config';
import { usePointSpecialBoost } from './hooks/usePointsSpecialBoost';
import { SpecialBoostLoading } from './SpecialBoostLoading';
import { FailedList } from '@dodoex/widgets';
import Link from 'next/link';
import TokenLogo from '../TokenLogo';

export default function Swap() {
  const chainId = SINGLE_CHAIN_ID;
  const fetchSpecialBoost = usePointSpecialBoost({
    type: 'swap',
  });

  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:bg-paper flex flex-1 flex-col rounded-3xl md:p-5 h-max">
        <div className="text-primary text-[32px] font-semibold mb-3 leading-[44px]">
          <Trans>Swap</Trans>
        </div>
        <ul className="flex flex-col gap-2 text-lg mb-7 list-disc pl-5">
          <li>
            <Trans>
              Earn corresponding points by performing 
              <span className="font-bold">swaps and trades</span> on FaroSwap.
            </Trans>
          </li>
          <li className="font-bold">
            <Trans>Rule: 1 USD = 3 points</Trans>
          </li>
        </ul>
        <div>
          <Link
            href="/swap"
            className="relative bg-primary w-[280px] md:w-[200px] h-[48px] flex items-center justify-center text-white rounded-lg mb-12 font-semibold disabled:bg-paperDarkContrast disabled:text-disabled hover:opacity-90"
          >
            Swap now
          </Link>
        </div>
        <div className="text-xl font-semibold mb-2">
          <Trans>Special Boost</Trans>
        </div>
        <div className="text-secondary mb-5">
          <Trans>
            FaroSwap will feature 
            <span className="font-bold">
              special trading pairs / selected
            </span>{' '}
            pools from our key partners, where trading these pairs allows you to
            earn 
            <span className="font-bold">
              additional — and even double — points.
            </span>
          </Trans>
        </div>
        <div className="flex flex-wrap gap-3">
          {fetchSpecialBoost.isLoading ? (
            <SpecialBoostLoading />
          ) : fetchSpecialBoost.isError ? (
            <div className="flex items-center justify-center h-[320px]">
              <FailedList refresh={fetchSpecialBoost.refetch} />
            </div>
          ) : (
            ''
          )}
          {fetchSpecialBoost.data?.points_activity_specialBoost?.map(
            (item, i) => (
              <Link
                href={`/swap/${chainId}-${item?.baseSymbol}/${chainId}-${item?.quoteSymbol}`}
                className="bg-paper md:bg-main rounded-lg w-full md:w-[224px] h-[48px] flex items-center relative [&:hover_.apy]:hidden [&:hover_.swap]:flex pl-3"
                key={i}
              >
                <div className="flex items-center">
                  <TokenLogo
                    address={item?.baseToken ?? ''}
                    chainId={chainId}
                    width={24}
                    height={24}
                    marginRight={-6}
                  />
                  <TokenLogo
                    address={item?.quoteToken ?? ''}
                    chainId={chainId}
                    width={24}
                    height={24}
                    marginRight={9}
                  />
                </div>
                <div className="text-sm">
                  {item?.baseSymbol}/{item?.quoteSymbol}
                </div>
                <div className="apy absolute top-0 right-0 bg-[#FEE94F] flex items-center justify-center px-2 leading-4 text-xs rounded-bl-lg rounded-tr-lg rounded-tl-sm rounded-br-sm font-bold">
                  +{item?.multiplierPercentage}%
                </div>
                <div className="swap absolute right-0 bg-[#1A1A1B1A] text-active text-sm items-center justify-center h-full w-[60px] hidden rounded-r-lg">
                  Swap
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
      <Point title={<Trans>My Swap Points</Trans>} sourceType={Tab.Swap} />
    </div>
  );
}

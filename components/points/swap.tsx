import { Trans } from '@lingui/macro';
// import TokenLogo from '../TokenLogo';
import { Point } from './Points';

export default function Swap() {
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
          {/* <li className="font-bold">
            <Trans>Rule: USD 1 = 3 points</Trans>
          </li> */}
        </ul>
        <div>
          <button
            className="relative bg-primary w-[280px] md:w-[200px] h-[48px] flex items-center justify-center text-white rounded-lg mb-12 font-semibold disabled:bg-paperDarkContrast disabled:text-disabled"
            disabled
          >
            <div className="absolute top-0 right-0 rounded-tr-lg rounded-bl-lg py-1 px-2 text-xs font-semibold bg-paperDarkContrast text-white">
              Soon
            </div>
            Swap now
          </button>
        </div>
        <div className="text-xl font-semibold mb-2">
          <Trans>Special Boost</Trans>
        </div>
        <div className="text-secondary">
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
      </div>
      <Point title={<Trans>My Swap Points</Trans>} />
    </div>
  );
}

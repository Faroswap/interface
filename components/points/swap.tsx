import { Trans } from '@lingui/macro';
import TokenLogo from '../TokenLogo';
import { Point } from './Points';
import { Tab } from './pcTabs';

export default function Swap() {
  const specialBoost = [
    { baseToken: WPHRC, quoteToken: USDC, tag: 50 },
    { baseToken: WPHRC, quoteToken: USDT, tag: 200 },
    { baseToken: USDC, quoteToken: USDT, tag: 100 },
    { baseToken: WPHRC, quoteToken: WETH, tag: 200 },
    { baseToken: AUTO, quoteToken: WPHRC, tag: 50 },
    { baseToken: AUTO, quoteToken: USDC, tag: 100 },
  ];

  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:bg-paper flex flex-1 flex-col rounded-3xl md:p-5">
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
            <Trans>Rule: USD 1 = 3 points</Trans>
          </li>
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
          {specialBoost.map((item, i) => (
            <div
              // href={`/swap/${item.baseToken.chainId}-${item.baseToken.symbol}/${item.quoteToken.chainId}-${item.quoteToken.symbol}`}
              className="bg-paper md:bg-main rounded-lg w-full md:w-[224px] h-[48px] flex items-center relative [&:hover_.apy]:hidden [&:hover_.swap]:flex pl-3"
              key={i}
            >
              <div className="flex items-center">
                <TokenLogo
                  address={item.baseToken.address}
                  chainId={item.baseToken.chainId}
                  width={24}
                  height={24}
                  marginRight={-6}
                />
                <TokenLogo
                  address={item.quoteToken.address}
                  chainId={item.quoteToken.chainId}
                  width={24}
                  height={24}
                  marginRight={9}
                />
              </div>
              <div className="text-sm">
                {item.baseToken.symbol}/{item.quoteToken.symbol}
              </div>
              <div className="apy absolute top-0 right-0 bg-[#FEE94F] flex items-center justify-center px-2 leading-4 text-xs rounded-bl-lg rounded-tr-lg rounded-tl-sm rounded-br-sm font-bold">
                +{item.tag}%
              </div>
              <div className="swap absolute right-0 bg-[#1A1A1B1A] text-disabled text-sm items-center justify-center h-full w-[60px] hidden rounded-r-lg">
                Swap
              </div>
            </div>
          ))}
        </div>
      </div>
      <Point title={<Trans>My Swap Points</Trans>} sourceType={Tab.Swap} />
    </div>
  );
}

const WPHRC = {
  name: 'Wrapped PHRS',
  address: '0x3019B247381c850ab53Dc0EE53bCe7A07Ea9155f',
  symbol: 'WPHRS',
  decimals: 18,
  chainId: 688688,
};
const USDC = {
  name: 'USD Coin',
  address: '0x72df0bcd7276f2dFbAc900D1CE63c272C4BCcCED',
  symbol: 'USDC',
  decimals: 6,
  chainId: 688688,
};
const USDT = {
  name: 'Tether USD',
  address: '0xD4071393f8716661958F766DF660033b3d35fD29',
  symbol: 'USDT',
  decimals: 6,
  chainId: 688688,
};
const WETH = {
  name: 'Wrapped ETH',
  address: '0x4E28826d32F1C398DED160DC16Ac6873357d048f',
  symbol: 'WETH',
  decimals: 18,
  chainId: 688688,
};
const AUTO = {
  name: 'AutoStaking',
  address: '0x1A0588a167bB4868Da407d32F09e3C41a2e2EE93',
  symbol: 'AUTO',
  decimals: 6,
  chainId: 688688,
};

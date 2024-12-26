'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { getMenuList } from '@/constants/menuList';
import ProgressLink from '../ProgressLink';
import { ArrowTopRightBorder, Error } from '@dodoex/icons';
import { Trans } from '@lingui/macro';
import { TWITTER_URL } from '@/constants/config';
import LogoAndText from '@/assets/logo/logo-and-text.svg';

export default function LeftNav({ onClose }: { onClose?: () => void }) {
  const menuList = getMenuList();
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between h-full bg-paper md:min-w-[236px]">
      <div>
        <div className="flex justify-between items-center px-4 h-[68px]">
          <LogoAndText />
          {!!onClose && (
            <button
              className="text-secondary hover:text-primary"
              onClick={() => onClose()}
            >
              <Error className="w-6 h-6" />
            </button>
          )}
        </div>
        <nav>
          <ul className="flex flex-col">
            {menuList.map((menu) => {
              const key = menu.url;
              if (menu.url) {
                const active =
                  pathname === menu.url ||
                  (pathname === '/' && menu.url === '/swap') ||
                  pathname?.startsWith(menu.url);
                return (
                  <li className="p-3" key={key}>
                    <ProgressLink
                      href={menu.url}
                      className={clsx(
                        'flex gap-2 p-2 font-semibold rounded-lg hover:bg-hover hover:text-primary',
                        active ? 'text-primary' : 'text-secondary',
                        { '[&_.active-color]:text-active': active },
                      )}
                    >
                      {menu.icon}
                      {menu.name}
                    </ProgressLink>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </nav>
      </div>
      <div className="px-4">
        <a
          className="flex justify-between items-center p-3 border rounded-lg text-secondary text-sm hover:bg-hover hover:text-primary"
          rel="noopener noreferrer"
          target="_blank"
          href={TWITTER_URL}
        >
          <div className="flex items-center gap-2">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4.92063C15.4849 5.16181 14.9313 5.32424 14.3503 5.39746C14.9436 5.02276 15.3992 4.42904 15.6132 3.72149C15.0585 4.0685 14.4437 4.32075 13.7892 4.45673C13.2659 3.86792 12.5187 3.5 11.6927 3.5C9.83825 3.5 8.47558 5.32486 8.89442 7.21924C6.508 7.09311 4.39167 5.8872 2.97475 4.05435C2.22225 5.41591 2.5845 7.19709 3.86317 8.09906C3.393 8.08306 2.94967 7.94709 2.56292 7.72006C2.53142 9.12346 3.48517 10.4364 4.8665 10.7287C4.46225 10.8443 4.0195 10.8714 3.56917 10.7804C3.93433 11.9838 4.99483 12.8593 6.2525 12.8839C5.045 13.8825 3.52367 14.3285 2 14.139C3.27108 14.9986 4.78133 15.5 6.403 15.5C11.7358 15.5 14.7487 10.7496 14.5667 6.48893C15.1279 6.06132 15.615 5.52789 16 4.92063Z"
                fill="currentColor"
              />
            </svg>
            Twitter
          </div>
          <ArrowTopRightBorder className="w-4 h-4" />
        </a>
        <div className="mt-[10px] mx-auto h-[1px] w-11/12 bg-border" />
        <div className="py-[14px] text-secondary text-xs">
          <Trans>Powered by DODO DEXpert</Trans>
        </div>
      </div>
    </div>
  );
}

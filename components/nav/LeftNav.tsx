'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { getMenuList } from '@/constants/menuList';
import ProgressLink from '../ProgressLink';
import { Error } from '@dodoex/icons';
import { Trans } from '@lingui/macro';
import {
  COMMUNITY_URL,
  TWITTER_URL,
  DOCUMENT_URL,
  TELEGRAM_URL,
  PHAROS_TESTNET_URL,
  DISCORD_URL,
} from '@/constants/config';
import LogoAndText from '@/assets/logo/logo-and-text.svg';
import LogoGray from '@/assets/logo/logo-gray.svg';
import { useMediaDevices } from '@dodoex/components';
import DiscordIcon from '@/assets/icons/discord.svg';

export default function LeftNav({
  onClose,
  isMobile,
}: {
  onClose?: () => void;
  isMobile: boolean;
}) {
  const menuList = getMenuList();
  const pathname = usePathname();
  const { isMobile: isMediaMobile } = useMediaDevices();
  const onlySingleSocialLink =
    // @ts-ignore
    !!TWITTER_URL +
      !!COMMUNITY_URL +
      !!DOCUMENT_URL +
      !!TELEGRAM_URL +
      !!PHAROS_TESTNET_URL ===
    1;

  if (isMediaMobile !== isMobile) return null;
  return (
    <div className="flex flex-col justify-between h-full bg-paper md:w-[240px] md:rounded-3xl md:overflow-hidden">
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

              // TODO: need replace
              if (menu.isOuterLink) {
                return (
                  <li
                    className="relative p-3 [&:hover_.hover-bg]:inline-block"
                    key={key}
                  >
                    {!!menu.hoverBgImage && (
                      <div className="hover-bg absolute inset-3 hidden">
                        {menu.hoverBgImage}
                      </div>
                    )}
                    <a
                      href={menu.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      className={clsx(
                        'relative z-[1] flex items-center justify-between p-2 font-semibold rounded-lg text-secondary [&:hover_.outer-icon]:visible',
                        menu.hoverBgImage
                          ? 'hover:text-contrastText'
                          : 'hover:bg-hover hover:text-primary',
                      )}
                      onClick={() => onClose?.()}
                    >
                      <div className="flex items-center gap-2">
                        {menu.icon}
                        {menu.name}
                      </div>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="outer-icon invisible"
                      >
                        <path
                          d="M4.22703 12.7122L10.6811 6.25812L4.75206 6.25812L4.75736 4.75729H13.2426V13.2426H11.7471L11.7418 7.31878L5.28769 13.7729L4.22703 12.7122Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </li>
                );
              }
              if (menu.url) {
                const active =
                  pathname === menu.url ||
                  (pathname === '/' && menu.url === '/swap') ||
                  pathname?.startsWith(menu.url);
                return (
                  <li
                    className="relative px-4 py-2 [&:hover_.hover-bg]:inline-block"
                    key={key}
                  >
                    {!!menu.hoverBgImage && (
                      <div className="hover-bg absolute inset-3 hidden">
                        {menu.hoverBgImage}
                      </div>
                    )}
                    <ProgressLink
                      href={menu.url}
                      className={clsx(
                        'relative z-[1] p-3 flex flex-col font-semibold rounded-lg',
                        {
                          '[&_.active-color]:fill-[url(#left-nav-linear)]':
                            active,
                        },
                        { 'bg-hover': active },
                        active ? 'text-primary' : 'text-secondary',
                        menu.hoverBgImage
                          ? 'hover:text-contrastText'
                          : 'hover:bg-hover hover:text-primary',
                      )}
                      onClick={() => onClose?.()}
                    >
                      {menu.icon}
                      <div className={clsx('mt-2 leading-none font-semibold')}>
                        {menu.name}
                      </div>
                      <div className="mt-1 text-xs text-secondary">
                        {' '}
                        {menu.description}
                      </div>
                    </ProgressLink>
                  </li>
                );
              }
              return null;
            })}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <linearGradient id="left-nav-linear">
                <stop stopColor="#FEE94F" offset="0%" />
                <stop stopColor="#326AFD" offset="100%" />
              </linearGradient>
            </svg>
          </ul>
        </nav>
      </div>
      <div className="px-4">
        <div
          className={clsx('flex justify-between', {
            'py-2 border-b': !onlySingleSocialLink,
          })}
        >
          {!!TWITTER_URL && (
            <a
              className={clsx(
                'flex justify-between items-center  rounded-lg text-secondary  hover:text-primary',
                onlySingleSocialLink
                  ? 'p-3 border text-sm hover:bg-hover'
                  : 'p-1 text-xs font-semibold',
              )}
              rel="noopener noreferrer"
              target="_blank"
              href={TWITTER_URL}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.3019 7.92451L15.399 1.99951H14.1912L9.76531 7.14411L6.23041 1.99951H2.15332L7.49879 9.77905L2.15332 15.9923H3.36125L8.03504 10.5595L11.7682 15.9923H15.8452L10.3016 7.92451H10.3019ZM8.64746 9.84759L8.10585 9.07292L3.79648 2.90882H5.65178L9.1295 7.88345L9.6711 8.65811L14.1917 15.1244H12.3364L8.64746 9.84789V9.84759Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}
          {!!COMMUNITY_URL && (
            <a
              className={clsx(
                'flex justify-between items-center  rounded-lg text-secondary  hover:text-primary',
                onlySingleSocialLink
                  ? 'p-3 border text-sm hover:bg-hover'
                  : 'px-1 py-2 text-xs font-semibold',
              )}
              rel="noopener noreferrer"
              target="_blank"
              href={COMMUNITY_URL}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4987 2.78786L2.2012 7.91561C1.2937 8.28011 1.29895 8.78636 2.0347 9.01211L5.4487 10.0771L13.3477 5.09336C13.7212 4.86611 14.0625 4.98836 13.782 5.23736L7.3822 11.0131H7.3807L7.3822 11.0139L7.1467 14.5329C7.4917 14.5329 7.64395 14.3746 7.83745 14.1879L9.4957 12.5754L12.945 15.1231C13.581 15.4734 14.0377 15.2934 14.196 14.5344L16.4602 3.86336C16.692 2.93411 16.1055 2.51336 15.4987 2.78786Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}
          {!!TELEGRAM_URL && (
            <a
              className={clsx(
                'flex justify-between items-center  rounded-lg text-secondary  hover:text-primary',
                onlySingleSocialLink
                  ? 'p-3 border text-sm hover:bg-hover'
                  : 'px-1 py-2 text-xs font-semibold',
              )}
              rel="noopener noreferrer"
              target="_blank"
              href={TELEGRAM_URL}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4987 2.78786L2.2012 7.91561C1.2937 8.28011 1.29895 8.78636 2.0347 9.01211L5.4487 10.0771L13.3477 5.09336C13.7212 4.86611 14.0625 4.98836 13.782 5.23736L7.3822 11.0131H7.3807L7.3822 11.0139L7.1467 14.5329C7.4917 14.5329 7.64395 14.3746 7.83745 14.1879L9.4957 12.5754L12.945 15.1231C13.581 15.4734 14.0377 15.2934 14.196 14.5344L16.4602 3.86336C16.692 2.93411 16.1055 2.51336 15.4987 2.78786V2.78786Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}
          {!!DISCORD_URL && (
            <a
              className={clsx(
                'flex justify-between items-center  rounded-lg text-secondary  hover:text-primary',
                onlySingleSocialLink
                  ? 'p-3 border text-sm hover:bg-hover'
                  : 'px-1 py-2 text-xs font-semibold',
              )}
              rel="noopener noreferrer"
              target="_blank"
              href={DISCORD_URL}
            >
              <DiscordIcon />
            </a>
          )}
          {!!DOCUMENT_URL && (
            <a
              className={clsx(
                'flex justify-between items-center  rounded-lg text-secondary  hover:text-primary',
                onlySingleSocialLink
                  ? 'p-3 border text-sm hover:bg-hover'
                  : 'px-1 py-2 text-xs font-semibold',
              )}
              rel="noopener noreferrer"
              target="_blank"
              href={DOCUMENT_URL}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 15.75C3.3375 15.75 2.98438 15.6031 2.69063 15.3094C2.39687 15.0156 2.25 14.6625 2.25 14.25V3.75C2.25 3.3375 2.39687 2.98438 2.69063 2.69063C2.98438 2.39687 3.3375 2.25 3.75 2.25H14.25C14.6625 2.25 15.0156 2.39687 15.3094 2.69063C15.6031 2.98438 15.75 3.3375 15.75 3.75V14.25C15.75 14.6625 15.6031 15.0156 15.3094 15.3094C15.0156 15.6031 14.6625 15.75 14.25 15.75H3.75ZM5.25 12.75H10.5V11.25H5.25V12.75ZM5.25 9.75H12.75V8.25H5.25V9.75ZM5.25 6.75H12.75V5.25H5.25V6.75Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}
          <a
            className={clsx(
              'flex justify-between items-center  rounded-lg text-secondary  hover:text-primary',
              onlySingleSocialLink
                ? 'p-3 border text-sm hover:bg-hover'
                : 'px-1 py-2 text-xs font-semibold',
            )}
            rel="noopener noreferrer"
            target="_blank"
            href={PHAROS_TESTNET_URL}
          >
            <LogoGray />
          </a>
        </div>
        <div
          className={clsx('mt-[10px] mx-auto h-[1px] w-11/12 bg-border', {
            hidden: !onlySingleSocialLink,
          })}
        />
        <div className="py-[14px] text-secondary text-xs">
          <Trans>Powered by DODO DEXpert</Trans>
        </div>
      </div>
    </div>
  );
}

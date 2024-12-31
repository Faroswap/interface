import type { Metadata } from 'next';
import './globals.css';
import { manropeFont } from '@/utils/fonts';
import clsx from 'clsx';
import { setI18n } from '@lingui/react/server';
import { getI18nInstance } from '../providers/i18n/appRouterI18n';
import { LinguiClientProvider } from '@/providers/i18n/LinguiClientProvider';
import LeftNav from '@/components/nav/LeftNav';
import ConnectWalletBtn from '@/components/walletConnect/ConnectWalletBtn';
import SingleChainLogo from '@/assets/logo/single-chain.svg';
import ClientProvider from '@/providers/ClientProvider';
import {
  DESCRIPTION,
  SHOW_AIRDROP,
  SINGLE_CHAIN_NAME,
  TITLE,
} from '@/constants/config';
import { Suspense } from 'react';
import NavDialog from '@/components/nav/NavDialog';
import Logo from '@/assets/logo/logo.svg';
import RewardEntry from '@/components/reward/RewardEntry';
import { fetchTokenList } from '@/constants/apiServer';
import Announcements from '@/components/Announcements';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = 'en';
  const i18n = await getI18nInstance(lang);
  setI18n(i18n);
  const { data: initialDataTokenList } = await fetchTokenList();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
        <link rel="manifest" href="/manifest.json"></link>
      </head>
      <body className={clsx(manropeFont.className, 'bg-main')}>
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={i18n.messages}
        >
          <Suspense>
            <ClientProvider>
              <div className="flex h-screen overflow-hidden">
                <div className="hidden md:block">
                  <LeftNav />
                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Announcements />
                  <header className="flex justify-between md:justify-end items-center px-5 md:px-6 py-3 border-b text-sm md:text-base">
                    {/* mobile */}
                    <div className="md:hidden">
                      <Logo />
                    </div>
                    <div className="flex items-center gap-2">
                      {SHOW_AIRDROP && (
                        <RewardEntry
                          initialDataTokenList={initialDataTokenList}
                        />
                      )}

                      <button
                        className="btn gap-2 bg-paperDarkContrast text-sm"
                        disabled
                      >
                        <SingleChainLogo />
                        <div className="hidden md:inline-block">
                          {SINGLE_CHAIN_NAME}
                        </div>
                      </button>
                      <ConnectWalletBtn />
                      <div className="md:hidden">
                        <NavDialog />
                      </div>
                    </div>
                  </header>
                  <main className="flex-1 flex flex-col overflow-y-auto">
                    {children}
                  </main>
                </div>
              </div>
            </ClientProvider>
          </Suspense>
        </LinguiClientProvider>
      </body>
    </html>
  );
}

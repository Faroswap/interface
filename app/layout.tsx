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
import Script from 'next/script';
import ErrorMessageDialog from '@/components/ErrorMessageDialog';

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
        {/* If the file is updated, an update request is required to refresh the cache */}
        <link rel="manifest" href="/manifest.json"></link>
        <Script id="ms-clarity" strategy="beforeInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.CLARITY_PROJECT_ID}");
          `}
        </Script>
      </head>
      <body
        className={clsx(
          manropeFont.className,
          'bg-main bg-[length:40px_40px] bg-[radial-gradient(circle_at_30px_30px,#E0E0E0_2px,transparent_0)]',
        )}
      >
        <LinguiClientProvider
          initialLocale={lang}
          initialMessages={i18n.messages}
        >
          <Suspense>
            <ClientProvider>
              <ErrorMessageDialog />
              <div className="flex h-screen overflow-hidden">
                <div className="hidden md:block pl-5 py-5 h-screen">
                  <LeftNav isMobile={false} />
                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="flex flex-col-reverse md:flex-col">
                    <Announcements />
                    <header className="flex justify-between md:justify-end items-center px-5 md:px-6 py-3 max-md:border-b text-sm md:text-base max-md:bg-white">
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
                  </div>
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

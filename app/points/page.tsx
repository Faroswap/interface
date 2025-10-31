'use client';

import { useEffect, useRef, useState } from 'react';
import Total from '@/components/points/total';
import Swap from '@/components/points/swap';
import Liquidity from '@/components/points/liquidity';
import Referral from '@/components/points/referral';
import PCTabs, { Tab } from '@/components/points/pcTabs';
import { useMediaDevices } from '@dodoex/components';
import MobileTabs from '@/components/points/mobileTabs';
import { useSearchParams } from 'next/navigation';
import SocialMedia from '@/components/points/SocialMedia';
import { useAcceptInvite } from '@/components/points/hooks/useAcceptInvite';
import { useWalletStore } from '@dodoex/wallet-web3';

export default function Page() {
  const { isMobile } = useMediaDevices();
  const [activeTab, setActiveTab] = useState(Tab.Total);
  const { account } = useWalletStore();
  const acceptInvite = useAcceptInvite();
  const searchParams = useSearchParams();
  const urlICode = searchParams.get('inviteCode') ?? undefined;
  const isAcceptRef = useRef(false);
  useEffect(() => {
    if (urlICode && !isAcceptRef.current) {
      setActiveTab(Tab.Referral);
      if (account) {
        acceptInvite.mutate({
          inviteCode: urlICode,
          account,
        });
        isAcceptRef.current = true;
      }
    }
  }, [urlICode, account]);

  return (
    <>
      <div className="md:hidden flex">
        <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="md:p-3 p-5 text-primary max-md:bg-main">
        {(activeTab === Tab.Total || isMobile === false) && (
          <Total onChangeTab={setActiveTab} />
        )}
        <div className="md:flex hidden h-[2px] my-7 bg-[#4548511A] w-full"></div>
        {isMobile ? (
          <div className="flex">
            {activeTab === Tab.Swap && <Swap />}
            {activeTab === Tab.Liquidity && <Liquidity />}
            {activeTab === Tab.Referral && <Referral urlICode={urlICode} />}
            {activeTab === Tab.Social && <SocialMedia />}
          </div>
        ) : (
          <div className="flex flex-col">
            <PCTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {(activeTab === Tab.Swap || activeTab === Tab.Total) && <Swap />}
            {activeTab === Tab.Liquidity && <Liquidity />}
            {activeTab === Tab.Referral && <Referral urlICode={urlICode} />}
            {activeTab === Tab.Social && <SocialMedia />}
          </div>
        )}
      </div>
    </>
  );
}

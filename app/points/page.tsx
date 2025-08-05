'use client'

import { useState } from "react";
import Total from '@/components/points/total';
import Swap from '@/components/points/swap';
import Liquidity from '@/components/points/liquidity';
import Referral from '@/components/points/referral';
import PCTabs from "@/components/points/pcTabs";
import { useMediaDevices } from "@dodoex/components";
import MobileTabs from "@/components/points/mobileTabs";

export enum Tab {
	Total,
	Swap,
	Liquidity,
	Referral,
	Social
}

export default function Page() {
  const { isMobile } = useMediaDevices();
  const [activeTab, setActiveTab] = useState(Tab.Total);
  return <>
    <div className="md:hidden flex">
      <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
    <div className="md:p-3 p-5 text-primary">
      {(activeTab === Tab.Total || isMobile === false) && <Total/>}
      <div className="md:flex hidden h-[2px] my-7 bg-[#4548511A] w-full"></div>
      <div className="md:flex flex-col hidden">
        <PCTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {(activeTab === Tab.Swap || activeTab === Tab.Total) && <Swap />}
        {activeTab === Tab.Liquidity && <Liquidity />}
        {activeTab === Tab.Referral && <Referral />}
      </div>
      <div className="md:hidden flex">
        {activeTab === Tab.Swap && <Swap />}
        {activeTab === Tab.Liquidity && <Liquidity />}
        {activeTab === Tab.Referral && <Referral />}
      </div>
    </div>
  </>
}
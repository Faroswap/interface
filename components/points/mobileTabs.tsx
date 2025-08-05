
import clsx from 'clsx';
import { Tab } from '@/app/points/page';

export default function MobileTabs({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (tab: Tab) => void }) {
  
  return <div className="flex text-primary px-5 py-2 bg-paper overflow-x-auto gap-2">
    <div 
      className={clsx("flex items-center justify-end px-5 py-2 rounded-lg cursor-pointer", activeTab === Tab.Total ? 'bg-[#326AFD1A] text-[#326AFD]' : 'bg-paper ')}
      onClick={() => setActiveTab(Tab.Total)}
    >
      <div className="">Total</div>
    </div>
    <div 
      className={clsx("flex items-center justify-end px-5 py-2 rounded-lg cursor-pointer", activeTab === Tab.Swap ? 'bg-[#326AFD1A] text-[#326AFD]' : 'bg-paper ')}
      onClick={() => setActiveTab(Tab.Swap)}
    >
      <div className="">Swap</div>
    </div>
    <div 
      className={clsx("flex items-center justify-end px-5 py-2 rounded-lg cursor-pointer", activeTab === Tab.Liquidity ? 'bg-[#326AFD1A] text-[#326AFD]' : 'bg-paper ')}
      onClick={() => setActiveTab(Tab.Liquidity)}
    >
      <div className="">Liquidity</div>
    </div>
    <div 
      className={clsx("flex items-center justify-end px-5 py-2 rounded-lg cursor-pointer", activeTab === Tab.Referral ? 'bg-[#326AFD1A] text-[#326AFD]' : 'bg-paper ')}
      onClick={() => setActiveTab(Tab.Referral)}
    >
      <div className="">Referral</div>
    </div>
    <div 
      className={clsx("flex items-center justify-end px-5 py-2 rounded-lg cursor-pointer", activeTab === Tab.Social ? 'bg-[#326AFD1A] text-[#326AFD]' : 'bg-paper ')}
      onClick={() => setActiveTab(Tab.Social)}
    >
      <div className="">Social</div>
    </div>
  </div>
}
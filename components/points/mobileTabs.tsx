import clsx from 'clsx';
import { Tab } from './pcTabs';

export default function MobileTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) {
  const handleChangeTab = (tab: Tab, element: HTMLDivElement) => {
    setActiveTab(tab);
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    });
  };

  return (
    <div className="flex text-primary px-5 py-2 bg-paper overflow-x-auto gap-2">
      <div
        className={clsx(
          'flex items-center justify-end px-5 py-2 rounded-lg cursor-pointer',
          activeTab === Tab.Total
            ? 'bg-[#326AFD1A] text-[#326AFD]'
            : 'bg-paper ',
        )}
        onClick={(evt) => handleChangeTab(Tab.Total, evt.currentTarget)}
      >
        <div className="">Total</div>
      </div>
      <div
        className={clsx(
          'flex items-center justify-end px-5 py-2 rounded-lg cursor-pointer',
          activeTab === Tab.Swap
            ? 'bg-[#326AFD1A] text-[#326AFD]'
            : 'bg-paper ',
        )}
        onClick={(evt) => handleChangeTab(Tab.Swap, evt.currentTarget)}
      >
        <div className="">Swap</div>
      </div>
      <div
        className={clsx(
          'flex items-center justify-end px-5 py-2 rounded-lg cursor-pointer',
          activeTab === Tab.Liquidity
            ? 'bg-[#326AFD1A] text-[#326AFD]'
            : 'bg-paper ',
        )}
        onClick={(evt) => handleChangeTab(Tab.Liquidity, evt.currentTarget)}
      >
        <div className="">Liquidity</div>
      </div>
      <div
        className={clsx(
          'flex items-center justify-end px-5 py-2 rounded-lg cursor-pointer',
          activeTab === Tab.Referral
            ? 'bg-[#326AFD1A] text-[#326AFD]'
            : 'bg-paper ',
        )}
        onClick={(evt) => handleChangeTab(Tab.Referral, evt.currentTarget)}
      >
        <div className="">Referral</div>
      </div>
      <div
        className={clsx(
          'flex items-center justify-end px-5 py-2 rounded-lg cursor-pointer',
          activeTab === Tab.Social
            ? 'bg-[#326AFD1A] text-[#326AFD]'
            : 'bg-paper ',
        )}
        onClick={(evt) => handleChangeTab(Tab.Social, evt.currentTarget)}
      >
        <div className="">Social</div>
      </div>
    </div>
  );
}


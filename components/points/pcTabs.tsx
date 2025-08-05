import SwapIcon from '@/assets/nav/swap.svg';
import PoolIcon from '@/assets/nav/pool.svg';
import ReferralIcon from '@/assets/nav/referral.svg';
import SocialIcon from '@/assets/nav/social.svg';
import clsx from 'clsx';
import { Tab } from '@/app/points/page';

export default function PCTabs({ activeTab, setActiveTab }: { activeTab: Tab; setActiveTab: (tab: Tab) => void }) {
	
  return <div className="md:flex hidden gap-5 text-secondary text-xl mb-3">
		<div 
			className="flex items-center justify-end px-5 py-3 bg-paper rounded-2xl cursor-pointer"
			style={activeTab === Tab.Swap || activeTab === Tab.Total ? { background: 'linear-gradient(270deg, #326AFD 14.38%, #FEE94F 128.44%)', color: '#fff' } : {}}
			onClick={() => setActiveTab(Tab.Swap)}
		>
			<div className={clsx('flex justify-center items-center w-10 h-10 rounded-lg', activeTab === Tab.Swap || activeTab === Tab.Total ? 'text-[#326AFD] bg-white' : 'bg-[#1A1A1B1A] text-[#1A1A1B80]')}>
				<SwapIcon />
			</div>
			<div className="ml-5">
				<div className="">Swap</div>
			</div>
		</div>
		<div 
			className="flex items-center justify-end px-5 py-3 bg-paper rounded-2xl cursor-pointer" 
			style={activeTab === Tab.Liquidity ? { background: 'linear-gradient(270deg, #326AFD 14.38%, #FEE94F 128.44%)', color: '#fff' } : {}}
			onClick={() => setActiveTab(Tab.Liquidity)}
		>
			<div className={clsx('flex justify-center items-center w-10 h-10 rounded-lg', activeTab === Tab.Liquidity ? 'text-[#326AFD] bg-white' : 'bg-[#1A1A1B1A] text-[#1A1A1B80]')}>
				<PoolIcon />
			</div>
			<div className="ml-5">
				<div className="">Liquidity</div>
			</div>
		</div>
		<div 
			className="flex items-center justify-end px-5 py-3 bg-paper rounded-2xl cursor-pointer" 
			style={activeTab === Tab.Referral ? { background: 'linear-gradient(270deg, #326AFD 14.38%, #FEE94F 128.44%)', color: '#fff' } : {}}
			onClick={() => setActiveTab(Tab.Referral)}
		>
			<div className={clsx('flex justify-center items-center w-10 h-10 rounded-lg', activeTab === Tab.Referral ? 'text-[#326AFD] bg-white' : 'bg-[#1A1A1B1A] text-[#1A1A1B80]')}>
				<ReferralIcon />
			</div>
			<div className="ml-5">
				<div className="">Referral</div>
			</div>
		</div>
		<div 
			className="flex items-center justify-end px-5 py-3 bg-paper rounded-2xl cursor-pointer" 
			style={activeTab === Tab.Social ? { background: 'linear-gradient(270deg, #326AFD 14.38%, #FEE94F 128.44%)', color: '#fff' } : {}}
			onClick={() => setActiveTab(Tab.Social)}
		>
			<div className={clsx('flex justify-center items-center w-10 h-10 rounded-lg', activeTab === Tab.Social ? 'text-[#326AFD] bg-white' : 'bg-[#1A1A1B1A] text-[#1A1A1B80]')}>
				<SocialIcon />
			</div>
			<div className="ml-5">
				<div className="">Social Media</div>
			</div>
		</div>
	</div>
}
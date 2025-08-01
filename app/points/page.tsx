'use client'

import { truncatePoolAddress } from "@/utils/address";
import { useWalletStore } from "@dodoex/wallet-web3";
import SwapIcon from '@/assets/nav/swap.svg';
import PoolIcon from '@/assets/nav/pool.svg';
import ReferralIcon from '@/assets/nav/referral.svg';
import SocialIcon from '@/assets/nav/social.svg';
import SwapPointsIcon from '@/assets/icons/swap-points.svg';
import { useState } from "react";
import clsx from 'clsx';

enum Tab {
  Swap,
  Liquidity,
  Referral,
  Social
}

export default function Page() {
  const { account } = useWalletStore();
  const [activeTab, setActiveTab] = useState(Tab.Swap);

  return <div className="p-3 text-primary">
    <div className="flex gap-3">
      <div className="p-[14px] basis-1/2 bg-paper rounded-3xl">
        <div className="flex flex-col items-center justify-center mt-9">
          <div className="mb-2 h-[22px] flex items-center">My Total Points</div>
          <div className="text-[32px] font-semibold mb-2 h-[44px] flex items-center">400</div>
          <div>
            <button className="bg-[##FEE94F] py-2 px-5 flex items-center justify-center h-[35px] rounded-lg bg-[#FEE94F]">
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.52549 11.0002H3.50049C2.67549 11.0002 2.00049 11.6752 2.00049 12.5002V16.2502C2.00049 16.6252 2.37549 17.0002 2.75049 17.0002H5.52549C5.90049 17.0002 6.27549 16.6252 6.27549 16.2502V11.7502C6.27549 11.3002 5.90049 11.0002 5.52549 11.0002ZM10.4755 8.00016H8.45049C7.62549 8.00016 6.95049 8.67516 6.95049 9.50016V16.2502C6.95049 16.6252 7.25049 17.0002 7.70049 17.0002H11.2255C11.6755 17.0002 11.9755 16.6252 11.9755 16.2502V9.50016C11.9755 8.67516 11.3005 8.00016 10.4755 8.00016ZM15.5005 13.2502H13.4755C13.1005 13.2502 12.7255 13.6252 12.7255 14.0002V16.2502C12.7255 16.6252 13.1005 17.0002 13.4755 17.0002H16.2505C16.7005 17.0002 17.0005 16.6252 17.0005 16.2502V14.7502C17.0005 13.9252 16.3255 13.2502 15.5005 13.2502ZM11.7505 4.17516C11.9755 3.95016 12.0505 3.65016 11.9755 3.42516C11.9005 3.20016 11.6755 3.05016 11.3005 2.97516L10.5505 2.82516L10.4755 2.75016L10.1005 1.92516C9.80049 1.32516 9.12549 1.32516 8.82549 1.92516L8.45049 2.75016L8.37549 2.82516L7.62549 2.97516C7.32549 2.97516 7.10049 3.12516 7.02549 3.42516C6.95049 3.65016 7.02549 3.95016 7.25049 4.17516L7.77549 4.77516C7.77549 4.77516 7.85049 4.85016 7.85049 4.92516L7.70049 5.52516C7.55049 6.05016 7.77549 6.27516 7.92549 6.35016C8.00049 6.50016 8.30049 6.57516 8.75049 6.35016L9.42549 5.97516H9.57549L10.2505 6.35016C10.4755 6.42516 10.6255 6.50016 10.7755 6.50016C10.9255 6.50016 11.0755 6.42516 11.0755 6.42516C11.2255 6.35016 11.3755 6.12516 11.3005 5.60016L11.1505 4.92516C11.1505 4.92516 11.1505 4.77516 11.2255 4.77516L11.7505 4.17516Z" fill="#1A1A1B"/>
              </svg>
              <span className="ml-1">44</span>
            </button>
          </div>
        </div>
        <div className="flex pt-9 flex-wrap">
          <div className="flex p-[6px] basis-1/2">
            <div className="flex rounded-lg flex-1 items-center px-5 py-3 bg-main">
              <div className="bg-[#326AFD1A] flex justify-center items-center w-10 h-10 rounded-lg text-[#326AFD]">
                <SwapIcon/>
              </div>
              <div className="ml-5">
                <div className="text-sm text-[#1A1A1B80] mb-1">Swaps</div>
                <div className="text-xl font-semibold">200</div>
              </div>
            </div>
          </div>
          <div className="flex p-[6px] basis-1/2">
            <div className="flex rounded-lg flex-1 items-center px-5 py-3 bg-main">
              <div className="bg-[#326AFD1A] flex justify-center items-center w-10 h-10 rounded-lg text-[#326AFD]">
                <PoolIcon/>
              </div>
              <div className="ml-5">
                <div className="text-sm text-[#1A1A1B80] mb-1">Liquidity</div>
                <div className="text-xl font-semibold">100</div>
              </div>
            </div>
          </div>
          <div className="flex p-[6px] basis-1/2">
            <div className="flex rounded-lg flex-1 items-center px-5 py-3 bg-main">
              <div className="bg-[#326AFD1A] flex justify-center items-center w-10 h-10 rounded-lg text-[#326AFD]">
               <ReferralIcon/>
              </div>
              <div className="ml-5">
                <div className="text-sm text-[#1A1A1B80] mb-1">Referral</div>
                <div className="text-xl font-semibold">60</div>
              </div>
            </div>
          </div>
          <div className="flex p-[6px] basis-1/2">
            <div className="flex rounded-lg flex-1 items-center px-5 py-3 bg-main">
              <div className="bg-[#326AFD1A] flex justify-center items-center w-10 h-10 rounded-lg text-[#326AFD]">
                <SocialIcon/>
              </div>
              <div className="ml-5">
                <div className="text-sm text-[#1A1A1B80] mb-1">Social media</div>
                <div className="text-xl font-semibold">40</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 basis-1/2 bg-paper rounded-3xl">
        <div className="flex justify-between mb-5">
          <div>Leaderboard</div>
          <div className="cursor-pointer">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_172_20147)">
              <path d="M15 3.5L17.3 5.8L14.41 8.67L15.83 10.09L18.7 7.2L21 9.5V3.5H15ZM3 9.5L5.3 7.2L8.17 10.09L9.59 8.67L6.7 5.8L9 3.5H3V9.5ZM9 21.5L6.7 19.2L9.59 16.33L8.17 14.91L5.3 17.8L3 15.5V21.5H9ZM21 15.5L18.7 17.8L15.83 14.91L14.41 16.33L17.3 19.2L15 21.5H21V15.5Z" fill="#1A1A1B" fill-opacity="0.5"/>
              </g>
              <defs>
              <clipPath id="clip0_172_20147">
              <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
              </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex px-6 py-[10px] bg-main rounded-lg mb-2">
          <div className="basis-1/3 text-secondary">#</div>
          <div className="basis-1/3 text-secondary">Address</div>
          <div className="basis-1/3 text-secondary flex justify-end">Points</div>
        </div>
        {account && <div className="flex px-6 py-5 bg-main rounded-lg mb-2">
          <div className="basis-1/3">44(You)</div>
          <div className="basis-1/3">{truncatePoolAddress(account)}</div>
          <div className="basis-1/3 flex justify-end">0</div>
        </div>}
        <div className="flex px-6 py-5 bg-main rounded-lg mb-2">
          <div className="basis-1/3">
            <div className="rounded-full flex items-center justify-center w-6 h-6 text-primary bg-[#FBC945]">1</div>
          </div>
          <div className="basis-1/3">0x56ad…1234</div>
          <div className="basis-1/3 flex justify-end">4,179,961</div>
        </div>
        <div className="flex px-6 py-5 bg-main rounded-lg mb-2">
          <div className="basis-1/3">
            <div className="rounded-full flex items-center justify-center w-6 h-6 text-primary bg-[#C2C2C2]">2</div>
          </div>
          <div className="basis-1/3">0x56ad…1234</div>
          <div className="basis-1/3 flex justify-end">2,179,961</div>
        </div>
        <div className="flex px-6 py-5 bg-main rounded-lg">
          <div className="basis-1/3">
            <div className="rounded-full flex items-center justify-center w-6 h-6 text-primary bg-[#BA8A3D]">3</div>
          </div>
          <div className="basis-1/3">0x56ad…1234</div>
          <div className="basis-1/3 flex justify-end">1,179,961</div>
        </div>
      </div>
    </div>
    <div className="h-[2px] my-7 bg-[#4548511A] w-full"></div>
    <div>
      <div className="flex gap-5 text-secondary text-xl mb-3">
        <div 
          className="flex items-center justify-end px-5 py-3 bg-paper rounded-2xl cursor-pointer"
          style={activeTab === Tab.Swap ? { background: 'linear-gradient(270deg, #326AFD 14.38%, #FEE94F 128.44%)', color: '#fff' } : {}}
          onClick={() => setActiveTab(Tab.Swap)}
        >
          <div className={clsx('flex justify-center items-center w-10 h-10 rounded-lg', activeTab === Tab.Swap ? 'text-[#326AFD] bg-white' : 'bg-[#1A1A1B1A] text-[#1A1A1B80]')}>
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
      {activeTab === Tab.Swap && <div className="flex">
        <div className="bg-paper flex flex-1 flex-col rounded-3xl p-5">
          <div className="text-primary text-[32px] font-semibold mb-3">Title about swap mining</div>
          <div className="text-primary mb-7">How to swap to get points,How to swap to get points,How to swap to get points,How to swap to get points,How to swap to get points,How to swap to get points,</div>
          <div><button className="bg-primary w-[200px] h-[48px] flex items-center justify-center text-white rounded-lg mb-12 font-semibold">Swap now</button></div>
          <div className="text-xl font-semibold mb-1">Title about time-limited event, bonus points trading pairs</div>
          <div className="text-[#1A1A1B80] text-sm mb-3">Description description description description description description description description description description description </div>
          <div className="flex flex-wrap">

          </div>
        </div>
        <div className="w-[375px] ml-3">
          <div className="flex bg-paper rounded-3xl p-5 mb-3">
            <div className="flex items-center">
              <SwapPointsIcon/>
            </div>
            <div className="ml-5 flex flex-col">
              <div className="text-lg font-semibold mb-2">My Swap Points</div>
              <div className="text-2xl font-semibold">200</div>
            </div>
          </div>
          <div className="flex bg-paper rounded-3xl flex-col">
            <div className="flex justify-between flex-1 p-5">
              <div className="text-lg font-semibold">History</div>
              <div>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 14.855L17.355 16.5L12 11.1567L6.645 16.5L5 14.855L12 7.855L19 14.855Z" fill="#1A1A1B" fill-opacity="0.5"/>
                </svg>
              </div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px] bg-[#1A1A1B1A] text-[#1A1A1B80]">
              <div>Points</div>
              <div>Receive date</div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
              <div>+50</div>
              <div>2022/07/01 17:19:39</div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
              <div>+50</div>
              <div>2022/07/01 17:19:39</div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
              <div>+50</div>
              <div>2022/07/01 17:19:39</div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
              <div>+50</div>
              <div>2022/07/01 17:19:39</div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
              <div>+50</div>
              <div>2022/07/01 17:19:39</div>
            </div>
            <div className="border-t py-5 flex items-center justify-center text-secondary cursor-pointer">
              <div className="mr-1">Load more</div>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4248 6.04565L10.5082 5.12903L7.30001 8.3372L4.09185 5.12903L3.17523 6.04565L7.30002 10.1704L11.4248 6.04565Z" fill="#1A1A1B" fill-opacity="0.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>}
      {activeTab === Tab.Liquidity && <div className="flex">
        <div className="bg-paper flex flex-1 flex-col rounded-3xl p-5">
          <div className="text-primary text-[32px] font-semibold mb-3">Title about swap mining</div>
          <div className="text-primary mb-7">How to swap to get points,How to swap to get points,How to swap to get points,How to swap to get points,How to swap to get points,How to swap to get points,</div>
          <div><button className="bg-primary w-[200px] h-[48px] flex items-center justify-center text-white rounded-lg mb-12 font-semibold">Swap now</button></div>
          <div className="text-xl font-semibold mb-1">Title about time-limited event, bonus points trading pairs</div>
          <div className="text-[#1A1A1B80] text-sm mb-3">Description description description description description description description description description description description </div>
          <div className="flex flex-wrap">

          </div>
        </div>
        <div className="w-[375px] ml-3">
          <div className="flex bg-paper rounded-3xl p-5 mb-3">
            <div className="flex items-center">
              <SwapPointsIcon/>
            </div>
            <div className="ml-5 flex flex-col">
              <div className="text-lg font-semibold mb-2">My Liquidity Points</div>
              <div className="text-2xl font-semibold">200</div>
            </div>
          </div>
          <div className="flex bg-paper rounded-3xl flex-col">
            <div className="flex justify-between flex-1 p-5">
              <div className="text-lg font-semibold">History</div>
              <div>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 14.855L17.355 16.5L12 11.1567L6.645 16.5L5 14.855L12 7.855L19 14.855Z" fill="#1A1A1B" fill-opacity="0.5"/>
                </svg>
              </div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px] bg-[#1A1A1B1A] text-[#1A1A1B80]">
              <div>Points</div>
              <div>Receive date</div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
              <div>+50</div>
              <div>2022/07/01 17:19:39</div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
              <div>+50</div>
              <div>2022/07/01 17:19:39</div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
              <div>+50</div>
              <div>2022/07/01 17:19:39</div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
              <div>+50</div>
              <div>2022/07/01 17:19:39</div>
            </div>
            <div className="flex justify-between flex-1 text-sm px-6 py-[14px]">
              <div>+50</div>
              <div>2022/07/01 17:19:39</div>
            </div>
            <div className="border-t py-5 flex items-center justify-center text-secondary cursor-pointer">
              <div className="mr-1">Load more</div>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4248 6.04565L10.5082 5.12903L7.30001 8.3372L4.09185 5.12903L3.17523 6.04565L7.30002 10.1704L11.4248 6.04565Z" fill="#1A1A1B" fill-opacity="0.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>}
    </div>
  </div>
}
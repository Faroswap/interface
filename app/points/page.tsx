'use client'

import { truncatePoolAddress } from "@/utils/address";
import { useWalletStore } from "@dodoex/wallet-web3";
import SwapIcon from '@/assets/nav/swap.svg';
import PoolIcon from '@/assets/nav/pool.svg';
import ReferralIcon from '@/assets/nav/referral.svg';
import SocialIcon from '@/assets/nav/social.svg';
import SwapPointsIcon from '@/assets/icons/swap-points.svg';
import {  useState } from "react";
import clsx from 'clsx';
import PointsRankList from "@/components/PointsRankList";

enum Tab {
  Swap,
  Liquidity,
  Referral,
  Social
}

export default function Page() {
  const { account } = useWalletStore();
  const [activeTab, setActiveTab] = useState(Tab.Swap);
  const [rCode, setRCode] = useState('');
  const [iCode, setICode] = useState('');
  const [isShowRankList, setIsShowRankList] = useState(false);

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
      <div className="p-5 basis-1/2 bg-paper rounded-3xl flex flex-col gap-2">
        <PointsRankList open={isShowRankList} onClose={() => setIsShowRankList(false)}/>
        <div className="flex justify-between mb-3">
          <div>Leaderboard</div>
          <div className="cursor-pointer" onClick={() => setIsShowRankList(true)}>
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
        <div className="flex px-6 py-[10px] bg-main rounded-lg">
          <div className="basis-1/3 text-secondary">#</div>
          <div className="basis-1/3 text-secondary">Address</div>
          <div className="basis-1/3 text-secondary flex justify-end">Points</div>
        </div>
        {account && <div className="flex px-6 py-5 bg-main rounded-lg">
          <div className="basis-1/3">44(You)</div>
          <div className="basis-1/3">{truncatePoolAddress(account)}</div>
          <div className="basis-1/3 flex justify-end">0</div>
        </div>}
        <div className="flex px-6 py-5 bg-main rounded-lg">
          <div className="basis-1/3">
            <div className="rounded-full flex items-center justify-center w-6 h-6 text-primary bg-[#FBC945]">1</div>
          </div>
          <div className="basis-1/3">0x56ad…1234</div>
          <div className="basis-1/3 flex justify-end">4,179,961</div>
        </div>
        <div className="flex px-6 py-5 bg-main rounded-lg">
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
      {activeTab === Tab.Referral && <div className="flex">
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col rounded-3xl p-5 bg-[#20356D] bg-no-repeat bg-right-bottom bg-[url('/points_referral_bg.png')] bg-contain">
            <div className="text-white text-[32px] font-semibold mb-3 leading-none max-w-[388px]">Invite your Friends to <br/> earn more points</div>
            <div className="text-[#FFFFFF80] max-w-[388px]">The inviter receives 10% rewards of 1 friend, KOL will get more. Apply as a KOL→</div>
            <div className="flex mt-10 gap-5">
              <div className="bg-[#FFFFFF26] flex rounded-lg p-3 items-center w-[200px]">
                <div className="bg-[#FFFFFF1A] flex items-center justify-center rounded-lg w-10 h-10">
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5981 0C13.4537 3.78756 17.8001 5.58804 21.0834 3.5148C19.01 6.798 20.8105 11.1444 24.5981 12C20.8105 12.8556 19.01 17.202 21.0834 20.4853C17.8001 18.412 13.4537 20.2124 12.5981 24C11.7425 20.2124 7.39608 18.412 4.11288 20.4853C6.186 17.202 4.38552 12.8556 0.598083 12C4.38564 11.1444 6.18612 6.798 4.11288 3.5148C7.39608 5.58792 11.7425 3.78744 12.5981 0Z" fill="white"/>
                  </svg>
                </div>
                <div className="ml-5">
                  <div className="text-[#FFFFFF80] text-sm">My referral Points</div>
                  <div className="text-white text-2xl font-semibold mt-1">100</div>
                </div>
              </div>
              <div className="bg-[#FFFFFF26] flex rounded-lg p-3 items-center w-[200px]">
                <div className="bg-[#FFFFFF1A] flex items-center justify-center rounded-lg w-10 h-10">
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_132_13127)">
                    <path d="M13.0981 11.95C13.5814 11.4167 13.9523 10.8083 14.2106 10.125C14.4689 9.44167 14.5981 8.73333 14.5981 8C14.5981 7.26667 14.4689 6.55833 14.2106 5.875C13.9523 5.19167 13.5814 4.58333 13.0981 4.05C14.0981 4.18333 14.9314 4.625 15.5981 5.375C16.2648 6.125 16.5981 7 16.5981 8C16.5981 9 16.2648 9.875 15.5981 10.625C14.9314 11.375 14.0981 11.8167 13.0981 11.95ZM18.5981 20V17C18.5981 16.4 18.4648 15.8292 18.1981 15.2875C17.9314 14.7458 17.5814 14.2667 17.1481 13.85C17.9981 14.15 18.7856 14.5375 19.5106 15.0125C20.2356 15.4875 20.5981 16.15 20.5981 17V20H18.5981ZM20.5981 13V11H18.5981V9H20.5981V7H22.5981V9H24.5981V11H22.5981V13H20.5981ZM8.59808 12C7.49808 12 6.55642 11.6083 5.77308 10.825C4.98975 10.0417 4.59808 9.1 4.59808 8C4.59808 6.9 4.98975 5.95833 5.77308 5.175C6.55642 4.39167 7.49808 4 8.59808 4C9.69808 4 10.6398 4.39167 11.4231 5.175C12.2064 5.95833 12.5981 6.9 12.5981 8C12.5981 9.1 12.2064 10.0417 11.4231 10.825C10.6398 11.6083 9.69808 12 8.59808 12ZM0.598083 20V17.2C0.598083 16.6333 0.743917 16.1125 1.03558 15.6375C1.32725 15.1625 1.71475 14.8 2.19808 14.55C3.23142 14.0333 4.28142 13.6458 5.34808 13.3875C6.41475 13.1292 7.49808 13 8.59808 13C9.69808 13 10.7814 13.1292 11.8481 13.3875C12.9148 13.6458 13.9648 14.0333 14.9981 14.55C15.4814 14.8 15.8689 15.1625 16.1606 15.6375C16.4523 16.1125 16.5981 16.6333 16.5981 17.2V20H0.598083Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_132_13127">
                    <rect width="24" height="24" fill="white" transform="translate(0.598083)"/>
                    </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="ml-5">
                  <div className="text-[#FFFFFF80] text-sm">Invited users</div>
                  <div className="text-white text-2xl font-semibold mt-1">3</div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              
            </div>
          </div>
          <div className="flex flex-col rounded-3xl bg-paper">
            <div className="text-primary text-xl font-semibold p-5">History</div>
            <div className="bg-[#1A1A1B1A] text-[#1A1A1B80] flex py-[10px] px-5">
              <div className="basis-1/3">Invited address</div>
              <div className="basis-1/3">Time</div>
              <div className="basis-1/3 flex justify-end">Points</div>
            </div>
            <div className="text-[#1A1A1B] flex p-5">
              <div className="basis-1/3 font-semibold">0x56ad…1234</div>
              <div className="basis-1/3 font-semibold">2022/07/01 17:19:39</div>
              <div className="basis-1/3 flex justify-end font-semibold">+ 4,179,961</div>
            </div>
            <div className="text-[#1A1A1B] flex p-5">
              <div className="basis-1/3 font-semibold">0x56ad…1234</div>
              <div className="basis-1/3 font-semibold">2022/07/01 17:19:39</div>
              <div className="basis-1/3 flex justify-end font-semibold">+ 4,179,961</div>
            </div>
          </div>
        </div>
        <div className="w-[375px] ml-3">
          <div className="flex bg-paper rounded-3xl p-5 mb-3 flex-col">
            <div className="text-lg font-semibold mb-5">My referral link</div>
            <div className="mb-4 flex relative gap-2">
              {
                Array.from({ length: 6 }, (_, i) => i).map(index => {
                  return <div key={index} className="rounded-lg h-16 flex-1 bg-white flex items-center justify-center text-active text-lg font-extrabold">{iCode[index]}</div>
                })
              }
              <input className="absolute opacity-0 w-full h-full" maxLength={6} onChange={(e) => setICode(e.target.value.toUpperCase())}/>
            </div>
            <div><button className="bg-primary flex w-full h-12 items-center justify-center text-white rounded-lg mt-4 font-semibold">Copy Code</button></div>
            <div className="mt-6 flex justify-between">
              <div className="text-sm text-secondary w-[178px]">
                Share your referral link and earn more points!
              </div>
              <div className="flex items-center justify-center bg-paperDarkContrast w-[120px] h-[44px] rounded-3xl cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 15H5C3.61667 15 2.4375 14.5125 1.4625 13.5375C0.4875 12.5625 0 11.3833 0 10C0 8.61667 0.4875 7.4375 1.4625 6.4625C2.4375 5.4875 3.61667 5 5 5H9V7H5C4.16667 7 3.45833 7.29167 2.875 7.875C2.29167 8.45833 2 9.16667 2 10C2 10.8333 2.29167 11.5417 2.875 12.125C3.45833 12.7083 4.16667 13 5 13H9V15ZM6 11V9H14V11H6ZM11 15V13H15C15.8333 13 16.5417 12.7083 17.125 12.125C17.7083 11.5417 18 10.8333 18 10C18 9.16667 17.7083 8.45833 17.125 7.875C16.5417 7.29167 15.8333 7 15 7H11V5H15C16.3833 5 17.5625 5.4875 18.5375 6.4625C19.5125 7.4375 20 8.61667 20 10C20 11.3833 19.5125 12.5625 18.5375 13.5375C17.5625 14.5125 16.3833 15 15 15H11Z" fill="#1F1F1F"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex bg-paper rounded-3xl p-5 mb-3 flex-col">
            <div className="text-lg font-semibold mb-5">Invited by</div>
            <div className="mb-4 flex relative gap-2">
              {
                Array.from({ length: 6 }, (_, i) => i).map(index => {
                  return <div key={index} className="rounded-lg h-16 flex-1 bg-white flex items-center justify-center text-active text-lg font-extrabold">{rCode[index]}</div>
                })
              }
              <input className="absolute opacity-0 w-full h-full" maxLength={6} onChange={(e) => setRCode(e.target.value.toUpperCase())}/>
            </div>
            <div><button className="bg-[#1A1A1B1A] flex w-full h-12 items-center justify-center text-white rounded-lg mt-4 font-semibold">Confirm</button></div>
          </div>
        </div>
      </div>}
    </div>
  </div>
}
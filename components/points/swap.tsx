import SwapPointsIcon from '@/assets/icons/swap-points.svg';
import { useState } from 'react';

export default function Swap() {
  const [collapseList, setCollapseList] = useState(false);
  return <div className='flex md:flex-row flex-col'>
    <div className="bg-paper flex flex-1 flex-col rounded-3xl p-5">
      <div className="text-primary text-[32px] font-semibold mb-3 leading-none">Title about swap mining</div>
      <div className="text-primary mb-7">How to swap to get points,How to swap to get points,How to swap to get points,How to swap to get points,How to swap to get points,How to swap to get points,</div>
      <div><button className="bg-primary w-[200px] h-[48px] flex items-center justify-center text-white rounded-lg mb-12 font-semibold">Swap now</button></div>
      <div className="text-xl font-semibold mb-1">Title about time-limited event, bonus points trading pairs</div>
      <div className="text-[#1A1A1B80] text-sm mb-3">Description description description description description description description description description description description </div>
      <div className="flex flex-wrap gap-3">
        <div className="bg-white rounded-lg w-full md:w-[224px] h-[48px] flex items-center relative [&:hover_.apy]:hidden [&:hover_.swap]:flex cursor-pointer pl-3">
          <div></div>
          <div>USDC/CAKE</div>
          <div className="apy absolute top-0 right-0 bg-[#FEE94F] flex items-center justify-center w-12 h-4 text-xs rounded-bl-lg rounded-tr-lg rounded-tl-sm rounded-br-sm font-bold">20%</div>
          <div className="swap absolute right-0 bg-[#1A1A1B1A] text-[#326AFD] items-center justify-center h-full w-[60px] hidden rounded-r-lg">Swap</div>
        </div>
        <div className="bg-white rounded-lg w-full md:w-[224px] h-[48px] flex items-center relative [&:hover_.apy]:hidden [&:hover_.swap]:flex cursor-pointer pl-3">
          <div></div>
          <div>USDC/CAKE</div>
          <div className="apy absolute top-0 right-0 bg-[#FEE94F] flex items-center justify-center w-12 h-4 text-xs rounded-bl-lg rounded-tr-lg rounded-tl-sm rounded-br-sm font-bold">20%</div>
          <div className="swap absolute right-0 bg-[#1A1A1B1A] text-[#326AFD] items-center justify-center h-full w-[60px] hidden rounded-r-lg">Swap</div>
        </div>
        <div className="bg-white rounded-lg w-full md:w-[224px] h-[48px] flex items-center relative [&:hover_.apy]:hidden [&:hover_.swap]:flex cursor-pointer pl-3">
          <div></div>
          <div>USDC/CAKE</div>
          <div className="apy absolute top-0 right-0 bg-[#FEE94F] flex items-center justify-center w-12 h-4 text-xs rounded-bl-lg rounded-tr-lg rounded-tl-sm rounded-br-sm font-bold">20%</div>
          <div className="swap absolute right-0 bg-[#1A1A1B1A] text-[#326AFD] items-center justify-center h-full w-[60px] hidden rounded-r-lg">Swap</div>
        </div>
        <div className="bg-white rounded-lg w-full md:w-[224px] h-[48px] flex items-center relative [&:hover_.apy]:hidden [&:hover_.swap]:flex cursor-pointer pl-3">
          <div></div>
          <div>USDC/CAKE</div>
          <div className="apy absolute top-0 right-0 bg-[#FEE94F] flex items-center justify-center w-12 h-4 text-xs rounded-bl-lg rounded-tr-lg rounded-tl-sm rounded-br-sm font-bold">20%</div>
          <div className="swap absolute right-0 bg-[#1A1A1B1A] text-[#326AFD] items-center justify-center h-full w-[60px] hidden rounded-r-lg">Swap</div>
        </div>
        <div className="bg-white rounded-lg w-full md:w-[224px] h-[48px] flex items-center relative [&:hover_.apy]:hidden [&:hover_.swap]:flex cursor-pointer pl-3">
          <div></div>
          <div>USDC/CAKE</div>
          <div className="apy absolute top-0 right-0 bg-[#FEE94F] flex items-center justify-center w-12 h-4 text-xs rounded-bl-lg rounded-tr-lg rounded-tl-sm rounded-br-sm font-bold">20%</div>
          <div className="swap absolute right-0 bg-[#1A1A1B1A] text-[#326AFD] items-center justify-center h-full w-[60px] hidden rounded-r-lg">Swap</div>
        </div>
        <div className="bg-white rounded-lg w-full md:w-[224px] h-[48px] flex items-center relative [&:hover_.apy]:hidden [&:hover_.swap]:flex cursor-pointer pl-3">
          <div></div>
          <div>USDC/CAKE</div>
          <div className="apy absolute top-0 right-0 bg-[#FEE94F] flex items-center justify-center w-12 h-4 text-xs rounded-bl-lg rounded-tr-lg rounded-tl-sm rounded-br-sm font-bold">20%</div>
          <div className="swap absolute right-0 bg-[#1A1A1B1A] text-[#326AFD] items-center justify-center h-full w-[60px] hidden rounded-r-lg">Swap</div>
        </div> 
      </div>
    </div>
    <div className='md:hidden flex md:flex-row flex-col fixed bottom-0 left-0 right-0 w-full'>
      <div className="flex flex-1 items-center justify-between bg-paper rounded-t-3xl p-5 relative z-10">
        <div className='flex'>
          {collapseList && <div className="flex items-center mr-5">
            <SwapPointsIcon />
          </div>}
          <div className="flex flex-col">
            <div className="text-xs font-semibold mb-2">My Swap Points</div>
            <div className="text-2xl font-semibold">200</div>
          </div>
        </div>
        <div onClick={() => setCollapseList(!collapseList)}>
          {collapseList ? <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#454851" stroke-opacity="0.1"/>
            <g clip-path="url(#clip0_145_29735)">
            <path d="M22.41 28.41L24.71 26.11L27.58 29L29 27.58L26.11 24.71L28.41 22.41L22.41 22.41L22.41 28.41Z" fill="#1A1A1B" fill-opacity="0.5"/>
            <path d="M11.59 22.41L13.89 24.71L11 27.58L12.42 29L15.29 26.11L17.59 28.41L17.59 22.41L11.59 22.41Z" fill="#1A1A1B" fill-opacity="0.5"/>
            <path d="M17.59 11.59L15.29 13.89L12.42 11L11 12.42L13.89 15.29L11.59 17.59H17.59V11.59Z" fill="#1A1A1B" fill-opacity="0.5"/>
            <path d="M22.41 11.59L24.71 13.89L27.58 11L29 12.42L26.11 15.29L28.41 17.59H22.41V11.59Z" fill="#1A1A1B" fill-opacity="0.5"/>
            </g>
            <defs>
            <clipPath id="clip0_145_29735">
            <rect width="24" height="24" fill="white" transform="translate(8 8)"/>
            </clipPath>
            </defs>
          </svg> : 
          <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="1" width="39" height="39" rx="7.5" stroke="#454851" strokeOpacity="0.1"/>
            <g clipPath="url(#clip0_145_35585)">
            <path d="M23 11.5L25.3 13.8L22.41 16.67L23.83 18.09L26.7 15.2L29 17.5V11.5H23ZM11 17.5L13.3 15.2L16.17 18.09L17.59 16.67L14.7 13.8L17 11.5H11V17.5ZM17 29.5L14.7 27.2L17.59 24.33L16.17 22.91L13.3 25.8L11 23.5V29.5H17ZM29 23.5L26.7 25.8L23.83 22.91L22.41 24.33L25.3 27.2L23 29.5H29V23.5Z" fill="#1A1A1B" fillOpacity="0.5"/>
            </g>
            <defs>
            <clipPath id="clip0_145_35585">
            <rect width="24" height="24" fill="white" transform="translate(8 8.5)"/>
            </clipPath>
            </defs>
          </svg>}
        </div>
      </div>
      {collapseList && <div className='relative'>
        <div className="relative z-10 flex bg-paper flex-col">
          <div className="flex justify-between flex-1 p-5">
            <div className="text-lg font-semibold">History</div>
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
              <path d="M11.4248 6.04565L10.5082 5.12903L7.30001 8.3372L4.09185 5.12903L3.17523 6.04565L7.30002 10.1704L11.4248 6.04565Z" fill="#1A1A1B" fillOpacity="0.5"/>
            </svg>
          </div>
        </div>
        <div className='z-0 bg-backdrop w-full h-full fixed top-0 left-0 right-0'></div>
      </div>}
    </div>
    <div className="w-[375px] ml-3 md:flex flex-col hidden">
      <div className="flex bg-paper rounded-3xl p-5 mb-3">
        <div className="flex items-center mr-5">
          <SwapPointsIcon/>
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-semibold mb-2">My Swap Points</div>
          <div className="text-2xl font-semibold">200</div>
        </div>
      </div>
      <div className="flex bg-paper rounded-3xl flex-col">
        <div className="flex justify-between flex-1 p-5">
          <div className="text-lg font-semibold">History</div>
          <div>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 14.855L17.355 16.5L12 11.1567L6.645 16.5L5 14.855L12 7.855L19 14.855Z" fill="#1A1A1B" fillOpacity="0.5"/>
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
            <path d="M11.4248 6.04565L10.5082 5.12903L7.30001 8.3372L4.09185 5.12903L3.17523 6.04565L7.30002 10.1704L11.4248 6.04565Z" fill="#1A1A1B" fillOpacity="0.5"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
}
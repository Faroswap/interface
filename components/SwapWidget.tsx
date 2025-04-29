'use client';

import { Swap, SwapOrderHistory } from '@dodoex/widgets';
import React from 'react';
import { SwapBanner } from './banner/SwapBanner';

export default function SwapWidget() {
  return (
    <div className="flex flex-col gap-5 md:gap-7 items-center pb-5 md:pb-10 md:pt-7">
      <div>
        <SwapBanner className="md:mx-10 mb-3 md:w-[450px]" />
        <div className="md:px-10 ">
          <div className="relative pb-2 bg-paper overflow-hidden w-full md:w-[450px] min-h-[450px] md:rounded-3xl max-md:rounded-b-3xl">
            <Swap />
          </div>
        </div>
      </div>
      <div className="w-full md:px-10">
        <div className="relative w-full bg-paper rounded-3xl [&&&_th]:bg-paperContrast [&&&_th]:py-[14px] overflow-hidden">
          <div className="p-5 font-semibold border-b">Order History</div>
          <SwapOrderHistory />
        </div>
      </div>
    </div>
  );
}

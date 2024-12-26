'use client';

import { Swap, SwapOrderHistory } from '@dodoex/widgets';
import React from 'react';

export default function SwapWidget() {
  return (
    <>
      <div className="relative pb-2 bg-paper overflow-hidden w-full md:w-[450px] min-h-[450px] rounded-2xl">
        <Swap />
      </div>
      <div className="relative w-full bg-paper rounded-2xl [&&&_th]:bg-paperContrast [&&&_th]:py-[14px] overflow-hidden">
        <div className="p-5 font-semibold border-b">Order History</div>
        <SwapOrderHistory />
      </div>
    </>
  );
}

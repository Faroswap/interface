'use client';

import { TokenInfo } from '@dodoex/widgets';
import React from 'react';

export type SwapTokenChangeHandlers = {
  onPayTokenChange?: (token: TokenInfo) => void;
  onReceiveTokenChange?: (token: TokenInfo) => void;
};

export const SwapTokenChangeContext =
  React.createContext<SwapTokenChangeHandlers>({});

import { create } from 'zustand';

interface GlobalStatusState {
  openConnectWallet: boolean;
}

export const useGlobalStatus = create<GlobalStatusState>(() => ({
  openConnectWallet: false,
}));

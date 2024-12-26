import { Client } from '@dodoex/message-ws';
import { create } from 'zustand';
import { getMessageClient } from './useInitMessageClient';
import { useWalletStore } from '@dodoex/wallet-web3';

export interface MessageClientState {
  client: Client | null;
  lastPongTime: number;
  getClient: () => Client;
}

export const useMessageClientStore = create<MessageClientState>((_, get) => ({
  client: null,
  lastPongTime: 0,
  getClient: () => {
    let client = get().client;
    if (client) return client;
    client = getMessageClient({
      account: useWalletStore.getState().account,
    });
    if (!client) {
      throw new Error('client is undefined');
    }
    return client;
  },
}));

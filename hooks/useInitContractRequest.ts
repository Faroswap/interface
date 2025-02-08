import { RpcProxyProvider } from '@/constants/RpcProxyProvider';
import { ContractRequests } from '@dodoex/contract-request';
import {
  multiCallAddressList,
  setContractRequests,
} from '@dodoex/dodo-contract-request';
import { useWalletStore } from '@dodoex/wallet-web3';
import React from 'react';

export function useInitContractRequest() {
  const { chainId: currentChainId } = useWalletStore();

  React.useEffect(() => {
    const contractRequests = new ContractRequests({
      multiCallAddressList,
      getProvider: (chainId) => {
        if (chainId === currentChainId) {
          const provider = useWalletStore.getState().provider;
          if (provider) {
            return provider;
          }
        }
        const provider = new RpcProxyProvider(undefined, chainId);
        return provider;
      },
    });
    setContractRequests(contractRequests);
  }, [currentChainId]);
}

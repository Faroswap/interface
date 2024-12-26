import { useWalletStore } from '@dodoex/wallet-web3';
import { useSubmission } from './state';
import { Request, Requests, State } from './types';

export function useRequests() {
  const { chainId, account } = useWalletStore();
  const { requests } = useSubmission();
  const newRequests = {} as Requests;
  const runningRequestList = [] as Request[];
  Object.values(requests).forEach(([request, state]) => {
    if (request.chainId === chainId && request.account === account) {
      newRequests[request.tx] = [request, state];
      if (state === State.Running) {
        runningRequestList.push(request);
      }
    }
  });

  return {
    requests: newRequests,
    runningRequestList,
  };
}

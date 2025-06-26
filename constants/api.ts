import { getClientAuth } from '@/utils/auth';
import { ContractRequests, GraphQLRequests, TokenApi } from '@dodoex/api';
import { useWalletStore } from '@dodoex/wallet-web3';
import { QueryClient } from '@tanstack/react-query';
import { API_DOMAIN, GRAPHQL_URL } from './url';
import { RpcProxyProvider } from './RpcProxyProvider';

export const queryClient = new QueryClient();

export const graphQLRequests = new GraphQLRequests({
  url: GRAPHQL_URL,
  getHeaders: async () => {
    const token = await getClientAuth({
      account: useWalletStore.getState().account,
    });
    return {
      'Access-Token': token,
    };
  },
});

export const contractRequests = new ContractRequests({
  getProvider: (chainId) => {
    if (chainId === useWalletStore.getState().chainId) {
      const provider = useWalletStore.getState().provider;
      if (provider) {
        return provider;
      }
    }
    const provider = new RpcProxyProvider(undefined, chainId);
    return provider;
  },
});

export const tokenApi = new TokenApi({
  contractRequests: contractRequests,
});

export const MessageGQLClientEndpoint = `wss://api.dodoex.io/frontend-message`;
export const TOKEN_LOGO_URL = `https://token-img.dodoex.io`;
export const IMAGE_PROXY_URL = `https://images.dodoex.io`;

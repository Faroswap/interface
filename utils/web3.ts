import { SINGLE_CHAIN_ID, TITLE } from '@/constants/config';
import WalletWeb3, { WalletType } from '@dodoex/wallet-web3';
import { rpcServerMap } from '@dodoex/widgets';

export let walletWeb3: WalletWeb3 | undefined;

if (typeof window !== 'undefined') {
  walletWeb3 = new WalletWeb3({
    providerConfig: {
      appName: TITLE,
      appLogoUrl: '',
      // JsonRpcProvider:
      //   typeof window !== 'undefined' ? RpcProxyProvider : undefined,
      chainId: SINGLE_CHAIN_ID,
      rpc: {
        [SINGLE_CHAIN_ID]: rpcServerMap[SINGLE_CHAIN_ID]?.[0],
      },
    },
    walletListConfig: {
      includes: [
        WalletType.injected,
        WalletType.OKX,
        WalletType.Gnosis,
        WalletType.WalletConnect,
      ],
      eip6963IgnoreIncludes: true,
      showAllInjected: true,
      showNotSupport: true,
    },
  });
  walletWeb3.autoConnect();
}

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
      walletConnectParams: {
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || '',
      },
    },
    walletListConfig: {
      eip6963IgnoreIncludes: true,
      keysSort: [
        'MetamaskWallet',
        'Bitkeep',
        'OKXWallet',
        'BSC',
        'Bybit',
        'WalletLink',
        'Zerion',
        'Trust',
        'WalletConnect',
        'ImToken',
        'Rainbow',
        'BSC',
        'Ledger',
        'TokenPocket',
        'Gate',
        'Frontier',
        'KuCoin',
        'Math',
        'Brave',
        'OpenBlock',
        'OneKey',
        'Nabox',
        'FoxWallet',
        'UniPass',
        'Coin98',
        'Gnosis',
        'Rabby',
      ],
      excludes: [
        WalletType.Portis,
        WalletType.Alchemy,
        WalletType.Holdstation,
        WalletType.SocialLogin,
        WalletType.uAuth,
        WalletType.Cyber,
        WalletType.Blocto,
      ],
      excludeNames: ['GameStop Wallet'],
      showAllInjected: true,
      showNotSupport: true,
      lastConnectedFirst: true,
    },
  });
  walletWeb3.autoConnect();
}

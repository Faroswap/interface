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
      uAuthParams: {
        clientID: 'fdad0caf-42d8-47e6-9e43-4d100d9c5484',
        redirectUri: window.location.origin,
      },
      cyberParams: {
        appId: '77cd9ea7-ae31-472e-8332-21cb26e9398e',
      },
      particleParams: {
        projectId: '6ffd5e1a-59ee-47a6-97b3-c3e597bcc876',
        clientKey: 'cbXrrngfTLIHQSN9jR8kZTYgq3k28jsjGj2bgUVs',
        appId: 'b8261e1c-6ce4-405c-aaec-f61895a74c2a',
        wallet: {
          // https://wallet.particle.network/?customStyleSetting=true
          customStyle: {
            light: {
              primaryIconButtonBackgroundColors: ['#6851B4', '#6851B4'],
              colorAccent: '#6851B4',
            },
            dark: {
              colorPrimary: '#33363F',
              primaryIconButtonBackgroundColors: ['#BC9CFF', '#BC9CFF'],
              colorAccent: '#BC9CFF',
            },
          },
        },
      },
      bloctoParams: {
        appId: '551be289-9419-42a4-b094-92b2b07ea008',
      },
    },
    walletListConfig: {
      eip6963IgnoreIncludes: true,
      keysSort: [
        'MetamaskWallet',
        'SocialLogin',
        'Bybit',
        'WalletLink',
        'Zerion',
        'Trust',
        'OKXWallet',
        'WalletConnect',
        'ImToken',
        'Rainbow',
        'BSC',
        'Ledger',
        'TokenPocket',
        'Gate',
        'Frontier',
        'Blocto',
        'KuCoin',
        'Math',
        'Brave',
        'OpenBlock',
        'OneKey',
        'Bitkeep',
        'Nabox',
        'UAuth',
        'FoxWallet',
        'Cyber',
        'UniPass',
        'Coin98',
        'Gnosis',
        'Rabby',
        'Alchemy',
      ],
      excludes: [WalletType.Portis, WalletType.Alchemy],
      excludeNames: ['GameStop Wallet'],
      showAllInjected: true,
      showNotSupport: true,
      lastConnectedFirst: true,
    },
  });
  walletWeb3.autoConnect();
}

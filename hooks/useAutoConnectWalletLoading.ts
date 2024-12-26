import { useWalletStore } from '@dodoex/wallet-web3';
import React from 'react';

export function useAutoConnectWalletLoading() {
  const [loading, setLoading] = React.useState(true);
  const { account, connectLoading } = useWalletStore();

  React.useEffect(() => {
    let time = 0;
    if (loading && !connectLoading) {
      time = window.setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectLoading]);

  return React.useMemo(() => !account && loading, [account, loading]);
}

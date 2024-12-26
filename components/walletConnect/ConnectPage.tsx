import { useWalletStore, WalletType } from '@dodoex/wallet-web3';
import { Loading } from '@dodoex/icons';
import { DialogTitle } from '../Dialog';
import { Trans } from '@lingui/macro';
import { walletWeb3 } from '@/utils/web3';
import clsx from 'clsx';
import Image from 'next/image';
import { SAFE_URL, SINGLE_CHAIN_ID } from '@/constants/config';

export default function AccountPage({ onClose }: { onClose: () => void }) {
  const { eip6963WalletList, walletType, connectingType } = useWalletStore();
  const walletListOrigin =
    walletWeb3?.getWalletList(undefined, {
      eip6963WalletList,
    }) ?? [];
  const walletList = walletListOrigin.map((wallet) => {
    if (wallet.type === WalletType.Gnosis && SAFE_URL) {
      return {
        ...wallet,
        link: SAFE_URL,
        supportChains: [...(wallet.supportChains ?? []), SINGLE_CHAIN_ID],
      };
    }
    return wallet;
  });

  return (
    <>
      <DialogTitle center onClose={onClose}>
        <Trans>Connect Wallet</Trans>
      </DialogTitle>
      <div className="px-4 pb-7">
        <div
          className={clsx(
            'grid gap-3 max-h-[290px]',
            walletList.length > 2 ? 'grid-cols-2' : 'grid-cols-1',
          )}
        >
          {walletList.map((wallet) => {
            const loading = connectingType === wallet.type;
            return (
              <button
                key={wallet.showName}
                className={clsx(
                  'flex flex-col items-center py-5 rounded-lg bg-tag hover:bg-hover active:bg-primary',
                  {
                    active: loading || walletType === wallet.type,
                  },
                )}
                onClick={async () => {
                  await walletWeb3?.clickWallet(wallet);
                  onClose();
                }}
              >
                <Image
                  src={wallet.logo}
                  alt={wallet.showName}
                  width={36}
                  height={36}
                />
                <div className="mt-3 font-semibold">
                  {loading ? (
                    <Loading className="w-5 text-secondary animate-spin" />
                  ) : (
                    wallet.showName
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

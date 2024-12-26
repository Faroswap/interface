import { useWalletStore } from '@dodoex/wallet-web3';
import Dialog from '../Dialog';
import AccountPage from './AccountPage';
import ConnectPage from './ConnectPage';
import React from 'react';
import SendTokenPage from './SendTokenPage';
import clsx from 'clsx';
import ReceiveTokenPage from './ReceiveTokenPage';

export default function WalletDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { account } = useWalletStore();
  const [showSendTokenPage, setShowSendTokenPage] = React.useState(false);
  const [showReceiveTokenPage, setShowReceiveTokenPage] = React.useState(false);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      bodyClassName={clsx('md:w-[420px]', { 'h-[80vh]': account })}
    >
      {account ? (
        <>
          {showSendTokenPage ? (
            <SendTokenPage
              open={showSendTokenPage}
              onClose={onClose}
              onBack={() => setShowSendTokenPage(false)}
            />
          ) : showReceiveTokenPage ? (
            <ReceiveTokenPage
              onClose={onClose}
              onBack={() => setShowReceiveTokenPage(false)}
            />
          ) : (
            <AccountPage
              onClose={onClose}
              setShowSendTokenPage={setShowSendTokenPage}
              setShowReceiveTokenPage={setShowReceiveTokenPage}
            />
          )}
        </>
      ) : (
        <ConnectPage onClose={onClose} />
      )}
    </Dialog>
  );
}

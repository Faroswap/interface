'use client';
import WalletIcon from '@/assets/icons/wallet.svg';
import { truncatePoolAddress } from '@/utils/address';
import { Trans } from '@lingui/macro';
import WalletDialog from './WalletDialog';
import React from 'react';
import { useWalletStore } from '@dodoex/wallet-web3';
import { useGlobalStatus } from '@/utils/useGlobalStatus';
import { Loading } from '@dodoex/icons';
import Tooltip from '../Tooltip';
import { TransactionList } from './ActivityList';
import { useTransactionList } from '@/hooks/useTransactionList';
import { SINGLE_CHAIN_ID } from '@/constants/config';

function WalletPendingBtn(props: React.PropsWithChildren) {
  const { account } = useWalletStore();
  const chainId = SINGLE_CHAIN_ID;
  const fetchTransactionQuery = useTransactionList({
    account,
    chainId,
  });
  const len = fetchTransactionQuery.pendingList.length;
  if (!len) return <>{props.children}</>;
  return (
    <Tooltip
      placement="bottom-end"
      title={
        <div className="w-[382px] overflow-y-auto">
          <TransactionList
            account={account}
            isLoading={
              fetchTransactionQuery.isLoading || fetchTransactionQuery.isPending
            }
            list={fetchTransactionQuery.pendingList}
          />
        </div>
      }
    >
      <button
        className="btn gap-2 primary"
        onClick={() => useGlobalStatus.setState({ openConnectWallet: true })}
      >
        <WalletIcon />
        {len}&nbsp;
        <Trans>pending...</Trans>
        <Loading className="w-5 text-primaryContract animate-spin" />
      </button>
    </Tooltip>
  );
}

export default function ConnectWalletBtn() {
  const account = useWalletStore((state) => state.account);
  const open = useGlobalStatus((state) => state.openConnectWallet);

  return (
    <>
      <WalletPendingBtn>
        <button
          className="btn gap-2 bg-paperDarkContrast text-xs md:text-sm"
          onClick={() => useGlobalStatus.setState({ openConnectWallet: true })}
        >
          <WalletIcon />
          {account ? (
            truncatePoolAddress(account)
          ) : (
            <Trans>Connect a wallet</Trans>
          )}
        </button>
      </WalletPendingBtn>
      <WalletDialog
        open={open}
        onClose={() => useGlobalStatus.setState({ openConnectWallet: false })}
      />
    </>
  );
}

import { useWalletStore } from '@dodoex/wallet-web3';
import { DialogTitle } from '../Dialog';
import { Trans } from '@lingui/macro';
import Image from 'next/image';
import SingleChainLogo from '@/assets/logo/single-chain.svg';
import SingleChainBCLogo from '@/assets/logo/single-chain-bc.svg';
import { truncatePoolAddress } from '@/utils/address';
import Tooltip from '../Tooltip';
import {
  ArrowBack,
  ArrowTopRightBorder,
  Copy,
  Disconnect,
  Loading,
} from '@dodoex/icons';
import copy from 'copy-to-clipboard';
import React from 'react';
import LoadingSkeleton from '../Skeleton/LoadingSkeleton';
import BigNumber from 'bignumber.js';
import { formatReadableNumber, formatShortNumber } from '@dodoex/widgets';
import { TabPanel, Tabs, TabsGroup } from '@dodoex/components';
import HasBalanceTokenList from './HasBalanceTokenList';
import { useHasBalanceTokenList } from '@/hooks/useHasBalanceTokenList';
import ActivityList from './ActivityList';
import { SINGLE_CHAIN_ID } from '@/constants/config';
import { useTransactionList } from '@/hooks/useTransactionList';
import { walletWeb3 } from '@/utils/web3';

enum ListTab {
  tokens = 'tokens',
  activity = 'activity',
}

interface Props {
  onClose: () => void;
  setShowSendTokenPage: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReceiveTokenPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountPage({
  onClose,
  setShowSendTokenPage,
  setShowReceiveTokenPage,
}: Props) {
  const account = useWalletStore((state) => state.account);
  const chainId = SINGLE_CHAIN_ID;
  const connectedWallet = useWalletStore((state) => state.connected?.wallet);

  const [listTab, setListTab] = React.useState(ListTab.tokens);

  const fetchTransactionQuery = useTransactionList({
    account,
    chainId,
  });
  const tabs = [
    { key: ListTab.tokens, value: <Trans>Token</Trans> },
    {
      key: ListTab.activity,
      value: (
        <Tooltip title={<Trans>On-chain transaction records</Trans>}>
          <div className="flex items-center gap-[2px]">
            <Trans>Activity</Trans>
            {!!fetchTransactionQuery.pendingList.length && (
              <Loading className="w-5 text-active animate-spin" />
            )}
          </div>
        </Tooltip>
      ),
    },
  ];

  const balanceListData = useHasBalanceTokenList({
    account,
    chainId,
    visible: listTab === ListTab.tokens,
  });
  const allFiatPriceBalance = balanceListData.allFiatPriceBalance;
  const allFiatPriceBalanceLoading = balanceListData.allFiatPriceBalanceLoading;
  const scrollRef = React.useRef<HTMLDivElement>(null);

  if (!account || !connectedWallet) return null;
  return (
    <>
      <DialogTitle onClose={onClose}>
        <div className="flex gap-2 items-center h-[34px] rounded-lg bg-paperContrast">
          <div className="flex items-center gap-1 pl-2">
            <div className="relative pr-[6px]">
              <Image
                src={connectedWallet.logo}
                alt={connectedWallet.showName}
                width={22}
                height={22}
              />
              <SingleChainLogo className="absolute bottom-0 right-0 w-3 h-3 rounded-md border" />
            </div>
            {truncatePoolAddress(account)}
          </div>
          <Tooltip
            onlyClick
            arrow={false}
            autoClose
            title={<Trans>Copied</Trans>}
          >
            <Copy
              className="w-[18px] h-[18px] cursor-pointer text-secondary hover:text-primary"
              onClick={() => {
                copy(account);
              }}
            />
          </Tooltip>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href=""
            className="flex leading-none text-secondary hover:text-primary"
          >
            <ArrowTopRightBorder className="w-[18px] h-[18px]" />
          </a>
          <button
            className="flex items-center justify-center h-full px-2 border-l text-error hover:bg-tag"
            onClick={() => {
              walletWeb3?.disconnectWallet();
            }}
          >
            <Disconnect className="w-[18px] h-[18px]" />
          </button>
        </div>
      </DialogTitle>
      <div className="flex flex-col px-5 pb-5 overflow-y-auto" ref={scrollRef}>
        <AccountCardInfo
          setShowSendTokenPage={setShowSendTokenPage}
          setShowReceiveTokenPage={setShowReceiveTokenPage}
          allFiatPriceBalance={allFiatPriceBalance}
          allFiatPriceBalanceLoading={allFiatPriceBalanceLoading}
        />
        <Tabs
          value={listTab}
          onChange={(_, v) => setListTab(v as ListTab)}
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <TabsGroup tabs={tabs} />
          <TabPanel
            value={ListTab.tokens}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <HasBalanceTokenList balanceListData={balanceListData} />
          </TabPanel>
          <TabPanel
            value={ListTab.activity}
            className="pt-2"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <ActivityList
              fetchTransactionQuery={fetchTransactionQuery}
              getScrollParent={() => scrollRef.current}
            />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}

function AccountCardInfo({
  setShowSendTokenPage,
  setShowReceiveTokenPage,
  allFiatPriceBalance,
  allFiatPriceBalanceLoading,
}: {
  setShowSendTokenPage: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReceiveTokenPage: React.Dispatch<React.SetStateAction<boolean>>;
  allFiatPriceBalance: BigNumber;
  allFiatPriceBalanceLoading: boolean;
}) {
  const operateCardClassName =
    'flex-1 flex flex-col gap-3 px-5 py-3 text-sm bg-paperDarkContrast rounded-xl hover:bg-primary';
  return (
    <AccountCardInfoBg>
      <div className="text-sm text-secondary font-semibold">
        <Trans>Balance</Trans>
      </div>
      <div className="text-4xl mt-1"></div>
      <LoadingSkeleton
        loading={allFiatPriceBalanceLoading}
        loadingClassName="w-[120px]"
        className="text-4xl mt-1 font-semibold"
        title={formatReadableNumber({ input: allFiatPriceBalance })}
      >
        ${formatShortNumber(allFiatPriceBalance)}
      </LoadingSkeleton>
      <div className="flex justify-between items-center gap-5 mt-7">
        {/* send */}
        <button
          className={operateCardClassName}
          onClick={() => setShowSendTokenPage(true)}
        >
          <ArrowBack className="rotate-90" />
          <Trans>Send</Trans>
        </button>
        {/* receive */}
        <button
          className={operateCardClassName}
          onClick={() => setShowReceiveTokenPage(true)}
        >
          <ArrowBack className="-rotate-90" />
          <Trans>Receive</Trans>
        </button>
      </div>
    </AccountCardInfoBg>
  );
}

function AccountCardInfoBg({ children }: React.PropsWithChildren) {
  return (
    <div className="relative p-5 rounded-xl border z-0">
      <div className="absolute inset-0 -z-[1] overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-paperContrast" />
        <div className="absolute inset-0">
          <SingleChainBCLogo className="w-[calc(100%+2px)] h-auto absolute top-1/2 -translate-y-1/2 opacity-50 blur-[100px]" />
          <SingleChainBCLogo className="w-[calc(100%+2px)] h-auto absolute left-[60px] bottom-10 opacity-20 blur-[7.5px]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(108deg,_rgba(255,255,255,0.9)_0.9%,_rgba(255,255,255,0)_49.94%)]" />
      </div>
      {children}
    </div>
  );
}

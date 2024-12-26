import { useWalletStore } from '@dodoex/wallet-web3';
import { ArrowBack, Copy } from '@dodoex/icons';
import { DialogTitle } from '../Dialog';
import { Trans } from '@lingui/macro';
import React from 'react';
import Tooltip from '../Tooltip';
import copy from 'copy-to-clipboard';
import { QRCodeSVG } from 'qrcode.react';

export default function ReceiveTokenPage({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack: () => void;
}) {
  const { account } = useWalletStore();

  if (!account) return null;

  return (
    <>
      <DialogTitle onClose={onClose}>
        <button onClick={onBack} className="flex gap-2 items-center">
          <ArrowBack className="w-4 h-4" />
          <Trans>Receive</Trans>
        </button>
      </DialogTitle>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex flex-col justify-between items-center flex-1 pt-7 pb-5 w-[326px] mx-auto">
          <div>
            <div className="p-9 rounded-xl border">
              <QRCodeSVG id="qrcode" size={252} value={account} level="M" />
            </div>
            <div className="mt-3 text-secondary break-all text-center">
              {account}
            </div>
          </div>
          <Tooltip
            onlyClick
            arrow={false}
            autoClose
            title={<Trans>Copied</Trans>}
          >
            <button
              className="flex gap-1 mt-3 w-full h-12 font-semibold btn bg-paperDarkContrast"
              onClick={() => {
                copy(account);
              }}
            >
              <Copy className="w-[18px] h-[18px]" />
              <Trans>Copy wallet address</Trans>
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

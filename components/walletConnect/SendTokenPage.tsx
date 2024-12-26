import { useWalletStore } from '@dodoex/wallet-web3';
import { isAddress } from '@ethersproject/address';
import { ArrowBack, Loading } from '@dodoex/icons';
import { basicTokenMap, ChainId, TokenApi } from '@dodoex/api';
import { DialogTitle } from '../Dialog';
import { Trans } from '@lingui/macro';
import React from 'react';
import { TokenCard, TokenInfo } from '@dodoex/widgets';
import { useMutation } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useSubmissionExecute } from '@/submission/useSubmissionExecute';
import { OpCode } from '@/submission/spec';
import { ExecutionResult, MetadataFlag } from '@/submission/types';
import { truncatePoolAddress } from '@/utils/address';
import Widget from '../Widget';

export default function SendTokenPage({
  open,
  onClose,
  onBack,
}: {
  open?: boolean;
  onClose: () => void;
  onBack: () => void;
}) {
  const { chainId } = useWalletStore();
  const defaultToken = {
    ...basicTokenMap[chainId as ChainId],
    chainId,
  };
  const [token, setToken] = React.useState<TokenInfo | null>(defaultToken);
  const [amount, setAmount] = React.useState('');
  const [receiverAddress, setReceiverAddress] = React.useState('');
  const [receiverAddressFormat, setReceiverAddressFormat] = React.useState('');
  const [invalidReceiver, setInvalidReceiver] = React.useState(false);

  const disabled =
    !amount ||
    !receiverAddress ||
    invalidReceiver ||
    !isAddress(receiverAddress);
  const execute = useSubmissionExecute();

  const sendTokenMutation = useMutation({
    mutationFn: async () => {
      if (disabled || !token) return;
      const amountWei = new BigNumber(amount).times(10 ** token.decimals);
      const amountWeiStr = `0x${amountWei.toString(16)}`;
      let data = '';
      let paramsValue = '';
      let to = token.address;
      if (token.address.toLowerCase() === defaultToken.address.toLowerCase()) {
        paramsValue = amountWeiStr;
        data = '0x';
        to = receiverAddress;
      } else {
        paramsValue = '0x0';
        data = await TokenApi.encode.transferEncodeABI(
          receiverAddress,
          amountWeiStr,
        );
      }
      const result = await execute({
        brief: 'wallet.account.card.operate.send',
        spec: {
          opcode: OpCode.TX,
          value: paramsValue,
          to,
          data,
        },
        successBack: () => {
          // queryClient.invalidateQueries({
          //   queryKey: ['graphql', 'FetchCrossChainDODOOrderList'],
          // });
        },
        metadata: {
          [MetadataFlag.sendToken]: true,
        },
      });
      if (result === ExecutionResult.Success) {
        setAmount('');
      }
    },
  });

  React.useEffect(() => {
    if (open) {
      setToken(defaultToken);
      setAmount('');
      sendTokenMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      <DialogTitle onClose={onClose}>
        <button onClick={onBack} className="flex gap-2 items-center">
          <ArrowBack className="w-4 h-4" />
          <Trans>Send</Trans>
        </button>
      </DialogTitle>
      <div className="flex flex-col justify-between flex-1 px-5 pb-5 overflow-y-auto">
        <div>
          <div className="p-5 bg-input rounded-2xl">
            <div className="text-secondary text-lg font-semibold">
              <Trans>Receiver address</Trans>
            </div>
            <input
              className="mt-3 w-full text-4xl font-semibold placeholder:text-disabled bg-transparent"
              placeholder="0x..."
              value={receiverAddressFormat || receiverAddress}
              onChange={(evt) => {
                setReceiverAddress(evt.target.value);
                setInvalidReceiver(false);
              }}
              onFocus={() => {
                setReceiverAddressFormat('');
              }}
              onBlur={(evt) => {
                const value = evt.target.value;
                if (!value) return;
                if (!isAddress(value)) {
                  setInvalidReceiver(true);
                } else {
                  setReceiverAddressFormat(truncatePoolAddress(value));
                }
              }}
            />
            {!!invalidReceiver && (
              <div className="mt-1 text-error text-xs">
                <Trans>Invalid wallet address</Trans>
              </div>
            )}
          </div>
          <Widget>
            <TokenCard
              amt={amount}
              onInputChange={(v) => setAmount(v)}
              token={token}
              onTokenChange={(token) => setToken(token)}
              showPercentage
              sx={{
                mt: 12,
                pb: 20,
                '&&& input': {
                  typography: 'h1',
                  '&::placeholder': {
                    typography: 'h1',
                  },
                },
              }}
            />
          </Widget>
        </div>
        <button
          className="flex gap-1 mt-3 w-full h-12 font-semibold btn primary"
          disabled={disabled}
          onClick={() => {
            if (sendTokenMutation.isPending) return;
            sendTokenMutation.mutate();
          }}
        >
          {sendTokenMutation.isPending && (
            <Loading className="w-5 text-primary-contrastText animate-spin" />
          )}
          <Trans>Send</Trans>
        </button>
      </div>
    </>
  );
}

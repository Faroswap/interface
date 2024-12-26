/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWalletStore } from '@dodoex/wallet-web3';
import { SubmitTxTracking } from './types';
import { useSubmitTxStore } from './state';
import { useMessageClientStore } from '@/hooks/messageClient/useMessageClientStore';
import { MESSAGE_SOURCE } from '@/constants/config';

export async function submitUserTxTracking(
  options: Omit<SubmitTxTracking, 'failedTime'>,
  {
    isNotInsert,
  }: {
    isNotInsert?: boolean;
  } = {},
) {
  const messageClient = useMessageClientStore.getState().getClient();
  if (!options) {
    throw new Error('submitUserTxTracking options is not valid.');
  }
  if (typeof options.hash !== 'string') {
    const api = `messageClient.submitUserTxTracking error(tx)`;
    console.error('api:', api, 'params:', options);
    return undefined;
  }
  if (!isNotInsert) {
    useSubmitTxStore.getState().addSubmitTx(options);
  }
  return new Promise((resolve) => {
    const newOptions = { ...options };
    const isSafe = useWalletStore.getState().connected?.isSafe;
    if (isSafe && options.extra?.transactionReceipt) {
      newOptions.extra.transactionHash =
        options.extra.transactionReceipt.transactionHash;
    }
    messageClient?.submitUserTxTracking(
      {
        ...newOptions,
        key: newOptions.key ?? '',
        to: newOptions.to ?? '',
        nonce: newOptions.nonce as number,
        timestamp: Number(String(new Date().getTime()).substring(0, 10)),
        extra: {
          ...newOptions.extra,
          source: MESSAGE_SOURCE,
        },
      },
      {
        error: (error: Error | CloseEvent) => {
          useSubmitTxStore.getState().addSubmitTxFailed(newOptions);
          const api = `messageClient.submitUserTxTracking error`;
          let errorStr = '';
          try {
            errorStr = JSON.stringify(error, [
              'message',
              'arguments',
              'type',
              'name',
              'code',
              'reason',
            ]);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (e) {
            // empty
          }
          const params = {
            tx: newOptions.hash,
            brief: newOptions.key,
            isSafe,
            errorStr,
          };
          if (error instanceof Event) {
            console.error(
              `[CloseEvent]: type: ${error.type}, code: ${error.code}, reason: ${error.reason}, wasClean: ${error.wasClean}`,
            );
          }
          console.error('api:', api, 'params:', params, 'error:', error);
          resolve(false);
        },
        next: () => {
          // empty
        },
        complete: () => {
          // empty
        },
        completeStatus: async (res: any) => {
          if (res?.data?.result) {
            useSubmitTxStore.getState().deleteSubmitTx(newOptions);
            resolve(true);
          }
        },
      },
    );
  });
}

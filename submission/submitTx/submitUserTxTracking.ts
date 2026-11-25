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
  const TRACKING_TIMEOUT_MS = 30000;
  return new Promise((resolve) => {
    const newOptions = { ...options };
    const isSafe = useWalletStore.getState().connected?.isSafe;
    let settled = false;
    const settle = (ok: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      resolve(ok);
    };
    const timeoutId = setTimeout(() => {
      useSubmitTxStore.getState().addSubmitTxFailed(newOptions);
      console.error(
        'messageClient.submitUserTxTracking timeout',
        newOptions.hash,
      );
      settle(false);
    }, TRACKING_TIMEOUT_MS);
    if (isSafe && options.extra?.transactionReceipt) {
      newOptions.extra.transactionHash =
        options.extra.transactionReceipt.transactionHash;
    }
    if (!messageClient) {
      useSubmitTxStore.getState().addSubmitTxFailed(newOptions);
      settle(false);
      return;
    }
    messageClient.submitUserTxTracking(
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
          settle(false);
        },
        next: () => {
          // empty
        },
        complete: () => {
          // completeStatus handles resolve; timeout covers hung requests
        },
        completeStatus: async (res: any) => {
          if (res?.data?.result) {
            useSubmitTxStore.getState().deleteSubmitTx(newOptions);
            settle(true);
            return;
          }
          useSubmitTxStore.getState().addSubmitTxFailed(newOptions);
          settle(false);
        },
      },
    );
  });
}

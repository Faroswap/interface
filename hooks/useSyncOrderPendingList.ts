import { StateText } from '@/submission/types';
import { NoticeTransactionList } from './useTransactionList';
import { useWalletStore, watchTx } from '@dodoex/wallet-web3';
import React from 'react';
import { submitUserTxTracking } from '@/submission/submitTx/submitUserTxTracking';

/** Meow: trust web3 / etherscan result */
export enum WatchResult {
  Failed = 0, // 0: failed
  Success, // 1: success
  Warning, // 2: Warning (the current nonce transaction is overwritten, such as the user using acceleration/cancellation in the wallet)
}

export type WatchTransactionReturn = {
  /** Front-end uplink status */
  status: WatchResult;
  /** Used to submit the on-chain status to the backend */
  statusText: StateText;
  transactionReceipt: {
    status: boolean;
    transactionHash: string;
    blockNumber: number | null;
  } | null;
};

export const watchTransaction = async (
  txId: string,
  nonce: number,
  addr?: string,
): Promise<WatchTransactionReturn> => {
  let timeout: number | null = null;
  const config = {
    killSwitch: false,
    fastKillSwitch: false,
    interval: 3000,
  };
  const statusTextMap = {
    [WatchResult.Failed]: StateText.Failed,
    [WatchResult.Success]: StateText.Success,
    [WatchResult.Warning]: StateText.Warning,
  };

  try {
    if (nonce === undefined) {
      return {
        status: WatchResult.Warning,
        statusText: statusTextMap[WatchResult.Warning],
        transactionReceipt: null,
      };
    }
    /* Four-way select */
    const web3Result = watchTx<WatchTransactionReturn['transactionReceipt']>(
      txId,
      config,
      nonce,
      addr,
    );
    const sources = [web3Result];
    const fallbackResult = new Promise<WatchTransactionReturn>(
      (resolve) =>
        // eslint-disable-next-line no-promise-executor-return
        (timeout = window.setTimeout(
          () =>
            resolve({
              status: WatchResult.Failed,
              statusText: statusTextMap[WatchResult.Failed],
              transactionReceipt: null,
            }),
          3600000,
        )),
    ); // 1h
    sources.push(fallbackResult);
    const result = await lastResult(sources, null, (ret, kill) => {
      console.log('Got result, triggering kill switch', ret);
      // Kill nonce immediately
      config.fastKillSwitch = true;
      setTimeout(() => {
        kill();
        config.killSwitch = true;
      }, 5000);
    });

    if (result && timeout) {
      clearTimeout(timeout);
    }
    return result === null
      ? {
          status: WatchResult.Failed,
          statusText: statusTextMap[WatchResult.Failed],
          transactionReceipt: null,
        }
      : {
          ...result,
          transactionReceipt: {
            ...result.transactionReceipt,
            status: !!result.transactionReceipt?.status,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any,
          statusText: statusTextMap[result.status],
        };
  } catch (e) {
    console.log('[TX Watch] Error', e);
    throw e;
    // return {
    //   status: WatchResult.Failed,
    //   statusText: statusTextMap[WatchResult.Failed],
    //   transactionReceipt: null,
    // };
  }
};

// Input multiple promises, returns the last one that resolves when all finishes or timed-out
// If everybody timed-out, this promise resolves with null
function lastResult<T>(
  promises: Promise<T>[],
  timeout: number | null,
  trigger: ((result: T, forceKill: () => void) => void) | null,
): Promise<T | null> {
  let lastResult: T | null = null;
  let left = promises.length;
  let resolved = false;
  return new Promise((resolve, reject) => {
    const kill = () => {
      if (!resolved) {
        resolved = true;
        resolve(lastResult);
      }
    };

    for (const p of promises) {
      p.then((result) => {
        if (result !== null) {
          lastResult = result;
          if (trigger) trigger(result, kill);
        }

        --left;
        if (left === 0) {
          resolved = true;
          resolve(lastResult);
        }
      }).catch((e) => {
        console.log('[TX Watch]  Error', e);
        if (!resolved) {
          resolved = true;
          reject();
        }
      });

      if (timeout !== null) setTimeout(kill, timeout);
    }
  });
}

export function useSyncOrderPendingList({
  pendingList,
}: {
  pendingList: NoticeTransactionList;
}) {
  const { chainId, account } = useWalletStore();
  React.useEffect(() => {
    if (account) {
      const currentChainPendingList = pendingList?.filter(
        (item) => item?.chainId === chainId,
      );
      currentChainPendingList.forEach((pendingOrder) => {
        const syncOrder = async () => {
          const { tx, nonce } = pendingOrder.extend ?? {};
          if (tx && nonce !== undefined) {
            const ret = await watchTransaction(tx, nonce, account);
            submitUserTxTracking({
              hash: tx,
              chainId,
              from: account as string,
              nonce,
              to: pendingOrder.extend.to || undefined,
              key: pendingOrder.key || undefined,
              extra: {
                status: ret.statusText,
                transactionReceipt: ret.transactionReceipt,
              },
            });
          }
        };
        syncOrder();
      });
    }
  }, [pendingList, chainId, account]);
}

import { useCallback, useEffect } from 'react';
import { submitUserTxTracking } from './submitUserTxTracking';
import { useSubmitTxStore } from './state';
import { SubmitTxTracking } from './types';
import { useMessageClientStore } from '@/hooks/messageClient/useMessageClientStore';

export function useSubmitUserTxTrackingRetry() {
  const { client } = useMessageClientStore();
  const { submitTxList } = useSubmitTxStore();

  const batchSubmit = useCallback(
    (
      list: SubmitTxTracking[],
      index = 0,
      retryDelay = 10000,
      retryCount = 4,
    ) => {
      return new Promise((resolve, reject) => {
        if (!client || !list.length) {
          resolve(true);
          return;
        }
        if (index < list.length) {
          submitUserTxTracking(list[index], {
            isNotInsert: true,
          }).then((res) => {
            if (!res) {
              // Retry
              if (retryCount) {
                setTimeout(() => {
                  batchSubmit(list, index, retryDelay, retryCount - 1)
                    .then(resolve)
                    .catch(reject);
                }, retryDelay);
              } else {
                reject();
              }
            } else {
              // Submit next
              batchSubmit(list, index + 1, retryDelay, retryCount)
                .then(resolve)
                .catch(reject);
            }
          });
        } else {
          resolve(true);
        }
      });
    },
    [client],
  );

  useEffect(() => {
    // submit waiting
    const waitingOrder = useSubmitTxStore
      .getState()
      .submitTxList.filter((item) => !item.failedTime);
    try {
      batchSubmit(waitingOrder, 0, 50000);
    } catch (e) {
      console.error('submitTxTracking is error', e);
    }
  }, [batchSubmit]);

  useEffect(() => {
    // submit failed
    const timeout = setTimeout(() => {
      const failedTracking = submitTxList.filter((item) => !!item.failedTime);
      batchSubmit(failedTracking, 0, 10000, 10);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [batchSubmit, submitTxList]);
}

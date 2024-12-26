import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { getOperationName, messageClientSubscribe } from './subscribe';
import { isEqual } from 'lodash';
import { useMessageClientStore } from './useMessageClientStore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Variables = undefined | null | Record<string, any>;

interface NeedSubscribeItem {
  name: string;
  variables: Variables;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryKey: any;
  isInfiniteQuery: boolean;
}

export function useSubscribeGraphql() {
  const queryClient = useQueryClient();
  const { client } = useMessageClientStore();

  const lastNeedSubscribes = React.useRef<Array<NeedSubscribeItem>>([]);
  React.useEffect(() => {
    let time: NodeJS.Timeout;
    const messageClientUnSubscribeList: Array<
      ReturnType<typeof messageClientSubscribe>
    > = [];
    const commonKey = ['graphql'];
    const needSubscribes = [] as Array<NeedSubscribeItem>;
    const unSubscribeQueryCache = queryClient
      .getQueryCache()
      .subscribe((event) => {
        switch (event.type) {
          case 'added':
          case 'updated':
          case 'observerAdded':
            // case 'observerOptionsUpdated':
            // Add queue
            const { state, queryKey } = event.query;
            if (state.status === 'success') {
              if (queryKey.length > 3 && queryKey[0] === commonKey[0]) {
                const queryType = queryKey[1] as
                  | 'getQuery'
                  | 'getInfiniteQuery';
                let document: NeedSubscribeItem['document'];
                let variables: Variables = undefined;
                let isInfiniteQuery = false;
                if (queryType === 'getQuery') {
                  document = queryKey[2];
                  variables = queryKey[3];
                } else {
                  isInfiniteQuery = true;
                  document = queryKey[3];
                  variables = queryKey[4];
                }
                const documentStr = document?.toString();
                const name = getOperationName(documentStr);
                if (name) {
                  const isExist = needSubscribes.some(
                    (item) =>
                      item.name === name && isEqual(item.variables, variables),
                  );
                  if (!isExist) {
                    needSubscribes.push({
                      name,
                      document,
                      variables,
                      queryKey,
                      isInfiniteQuery,
                    });
                  }
                }
              }
            }
            break;

          default:
            break;
        }
        try {
          time = setTimeout(() => {
            // execution queue
            const needSubscribesResult = needSubscribes.filter((item) => {
              return !lastNeedSubscribes.current.some(
                (lastItem) =>
                  item.name === lastItem.name &&
                  isEqual(item.variables, lastItem.variables),
              );
            });
            if (needSubscribesResult.length && client) {
              lastNeedSubscribes.current = [...needSubscribes];
              clearTimeout(time);
              needSubscribesResult.forEach((item) => {
                const unSubscribe = messageClientSubscribe(
                  item.document,
                  item.variables,
                  (newData) => {
                    if (item.isInfiniteQuery) {
                      queryClient.refetchQueries({
                        queryKey: item.queryKey,
                      });
                    } else {
                      queryClient.setQueryData(item.queryKey, newData);
                    }
                  },
                  client,
                );
                messageClientUnSubscribeList.push(unSubscribe);
              });
            }
          }, 500);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          console.error(error);
        }
      });

    return () => {
      lastNeedSubscribes.current = [];
      unSubscribeQueryCache();
      messageClientUnSubscribeList.map((unSubscribe) => unSubscribe());
      clearTimeout(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient, client]);
}

import { Client } from '@dodoex/message-ws';
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { useMessageClientStore } from './useMessageClientStore';
import { parse } from 'graphql/language/parser.js';
import { Kind } from 'graphql';

export function messageClientSubscribe<TResult, TVariables>(
  document: DocumentTypeDecoration<TResult, TVariables>,
  variables: TVariables extends Record<string, never> ? undefined : TVariables,
  subscribe: (data: TResult) => void,
  clientProps?: Client | null,
) {
  const client = clientProps ?? useMessageClientStore.getState().getClient();
  const gqlStr = document.toString();
  const operationName = getOperationName(gqlStr);
  const subscribeParams = {
    operationName,
    query: gqlStr,
    variables: variables as Record<string, unknown> | null | undefined,
  };
  const unsubscribe = client.subscribe(subscribeParams, {
    next: (data) => {
      subscribe(data?.data as TResult);
    },
    /**
     * An error that has occured. Calling this function "closes" the sink.
     * Besides the errors being `Error` and `readonly any[]`, it
     * can also be a `CloseEvent`, but to avoid bundling DOM typings because
     * the client can run in Node env too, you should assert the close event
     * type during implementation.
     */
    error: (error: Error | CloseEvent) => {
      if (error instanceof CloseEvent && !error.code) {
        return;
      }
      let errorInfo = '';
      try {
        errorInfo = JSON.stringify(error);
      } catch (e) {
        // empty
      }
      let errorRes: Error;
      if (error instanceof CloseEvent) {
        const errorApi = `[CloseEvent]: type: ${error.type}, code: ${error.code}, reason: ${error.reason}, wasClean: ${error.wasClean}`;
        console.error(errorApi);
        if (
          !error.code ||
          error.code === 4403 ||
          (error.code === 1006 && !error.reason)
        ) {
          return;
        }
        errorRes = new Error(errorApi);
      } else {
        errorRes = error as Error;
      }
      console.error(
        `messageClient error: ${operationName}`,
        errorRes,
        errorInfo,
      );
    },
    complete: () => {
      // empty
    },
    completeStatus: () => {
      // empty
    },
  });
  return unsubscribe;
}

export const isOperationDefinitionNode = (definition: unknown) => {
  return (
    typeof definition === `object` &&
    definition !== null &&
    `kind` in definition &&
    definition.kind === Kind.OPERATION_DEFINITION
  );
};

export function getOperationName(documentStr: string) {
  let operationName = '';
  try {
    const docNode = parse(documentStr);
    const defs = docNode.definitions.filter(isOperationDefinitionNode);
    if (defs.length === 1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      operationName = defs[0]!.name?.value;
    }
  } catch (error) {
    console.error(error);
  }
  return operationName;
}

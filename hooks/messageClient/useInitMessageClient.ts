/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, createClient } from '@dodoex/message-ws';
import React from 'react';
import { useMessageClientStore } from './useMessageClientStore';
import { useWalletStore } from '@dodoex/wallet-web3';
import { MessageGQLClientEndpoint } from '@/constants/api';
import { getClientAuth } from '@/utils/auth';

// How often to send ping pong to ensure connection
export const MESSAGE_CLIENT_KEEP_ALIVE = 10000;

export function getMessageClient({
  account,
}: {
  account: string | undefined;
}): Client | null {
  if (!account) return null;
  let accessToken: string | null = null;
  try {
    const client = createClient({
      url: MessageGQLClientEndpoint,
      async connectionParams() {
        accessToken = await getClientAuth({
          account,
          notCache: true,
        });
        // Pass in the connection parameters and carry the accessToken of the auth service
        return {
          accessToken,
        };
      },
      // Optional parameters
      keepAlive: MESSAGE_CLIENT_KEEP_ALIVE, // How often to send ping pong to ensure connection, default 0
      lazy: true, // Controls whether to connect immediately or when subscribing for the first time. Default is true.
      onNonLazyError: (errorOrCloseEvent) => {
        console.error('[@dodoex/message-ws createClient onNonLazyError]');
        console.error(errorOrCloseEvent);
      },
      connectionAckWaitTimeout: 0, // Timeout for waiting for ack confirmation after connection
      // disablePong?: boolean;
      // retryAttempts?: number;
      // retryWait?: (retries: number) => Promise<void>;
      // isFatalConnectionProblem?: (errOrCloseEvent: unknown) => boolean;
      // on?: Partial<{ [event in Event]: EventListener<event> }>;
      // webSocketImpl?: unknown;
      // generateID?: () => ID;
      // jsonMessageReviver?: JSONMessageReviver;
      // jsonMessageReplacer?: JSONMessageReplacer;
    });

    if (!client) {
      throw new Error('client is undefined');
    }

    client.on('error', (err: any) => {
      console.error('[@dodoex/message-ws createClient on error]');
      console.error(err);
    });

    client.on('closed', async (err: any) => {
      if (!err) return;
      if (
        // The backend will retry. There is no message here to record why the error was reported. There is no need to record it.
        (err.code === 1006 && !err.reason) ||
        // Normal shutdown, no need to record
        err.code === 1000 ||
        // Logically speaking, it is to leave the current page, but sometimes there will be other reason feedback. So first cancel the recording of errors without reason, and then record and analyze the others.
        (err.code === 1001 && !err.reason)
      ) {
        return;
      }
      // CloudFlare restarts and will reconnect
      if (
        err.code === 1001 &&
        err.reason === 'CloudFlare WebSocket proxy restarting'
      ) {
        return;
      }
      const api = `[@dodoex/message-ws createClient on closed]: code: ${err.code}, reason: ${err.reason}`;
      console.error(api);
    });
    return client;
  } catch (error) {
    console.error('[@dodoex/message-ws createClient]');
    console.error(error);
  }
  return null;
}

export const useInitMessageClient = () => {
  const { account } = useWalletStore();
  React.useEffect(() => {
    const client = getMessageClient({
      account,
    });
    if (client) {
      client.on('pong', () => {
        const lastPongTime = Date.now();
        useMessageClientStore.setState({
          lastPongTime,
        });
      });
    }
    useMessageClientStore.setState({ client });

    return () => {
      client?.dispose();
    };
  }, [account]);
};

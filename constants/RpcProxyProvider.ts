/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { fetchJson } from '@ethersproject/web';
import { deepCopy } from '@ethersproject/properties';
import { getRpcUrl as getRpcUrlProps } from '@dodoex/auth-web-sdk';
import { API_DOMAIN } from './url';

function getResult(payload: {
  error?: { code?: number; data?: any; message?: string };
  result?: any;
}): any {
  if (payload.error) {
    const error: any = new Error(payload.error.message);
    error.code = payload.error.code;
    error.data = payload.error.data;
    throw error;
  }

  return payload.result;
}

export function getRpcUrl(chainId: number) {
  return getRpcUrlProps(chainId, {
    url: `https://api${API_DOMAIN}`,
  });
}

export class RpcProxyProvider extends StaticJsonRpcProvider {
  async send(method: string, params: Array<any>): Promise<any> {
    const request = {
      method: method,
      params: params,
      // eslint-disable-next-line no-plusplus
      id: this._nextId++,
      jsonrpc: '2.0',
    };

    this.emit('debug', {
      action: 'request',
      request: deepCopy(request),
      provider: this,
    });

    // We can expand this in the future to any call, but for now these
    // are the biggest wins and do not require any serializing parameters.
    const cache = ['eth_chainId', 'eth_blockNumber'].indexOf(method) >= 0;
    // @ts-ignore
    if (cache && this._cache[method]) {
      return this._cache[method];
    }

    const network = await this.detectNetwork();
    const chainId =
      typeof network === 'object' ? network.chainId : parseInt(String(network));
    const url = getRpcUrl(chainId);
    const result = fetchJson(
      {
        ...this.connection,
        url,
      },
      JSON.stringify(request),
      getResult,
    ).then(
      (result) => {
        this.emit('debug', {
          action: 'response',
          request: request,
          response: result,
          provider: this,
        });

        return result;
      },
      (error) => {
        this.emit('debug', {
          action: 'response',
          error: error,
          request: request,
          provider: this,
        });

        throw error;
      },
    );

    // Cache the fetch, but clear it on the next event loop
    if (cache) {
      this._cache[method] = result;
      setTimeout(() => {
        // @ts-ignore
        this._cache[method] = null;
      }, 0);
    }

    return result;
  }
}

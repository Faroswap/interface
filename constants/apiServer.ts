/* eslint-disable @typescript-eslint/no-explicit-any */
'server only';
import { getServerAuth } from '@/utils/authServer';
import { GraphQLRequests, TokenApi } from '@dodoex/api';
import { GRAPHQL_URL } from './url';
// import fetch from 'cross-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ERC20_DOMAIN, SINGLE_CHAIN_ID } from './config';
import axios from 'axios';
import { TokenInfo } from '@dodoex/widgets';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchResult = async (input: any, init: any) => {
  return fetch(input, {
    ...init,
    agent: () => {
      // add agent to request
      if (process.env.GLOBAL_AGENT_HTTPS_PROXY) {
        const proxyAgent = new HttpsProxyAgent(
          process.env.GLOBAL_AGENT_HTTPS_PROXY ?? '',
        );
        return proxyAgent;
      }
      return undefined;
    },
  });
};

export const graphQLRequestsServer = new GraphQLRequests({
  url: GRAPHQL_URL,
  fetch: fetchResult,
  getHeaders: async () => {
    const token = await getServerAuth();
    return {
      'Access-Token': token,
    };
  },
});

export type TokenListInitialData = ReturnType<
  NonNullable<(typeof TokenApi.graphql.fetchErc20SwapCrossList)['__apiType']>
>;

export async function fetchTokenList() {
  const chainId = SINGLE_CHAIN_ID;
  const token = await getServerAuth();
  try {
    const res = await axios.post(
      `${GRAPHQL_URL}?opname=FetchErc20SwapCrossChainList`,
      {
        query: TokenApi.graphql.fetchErc20SwapCrossList.toString(),
        variables: {
          where: {
            chainId,
            page: 1,
            pageSize: 1000,
          },
        },
      },
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 DODO/lite-ssr',
          'Access-Token': token,
        },
      },
    );
    const data = (await res.data.data) as TokenListInitialData;
    const tokenList =
      data?.erc20_swapCrossChainList
        ?.filter(
          (token) =>
            !!token &&
            (!token.domains?.length ||
              token.domains?.some(
                (domain: any) => domain?.name === ERC20_DOMAIN,
              )),
        )
        ?.map(
          (token) =>
            ({
              address: token?.address,
              name: token?.name,
              symbol: token?.symbol,
              decimals: token?.decimals,
              logoURI: token?.logoImg,
            }) as TokenInfo,
        ) ?? [];

    return {
      data,
      tokenList: tokenList as TokenInfo[],
    };
  } catch (error) {
    console.error(error);
    return {
      data: undefined,
      tokenList: undefined,
    };
  }
}

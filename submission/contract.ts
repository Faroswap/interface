import { Deferrable, useWalletStore } from '@dodoex/wallet-web3';
import { BigNumberish } from '@ethersproject/bignumber';
import { JsonRpcProvider, TransactionRequest } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';
import { TokenApi } from '@dodoex/api';
import isZeroAddress from '@/utils/address';
import { StateText } from './types';

export const getEstimateGas = async (
  params: Deferrable<TransactionRequest>,
  provider: JsonRpcProvider,
): Promise<string | null> => {
  const { value, from, to, data } = params;
  const estimateTarget = {
    from,
    to,
    value,
    data,
  };
  if (!value || isZeroAddress(String(value))) {
    delete estimateTarget.value;
  }
  try {
    const res = await provider.estimateGas(estimateTarget);
    return res.add(50000).toString();
  } catch (error) {
    console.error(error);
    try {
      await provider.call(estimateTarget);
      if (process.env.NODE_ENV !== 'test') {
        throw new Error(
          'Unexpected issue with estimating the gas. Please try again.',
        );
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') {
        throw error;
      }
    }
  }
  return null;
};

export const sendTransaction = async (
  params: Deferrable<TransactionRequest>,
  provider: JsonRpcProvider,
) => {
  try {
    const res = await provider.getSigner().sendTransaction(params);
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // if the user rejected the tx, pass this along
    if (error?.code === 4001) {
      throw new Error('Transaction rejected.');
    } else {
      throw error;
    }
  }
};

/** Meow: trust web3 / etherscan result */
export enum WatchResult {
  Failed = 1, // 0: failed
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

export const BIG_ALLOWANCE = new BigNumber(2).pow(256).minus(1);
export const approve = async (
  tokenAddress: string,
  accountAddress: string,
  contractAddress: string,
  allowance: BigNumber,
  provider: JsonRpcProvider,
) => {
  const data = await TokenApi.encode.approveABI(contractAddress, allowance);
  const params = {
    from: accountAddress,
    to: tokenAddress,
    data,
    value: '0x0',
    gasLimit: undefined as BigNumberish | undefined,
  };

  const gasLimit = await getEstimateGas(params, provider);
  if (gasLimit) {
    params.gasLimit = gasLimit;
  }
  return await sendTransaction(params, provider);
};

/**
 * Add custom token to metamask
 * https://docs.metamask.io/guide/registering-your-token.html#registering-tokens-with-users
 */
export async function registerTokenWithMetamask(token: {
  address: string;
  symbol: string;
  decimals: number;
  logoUrl: string;
}): Promise<{ result: boolean; failMsg?: string }> {
  const provider = useWalletStore.getState().provider;
  if (!provider) return { result: false };
  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await provider.send('wallet_watchAsset', {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: token.address, // The address that the token is at.
        symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: token.decimals, // The number of decimals in the token
        image: token.logoUrl, // A string url of the token logo
      },
    });

    return {
      result: wasAdded,
    };
  } catch (error) {
    console.error(error);
    return {
      result: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      failMsg: error?.message,
    };
  }
}

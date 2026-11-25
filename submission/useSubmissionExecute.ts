import { Deferrable, useWalletStore } from '@dodoex/wallet-web3';
import {
  JsonRpcProvider,
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/providers';
import { useQueryClient } from '@tanstack/react-query';
import {
  approve,
  BIG_ALLOWANCE,
  getEstimateGas,
  sendTransaction,
} from './contract';
import getExecutionErrorMsg from './getExecutionErrorMsg';
import { OpCode } from './spec';
import { useSubmission } from './state';
import { submitUserTxTracking } from './submitTx/submitUserTxTracking';
import {
  ExecuteTxParams,
  ExecutionResult,
  Request,
  StateText,
  WatchResult,
} from './types';

function useSubmissionExecuteBase({
  chainId,
  account,
  provider,
}: {
  chainId: number | undefined;
  account: string | undefined;
  provider: undefined | JsonRpcProvider;
}) {
  const queryClient = useQueryClient();
  const refetchQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ['token'],
    });
  };

  const execute = async ({
    brief,
    spec,
    subtitle,
    early,
    submittedBack,
    mixpanelProps,
    successBack,
    metadata,
  }: ExecuteTxParams) => {
    if (!account || !provider || chainId === undefined) {
      throw new Error(
        'Submission: Cannot execute step when the wallet is disconnected',
      );
    }
    let tx: string | undefined;
    let transaction: TransactionResponse | undefined;
    let nonce: number | undefined;
    let params: Deferrable<TransactionRequest> | undefined = undefined;
    if (spec.opcode === OpCode.Approval) {
      try {
        nonce = await provider.getTransactionCount(account);
        transaction = await approve(
          spec.token.address,
          account,
          spec.contract,
          spec.amt || BIG_ALLOWANCE,
          provider,
        );
        tx = transaction.hash;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        const mixpanelOptions = { error: error.message, brief, ...spec };
        if (mixpanelProps) Object.assign(mixpanelOptions, mixpanelProps);
        if (error.message) {
          const message = getExecutionErrorMsg(chainId, error.message);
          throw new Error(message);
        }
        throw error;
      }
    } else if (spec.opcode === OpCode.TX) {
      if (spec.to === '') throw new Error('Submission: malformed to');
      nonce = await provider.getTransactionCount(account);
      params = {
        value: spec.value,
        data: spec.data,
        to: spec.to,
        gasLimit: spec.gasLimit,
        from: account,
        chainId,
      } as Deferrable<TransactionRequest>;
      if (!params.gasLimit) {
        try {
          const gasLimit = await getEstimateGas(params, provider);
          if (gasLimit) {
            params.gasLimit = gasLimit;
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.debug(error);
        }
      }
      try {
        transaction = await sendTransaction(params, provider);
        tx = transaction.hash;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        const mixpanelOptions = { error: error.message, brief, ...spec };
        if (mixpanelProps) Object.assign(mixpanelOptions, mixpanelProps);
        if (error.message) {
          const message = getExecutionErrorMsg(chainId, error.message);
          throw new Error(message);
        }
        throw error;
      }
    }

    if (!tx) {
      throw new Error('tx is undefined');
    }
    const request = {
      brief,
      spec,
      tx,
      subtitle,
      metadata,
      chainId,
      account,
      nonce,
    } as Request;
    useSubmission.getState().onTxSubmit(tx, request);
    if (submittedBack) {
      submittedBack(tx);
    }
    const reportInfo = {
      brief,
      spec,
      params,
      tx,
      nonce: String(nonce),
      subtitle: typeof subtitle === 'string' ? subtitle : '',
      mixpanelProps,
    };

    let safeTxHash: string | undefined;
    if (useWalletStore.getState().connected?.isSafe) {
      safeTxHash = tx;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (reportInfo as Record<string, any> & { tx?: string })?.tx;
    }
    submitUserTxTracking({
      key: brief,
      hash: tx,
      chainId,
      from: account,
      to: spec.opcode === OpCode.Approval ? spec.contract : spec.to,
      nonce: nonce as number,
      extra: {
        safeTxHash,
        ...reportInfo,
        status: StateText.Running,
      },
    });

    if (early) {
      return ExecutionResult.Submitted;
    }
    if (transaction?.wait) {
      try {
        const receipt = await transaction.wait(1);
        if (receipt.status === WatchResult.Success) {
          if (successBack) {
            successBack(tx);
          }
          useSubmission.getState().onTxSuccess(tx, request);
          refetchQuery();
          return ExecutionResult.Success;
        }
        useSubmission.getState().onTxFailed(tx, request);
        return ExecutionResult.Failed;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        if (error.code === 'TRANSACTION_REPLACED') {
          useSubmission.getState().onTxWarning(request.tx, request);
          return ExecutionResult.Submitted;
        }
        useSubmission.getState().onTxFailed(tx, request);
        return ExecutionResult.Failed;
      }
    }
    useSubmission.getState().onTxFailed(tx, request);
    return ExecutionResult.Failed;
  };

  return execute;
}

export function useSubmissionExecute() {
  const { chainId, account, provider } = useWalletStore();
  const execute = useSubmissionExecuteBase({
    chainId,
    account,
    provider,
  });
  return execute;
}

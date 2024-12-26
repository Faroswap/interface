import { basicTokenMap, ChainId } from '@dodoex/api';
import { t } from '@lingui/macro';

export default function getExecutionErrorMsg(
  chainId: ChainId,
  message: string,
) {
  const EtherTokenSymbol = basicTokenMap[chainId]?.symbol;
  const KnownDialogErros = [
    {
      error: 'insufficient',
      msg: t`Insufficient funds - Please retry after depositing more ${EtherTokenSymbol} into your wallet`,
    },
    {
      error: 'SafeERC20: low-level call failed',

      msg: t`SafeERC20: low-level call failed. Please log a Zendesk support ticket or contact the DODO team.`,
    },
    {
      error: ['User denied', 'cancel', 'User rejected', 'user rejected'],
      msg: t`User denied transaction signature.`,
    },
    {
      error: [
        `Cannot set properties of undefined (setting 'loadingDefauIts'){"originalError":{`,
        `[ethjs-query]while formatting outputs from RPC'["value":["code":-32000,"message":"header not found"))`,
      ],
      msg: t`RPC node data exception`,
    },
    {
      error: [
        'replacement transaction underpriced',
        'Gasprice too low',
        'transaction underprice',
      ],
      msg: t`Gas price is too low, please adjust in your wallet and try again`,
    },
  ];

  let errorMsg = '';
  KnownDialogErros.some((item) => {
    if (Array.isArray(item.error)) {
      return item.error.some((error) => {
        if (message.indexOf(error) > -1) {
          errorMsg = item.msg;
          return true;
        }
        return false;
      });
    }
    if (message.indexOf(item.error) > -1) {
      errorMsg = item.msg;
      return true;
    }
    return false;
  });
  return errorMsg || message;
}

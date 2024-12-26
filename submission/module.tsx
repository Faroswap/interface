import {
  DoneFilled as PassedIcon,
  ErrorFilled as RejectedIcon,
  InvalidFilled as InvalidIcon,
  ArrowBack,
} from '@dodoex/icons';
import RestartIcon from '@/assets/activity/restart.svg';
import ApproveIcon from '@/assets/activity/token-approve.svg';
import SwapIcon from '@/assets/logo/single-chain.svg';
import PoolIcon from '@/assets/nav/pool.svg';
import MiningIcon from '@/assets/nav/mining.svg';
import { StateText } from './types';
import { t } from '@lingui/macro';

export function SubmissionStatusIcon({ status }: { status: string }) {
  switch (status) {
    case StateText.Success:
      return <PassedIcon className="w-full h-full" />;
    case StateText.Failed:
      return <RejectedIcon className="w-full h-full" />;
    case StateText.Warning:
      return <InvalidIcon className="w-full h-full" />;
    case StateText.Running:
      return (
        <div className="flex items-center justify-center bg-primary rounded-full w-full h-full">
          <RestartIcon className="w-11/12 h-11/12 text-primary-contrastText" />
        </div>
      );

    default:
      break;
  }
  return null;
}

export function getSubmitTitleByBrief(brief: string) {
  const prefixTypeTextMap: {
    [key: string]: string;
  } = {
    'common.approve.resetBrief': t`Reset`,
    'common.approve.brief': t`Approve`,
  };
  const matchPrefixKey = Object.keys(prefixTypeTextMap).find(
    (prefixKey) => brief.indexOf(prefixKey) === 0,
  );
  if (matchPrefixKey) {
    return prefixTypeTextMap[matchPrefixKey];
  }
  switch (brief) {
    case 'tradingCard.submissionBrief':
    case 'limit.main.title':
    case 'exchange.tabs.RFQ':
    case 'bridge.order.execute-bridge':
      return t`Swap`;
    case 'bridge.order.execute-bridge':
      return t`Transfer`;
    case 'liquidity.operate.title':
    case 'pool.amm-v2.add-liquidity.title':
    case 'pool.amm-v3.add-liquidity.title':
      return t`Add Liquidity`;
    case 'liquidity.operate.remove.title':
    case 'pool.amm-v2.remove-liquidity.title':
    case 'pool.amm-v3.remove-liquidity.title':
      return t`Remove Liquidity`;
    case 'pool.my-pools.create-a-pool':
    case 'pool.amm-v2.create.title':
    case 'pool.amm-v3.create.title':
      return t`Pool Creation`;
    case 'mining.stake':
      return t`Stake`;
    case 'mining.submit.remove-title':
      return t`End mining\n`;
    case 'mining.deposit.receive-reward':
    case 'pool.amm-v3.receive-reward.title':
      return t`Claim Rewards`;
    case 'nav.create-mining':
      return t`Create Liquidity Mining`;

    case 'wallet.account.card.operate.send':
      return t`Send`;

    default:
      return null;
  }
}

export function getTitleText(brief: string, status: string) {
  const prefix = getSubmitTitleByBrief(brief);
  const statusLangMap: { [key: string]: string } = {
    [StateText.Success]: t`Succeeded`,
    [StateText.Failed]: t`Failed`,
    [StateText.Running]: t`Pending`,
    [StateText.Warning]: t`Reset`,
  };
  const suffix = statusLangMap[status];
  return suffix ? `${prefix} ${suffix}` : prefix;
}

type IconMap = {
  [key: string]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};
export function SubmissionTypeIcon({ brief }: { brief: string }) {
  const prefixTypeIconMap: IconMap = {
    'common.approve.resetBrief': RestartIcon,
    'common.approve.brief': ApproveIcon,
  };
  const matchPrefixKey = Object.keys(prefixTypeIconMap).find(
    (prefixKey) => brief.indexOf(prefixKey) === 0,
  );
  if (matchPrefixKey) {
    const Icon = prefixTypeIconMap[matchPrefixKey];
    return <Icon className="w-6 h-6 text-secondary" />;
  }

  if (brief === 'wallet.account.card.operate.send') {
    return <ArrowBack className="w-6 h-6 rotate-90" />;
  }

  const swapTypes = [
    'tradingCard.submissionBrief',
    'limit.main.title',
    'exchange.tabs.RFQ',
    'bridge.order.execute-bridge',
  ];
  if (swapTypes.includes(brief)) {
    return <SwapIcon className="w-6 h-6 text-secondary" />;
  }

  const typeIconMap: IconMap = {
    'pool.my-pools.create-a-pool': PoolIcon,
    'pool.detail.modify-dpp-parameters': PoolIcon,
    'liquidity.operate.remove.title': PoolIcon,
    'liquidity.operate.title': PoolIcon,
    'pool.amm-v2.create.title': PoolIcon,
    'pool.amm-v2.remove-liquidity.title': PoolIcon,
    'pool.amm-v2.add-liquidity.title': PoolIcon,
    'pool.amm-v3.create.title': PoolIcon,
    'pool.amm-v3.add-liquidity.title': PoolIcon,
    'pool.amm-v3.remove-liquidity.title': PoolIcon,
    'pool.amm-v3.receive-reward.title': PoolIcon,
    'nav.create-mining': MiningIcon,
    'mining.deposit.receive-reward': MiningIcon,
    'mining.stake': MiningIcon,
    'mining.submit.remove-title': MiningIcon,
  };
  const Icon = typeIconMap[brief];
  if (!Icon) return null;
  return <Icon className="w-6 h-6 text-secondary" />;
}

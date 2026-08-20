import SwapIcon from '@/assets/nav/swap.svg';
import PoolIcon from '@/assets/nav/pool.svg';
import PointsIcon from '@/assets/nav/points.svg';
// import MiningIcon from '@/assets/nav/mining.svg';
import { MenuItem } from '@/components/nav/type';
import { Trans } from '@lingui/macro';

export function getMenuList() {
  return [
    {
      name: <Trans>Swap</Trans>,
      url: '/swap',
      icon: <SwapIcon />,
      description: <Trans>Guiding your trades through DeFi waters</Trans>,
    },
    {
      name: <Trans>Pool</Trans>,
      url: '/pool',
      icon: <PoolIcon />,
      description: <Trans>Anchor assets safely in DeFi harbor</Trans>,
    },
    {
      name: <Trans>Points</Trans>,
      url: '/points',
      icon: <PointsIcon />,
      description: (
        <Trans>
          Track your loyalty points & unlock rewards on Pharos mainnet
        </Trans>
      ),
    },
    // { name: <Trans>Mining</Trans>, url: '/mining', icon: <MiningIcon /> },
  ] as Array<MenuItem>;
}

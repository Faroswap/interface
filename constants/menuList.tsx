import SwapIcon from '@/assets/nav/swap.svg';
import PoolIcon from '@/assets/nav/pool.svg';
// import MiningIcon from '@/assets/nav/mining.svg';
import { MenuItem } from '@/components/nav/type';
import { Trans } from '@lingui/macro';

export function getMenuList() {
  return [
    { name: <Trans>Swap</Trans>, url: '/swap', icon: <SwapIcon /> },
    { name: <Trans>Pool</Trans>, url: '/pool', icon: <PoolIcon /> },
    // { name: <Trans>Mining</Trans>, url: '/mining', icon: <MiningIcon /> },
  ] as Array<MenuItem>;
}

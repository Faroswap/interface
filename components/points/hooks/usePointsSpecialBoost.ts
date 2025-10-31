import { graphQLRequests } from '@/constants/api';
import { ERC20_DOMAIN, SINGLE_CHAIN_ID } from '@/constants/config';
import { graphql } from '@/gql';
import { useWalletStore } from '@dodoex/wallet-web3';
import { useQuery } from '@tanstack/react-query';

const document = graphql(`
  query FetchPointSpecialBoost($where: Points_activityspecialBoostFilter) {
    points_activity_specialBoost(where: $where) {
      poolAddress
      baseToken
      quoteToken
      multiplier
      multiplierPercentage
      baseSymbol
      quoteSymbol
    }
  }
`);

export function usePointSpecialBoost({
  type,
}: {
  type: 'swap' | 'lp'
}) {
  // @ts-ignore
  const queryOptions = graphQLRequests.getQuery(document, {
    where: {
      chainId: SINGLE_CHAIN_ID,
      domain: ERC20_DOMAIN,
      type,
    },
  });
  const fetchQuery = useQuery({
    ...queryOptions,
  });

  return fetchQuery;
}

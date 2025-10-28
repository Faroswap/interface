import { graphQLRequests } from '@/constants/api';
import { ERC20_DOMAIN, SINGLE_CHAIN_ID } from '@/constants/config';
import { graphql } from '@/gql';
import { useWalletStore } from '@dodoex/wallet-web3';
import { useQuery } from '@tanstack/react-query';

const document = graphql(`
  query FetchPointsLeaderboard($where: Points_activityleaderboardFilter) {
    points_activity_leaderboard(where: $where) {
      overallRanks {
        totalPoints
        user
        rank
      }
      currentUserRank {
        totalPoints
        rank
      }
    }
  }
`);

export function usePointLeaderboard() {
  const { account } = useWalletStore();
  // @ts-ignore
  const queryOptions = graphQLRequests.getQuery(document, {
    where: {
      user: account?.toLowerCase(),
      chainId: SINGLE_CHAIN_ID,
      domain: ERC20_DOMAIN,
    },
  });
  const fetchQuery = useQuery({
    ...queryOptions,
    enabled: !!account,
  });

  return fetchQuery;
}

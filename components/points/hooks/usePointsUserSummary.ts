import { graphQLRequests } from '@/constants/api';
import { ERC20_DOMAIN } from '@/constants/config';
import { graphql } from '@/gql';
import { useWalletStore } from '@dodoex/wallet-web3';
import { useQuery } from '@tanstack/react-query';

const document = graphql(`
  query FetchPointsUserSummary($where: Points_activityuserSummaryFilter) {
    points_activity_userSummary(where: $where) {
      activityId
      activityName
      inviteeCount
      invitePoints
      lpPoints
      swapPoints
      totalPoints
      socialMediaPoints
    }
  }
`);
export function usePointUserSummary() {
  const { account } = useWalletStore();
  // @ts-ignore
  const queryOptions = graphQLRequests.getQuery(document, {
    where: {
      user: account?.toLowerCase(),
      // chainId: SINGLE_CHAIN_ID,
      chainId: 421614,
      domain: ERC20_DOMAIN,
    },
  });
  const fetchQuery = useQuery({
    ...queryOptions,
    enabled: !!account,
  });

  return fetchQuery;
}

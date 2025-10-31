import { graphQLRequests } from '@/constants/api';
import { ERC20_DOMAIN, SINGLE_CHAIN_ID } from '@/constants/config';
import { graphql } from '@/gql';
import { useWalletStore } from '@dodoex/wallet-web3';
import { useQuery } from '@tanstack/react-query';

const document = graphql(`
  query FetchPointInviteCode(
    $where: Points_activityinviteCodeFilter
    $whereStatus: Points_activityinviteStatusFilter
  ) {
    points_activity_inviteCode(where: $where) {
      inviteCode
      inviteUrl
    }
    points_activity_inviteStatus(where: $whereStatus) {
      inviterAddress
      status
    }
  }
`);

export function usePointInviteCode() {
  const { account } = useWalletStore();
  // @ts-ignore
  const queryOptions = graphQLRequests.getQuery(document, {
    where: {
      user: account?.toLowerCase(),
      chainId: SINGLE_CHAIN_ID,
      domain: ERC20_DOMAIN,
    },
    whereStatus: {
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

import { graphQLRequests } from '@/constants/api';
import { SystemApi } from '@dodoex/api';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useFetchTokenList } from './useFetchTokenList';
import { fetchTokenList } from '@/constants/apiServer';
import {
  fetchLockedTokenVaultGetClaimableBalance,
  fetchLockedTokenVaultGetClaimedBalance,
  fetchLockedTokenVaultGetOriginBalance,
  fetchMerkleDistributorIsClaimed,
} from '@dodoex/dodo-contract-request';
import React from 'react';
import { TokenInfo } from '@dodoex/widgets';
import { useAutoConnectWalletLoading } from './useAutoConnectWalletLoading';

enum RewardVersion {
  merkle = 'merkle',
}

interface LockedReward {
  claimableRewards: BigNumber;
  claimedRewards: BigNumber;
  totalRewards: BigNumber;
}

export interface Reward extends LockedReward {
  id: string;
  contractAddress: string;
  token: TokenInfo;
  symbol: string;
  nameKey: string;
  showDecimals: number;
  address: string;
  lockedRewards: BigNumber;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  merkle?: any;
}
export function useFetchReward({
  account,
  chainId,
  initialDataTokenList,
}: {
  account?: string;
  chainId?: number;
  initialDataTokenList?: Awaited<ReturnType<typeof fetchTokenList>>['data'];
}) {
  const tokenListQuery = useFetchTokenList({
    initialData: initialDataTokenList,
  });
  const { tokenList } = tokenListQuery;
  const fetchRewardQuery = useQuery({
    queryKey: ['fetchRewardQuery', chainId, account, !!tokenList.length],
    enabled: !!account && !!tokenList.length,
    queryFn: async (): Promise<Array<Reward>> => {
      const rewardListRes: Reward[] = [];
      if (!account || chainId === undefined) return rewardListRes;
      const queryResult = await graphQLRequests
        .getQuery(SystemApi.graphql.fetchUserprofileReward, {
          where: {
            user: account,
          },
        })
        .queryFn();
      if (!queryResult?.userprofile_reward?.length) return rewardListRes;
      const promiseList = queryResult.userprofile_reward.map(async (item) => {
        const {
          contract_address: contractAddress,
          token_address: tokenAddress,
          name_key: nameKey,
          locking,
          version,
          merkle,
        } = item;
        const id = `${nameKey}-${contractAddress}`;
        if (!tokenAddress) return Promise.resolve();
        const token = tokenList.find(
          (token) => token.address.toLowerCase() === tokenAddress.toLowerCase(),
        );
        if (!token) return Promise.resolve();
        const symbol = token.symbol;
        const decimals = Number(token.decimals);
        const tokenChainId = token.chainId;
        if (chainId && tokenChainId !== chainId) return Promise.resolve();
        // Merkle is configured separately by the backend, and the query and collection methods are different.
        if (version === RewardVersion.merkle) {
          let totalRewards = 0;
          let isClaimed = false;
          if (contractAddress && merkle) {
            const { index, amout } = merkle;
            totalRewards = amout
              ? new BigNumber(amout).div(10 ** decimals).toNumber()
              : 0;
            const indexNum = index ? parseInt(index) : 0;
            isClaimed = await fetchMerkleDistributorIsClaimed(
              chainId,
              contractAddress,
              indexNum,
            );
          }
          return {
            id,
            token,
            symbol,
            nameKey,
            contractAddress,
            showDecimals: decimals > 6 ? 6 : 4,
            address: tokenAddress,
            claimableRewards: new BigNumber(
              isClaimed ? 0 : (totalRewards ?? 0),
            ),
            claimedRewards: new BigNumber(0),
            totalRewards: new BigNumber(isClaimed ? 0 : (totalRewards ?? 0)),
            merkle,
          };
        }
        if (contractAddress) {
          return {
            id,
            token,
            symbol,
            nameKey,
            contractAddress,
            showDecimals: decimals > 6 ? 6 : 4,
            address: tokenAddress,
            ...(await computeLockedRewards(
              contractAddress,
              decimals,
              account,
              chainId,
            )),
          };
        }
        return {
          id,
          token,
          symbol,
          nameKey,
          contractAddress,
          showDecimals: decimals > 6 ? 6 : 4,
          address: tokenAddress,
          claimableRewards: new BigNumber(0),
          claimedRewards: new BigNumber(0),
          totalRewards: new BigNumber(locking ?? 0),
        };
      });
      const list = (await Promise.all(promiseList)) as Reward[];
      list.forEach((item) => {
        if (item && (item.claimableRewards.gt(0) || item.totalRewards.gt(0))) {
          rewardListRes.push({
            ...item,
            lockedRewards: item.totalRewards
              .minus(item.claimableRewards)
              .minus(item.claimedRewards),
          });
        }
      });
      return rewardListRes;
    },
    refetchInterval: 30000,
  });

  const autoConnectLoading = useAutoConnectWalletLoading();
  const isLoading = React.useMemo(() => {
    return (
      fetchRewardQuery.isLoading || !tokenList.length || autoConnectLoading
    );
  }, [fetchRewardQuery.isLoading, tokenList, autoConnectLoading]);

  return {
    ...fetchRewardQuery,
    isLoading,
  };
}

const defaultLockedReward = {
  claimableRewards: new BigNumber(0),
  claimedRewards: new BigNumber(0),
  totalRewards: new BigNumber(0),
};
async function computeLockedRewards(
  contractAddress: string,
  tokenDecimals: number,
  account: string,
  chainId: number,
): Promise<LockedReward> {
  if (!account) {
    return defaultLockedReward;
  }
  const currentAccount = account.toLowerCase();
  const promisedList: Array<Promise<bigint>> = [];
  try {
    promisedList.push(
      fetchLockedTokenVaultGetOriginBalance(
        chainId,
        contractAddress,
        currentAccount,
      ),
    );
    promisedList.push(
      fetchLockedTokenVaultGetClaimableBalance(
        chainId,
        contractAddress,
        currentAccount,
      ),
    );
    promisedList.push(
      fetchLockedTokenVaultGetClaimedBalance(
        chainId,
        contractAddress,
        currentAccount,
      ),
    );
    const [totalRewards, claimableRewards, claimedRewards] =
      await Promise.all(promisedList);

    return {
      claimableRewards: new BigNumber(claimableRewards.toString()).div(
        `1e${tokenDecimals}`,
      ),
      claimedRewards: new BigNumber(claimedRewards.toString()).div(
        `1e${tokenDecimals}`,
      ),
      totalRewards: new BigNumber(totalRewards.toString()).div(
        `1e${tokenDecimals}`,
      ),
    };
  } catch (error) {
    console.error('computeLockedRewardsList error', error);
    return defaultLockedReward;
  }
}

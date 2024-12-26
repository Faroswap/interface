export function generateMiningDetailUrl({
  chainId,
  miningContractAddress,
  stakeTokenAddress,
}: {
  chainId: number;
  miningContractAddress: string | undefined;
  stakeTokenAddress: string | undefined;
}) {
  if (!miningContractAddress) {
    return `/mining?address=${stakeTokenAddress}`;
  }

  if (!stakeTokenAddress) {
    return `/mining?mining=${miningContractAddress}`;
  }

  return `/mining/${miningContractAddress}/${stakeTokenAddress}`;
}

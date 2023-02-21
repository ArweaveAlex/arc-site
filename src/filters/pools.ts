import { PoolType } from "helpers/types";

export function sortByAll(
  pools: PoolType[],
  amount: number | null
): PoolType[] {
  if (amount) {
    return pools.length <= amount ? pools : pools.slice(0, amount);
  } else {
    return pools;
  }
}

export function sortByNewest(
  pools: PoolType[],
  amount: number | null
): PoolType[] {
  const sortedPools: PoolType[] = pools
    .sort(function (a, b) {
      return parseFloat(a.state.timestamp) - parseFloat(b.state.timestamp);
    })
    .reverse();
  if (amount) {
    return sortedPools.length <= amount
      ? sortedPools
      : sortedPools.slice(0, amount);
  } else {
    return sortedPools;
  }
}

export function sortByMostContributed(
  pools: PoolType[],
  amount: number | null
): PoolType[] {
  const sortedPools: PoolType[] = pools
    .sort(function (a, b) {
      return (
        parseFloat(a.state.totalContributions) -
        parseFloat(b.state.totalContributions)
      );
    })
    .reverse();
  if (amount) {
    return sortedPools.length <= amount
      ? sortedPools
      : sortedPools.slice(0, amount);
  } else {
    return sortedPools;
  }
}

import { PoolIndexType } from 'arcframework';

export function sortByAll(pools: PoolIndexType[], amount: number | null): PoolIndexType[] {
	if (amount) {
		return pools.length <= amount ? pools : pools.slice(0, amount);
	} else {
		return pools;
	}
}

export function sortByNewest(pools: PoolIndexType[], amount: number | null): PoolIndexType[] {
	const sortedPools: PoolIndexType[] = pools
		.sort(function (a, b) {
			return parseFloat(a.state.timestamp) - parseFloat(b.state.timestamp);
		})
		.reverse();
	if (amount) {
		return sortedPools.length <= amount ? sortedPools : sortedPools.slice(0, amount);
	} else {
		return sortedPools;
	}
}

export function sortByMostContributed(pools: PoolIndexType[], amount: number | null): PoolIndexType[] {
	const sortedPools: PoolIndexType[] = pools
		.sort(function (a, b) {
			return parseFloat(a.state.totalContributions) - parseFloat(b.state.totalContributions);
		})
		.reverse();
	if (amount) {
		return sortedPools.length <= amount ? sortedPools : sortedPools.slice(0, amount);
	} else {
		return sortedPools;
	}
}

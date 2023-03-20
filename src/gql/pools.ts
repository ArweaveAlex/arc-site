import { ArweaveClient } from 'clients/arweave';
import { getGQLData } from 'gql';
import { POOL_INDEX_CONTRACT_ID, TAGS } from 'helpers/config';
import { getRedstoneSrcTxEndpoint } from 'helpers/endpoints';
import { GQLResponseType, PoolSearchIndexType, PoolType } from 'helpers/types';
import { getTagValue } from 'helpers/utils';

export async function getPoolIds() {
	const pools: GQLResponseType[] = await getGQLData({
		ids: null,
		tagFilters: [
			{
				name: TAGS.keys.appType,
				values: [TAGS.values.poolVersions['1.2'], TAGS.values.poolVersions['1.4']],
			},
		],
		uploader: null,
		cursor: null,
		reduxCursor: null,
		cursorObject: null,
	});

	return pools.map((pool: GQLResponseType) => {
		switch (getTagValue(pool.node.tags, TAGS.keys.appType)) {
			case TAGS.values.poolVersions['1.2']:
				return pool.node.id;
			case TAGS.values.poolVersions['1.4']:
				return getTagValue(pool.node.tags, TAGS.keys.uploaderTxId);
			default:
				return getTagValue(pool.node.tags, TAGS.keys.uploaderTxId);
		}
	});
}

export async function getPools(): Promise<PoolType[]> {
	const arClient = new ArweaveClient();
	const contract = arClient.warp.contract(POOL_INDEX_CONTRACT_ID).setEvaluationOptions({ allowBigInt: true });
	return ((await contract.readState()) as any).cachedValue.state.pools;
}

export async function getPoolById(poolId: string): Promise<PoolType | null> {
	const arClient = new ArweaveClient();

	try {
		const contract = arClient.warp.contract(poolId).setEvaluationOptions({ allowBigInt: true });
		return {
			id: poolId,
			state: ((await contract.readState()) as any).cachedValue.state,
		};
	} catch (error: any) {
		console.error(error);
		return null;
	}
}

export async function getLatestPoolSearchIndexTxId(poolId: string) {
	const poolSearchIndeces: GQLResponseType[] = await getGQLData({
		ids: null,
		tagFilters: [
			{
				name: TAGS.keys.appType,
				values: [TAGS.values.searchIndex],
			},
			{
				name: TAGS.keys.alexPoolId,
				values: [poolId],
			},
		],
		uploader: null,
		cursor: null,
		reduxCursor: null,
		cursorObject: null,
	});

	if (poolSearchIndeces.length === 0) return null;

	if (poolSearchIndeces.length === 1) return poolSearchIndeces[0];

	let latestIndex = poolSearchIndeces[0];

	for (let i = 1; i < poolSearchIndeces.length; i++) {
		let thisIndex = poolSearchIndeces[i];
		let thisIndexDateTag = getTagValue(thisIndex.node.tags, TAGS.keys.timestamp);
		let latestIndexDateTag = getTagValue(latestIndex.node.tags, TAGS.keys.timestamp);
		let thisIndexDate = thisIndexDateTag && thisIndexDateTag !== 'N/A' ? parseInt(thisIndexDateTag) : 0;
		let latestIndexDate = latestIndexDateTag && latestIndexDateTag !== 'N/A' ? parseInt(latestIndexDateTag) : 0;
		if (thisIndexDate > latestIndexDate) {
			latestIndex = thisIndex;
		}
	}

	return latestIndex;
}

export async function getPoolSearchIndexById(poolSearchIndexId: string): Promise<PoolSearchIndexType | null> {
	const arClient = new ArweaveClient();

	try {
		const contract = arClient.warp.contract(poolSearchIndexId).setEvaluationOptions({ allowBigInt: true });
		return {
			id: poolSearchIndexId,
			state: ((await contract.readState()) as any).cachedValue.state,
		};
	} catch (error: any) {
		console.error(error);
		return null;
	}
}

export async function getPoolCount(nftContractSrc: string): Promise<number> {
	let redstoneContracts = await fetch(getRedstoneSrcTxEndpoint(nftContractSrc, 1));
	let redstoneJson = await redstoneContracts.json();
	return parseInt(redstoneJson.paging.total);
}

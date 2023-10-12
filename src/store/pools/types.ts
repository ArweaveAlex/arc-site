import { PoolIndexType, PoolSearchIndexType, PoolType } from 'arcframework';

export type PoolsType = {
	data: PoolIndexType[] | PoolType[] | null;
};

export type PoolsSearchIndexType = {
	data: PoolSearchIndexType[] | null;
};

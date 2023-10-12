import { PoolType } from 'arcframework';

export type AccountType = {
	pools: {
		data: PoolType[] | null;
	};
};

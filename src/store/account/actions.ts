import { Dispatch } from 'redux';

import { PoolType } from 'arcframework';

import { ADD_ACCOUNT_POOL, SET_ACCOUNT_POOLS } from './constants';
import { AccountType } from './types';

export function addAccountPool(payload: PoolType) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: ADD_ACCOUNT_POOL,
			payload: payload,
		});
	};
}

export function setAccountPools(payload: AccountType) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: SET_ACCOUNT_POOLS,
			payload: payload,
		});
	};
}

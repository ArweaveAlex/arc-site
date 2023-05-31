import { ReduxActionType } from 'helpers/types';

import { ADD_ACCOUNT_POOL, SET_ACCOUNT_POOLS } from './constants';
import { AccountType } from './types';

export const initStateAccount: AccountType = {
	pools: {
		data: [],
	},
};

export function accountReducer(state: AccountType = initStateAccount, action: ReduxActionType) {
	switch (action.type) {
		case ADD_ACCOUNT_POOL:
			return Object.assign({}, state, {
				pools: {
					data: action.payload ? [action.payload, ...state.pools.data] : state.pools.data,
				},
			});
		case SET_ACCOUNT_POOLS:
			return Object.assign({}, state, {
				pools: {
					data: action.payload.pools.data ?? state.pools.data,
				},
			});
		default:
			return state;
	}
}

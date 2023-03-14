import { Dispatch } from 'redux';

import { SET_POOLS, SET_POOLS_INDEX_SEARCH } from './constants';
import { PoolsSearchIndexType, PoolsType } from './types';

export function setPools(payload: PoolsType) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: SET_POOLS,
			payload: payload,
		});
	};
}

export function setPoolsSearch(payload: PoolsSearchIndexType) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: SET_POOLS_INDEX_SEARCH,
			payload: payload,
		});
	};
}

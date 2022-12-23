import { ReduxActionType } from "types";
import { PoolsType, PoolsSearchIndexType } from "./types";
import { SET_POOLS, SET_POOLS_INDEX_SEARCH } from "./constants";

export const initStatePools: PoolsType = {
    data: null
};

export function poolsReducer(
    state: PoolsType = initStatePools,
    action: ReduxActionType
) {
    switch (action.type) {
        case SET_POOLS:
            return Object.assign({}, state, {
                data: action.payload.data ?? state.data
            })
        default:
            return state;
    }
}

export const initStatePoolsSearch: PoolsSearchIndexType = {
    data: null
};

export function poolsSearchReducer(
    state: PoolsSearchIndexType = initStatePoolsSearch,
    action: ReduxActionType
) {
    switch (action.type) {
        case SET_POOLS_INDEX_SEARCH:
            return Object.assign({}, state, {
                data: action.payload.data ?? state.data
            })
        default:
            return state;
    }
}
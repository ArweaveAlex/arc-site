import { ReduxActionType } from "types";
import { PoolsType } from "./types";
import { SET_POOLS } from "./constants";

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
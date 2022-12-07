import { Dispatch } from "redux";

import { SET_POOLS } from "./constants";
import { PoolsType } from "./types";

export function setPools(payload: PoolsType) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SET_POOLS,
            payload: payload
        })
    }
}
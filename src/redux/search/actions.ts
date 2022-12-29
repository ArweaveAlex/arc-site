import { Dispatch } from "redux";

import { SET_SEARCH_IDS, CLEAR_SEARCH_IDS } from "./constants";
import { SearchIdsType } from "./types";

export function setSearchIds(payload: SearchIdsType) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SET_SEARCH_IDS,
            payload: payload
        })
    }
}

export function clearSearchIds() {
    return (dispatch: Dispatch) => {
        dispatch({
            type: CLEAR_SEARCH_IDS,
            payload: null
        })
    }
}
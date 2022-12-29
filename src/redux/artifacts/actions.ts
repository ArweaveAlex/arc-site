import { Dispatch } from "redux";

import { SET_COLLECTION } from "./constants";
import { CollectionsType } from "./types";

export function setCollection(payload: CollectionsType) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SET_COLLECTION,
            payload: payload
        })
    }
}
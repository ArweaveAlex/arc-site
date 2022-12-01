import { Dispatch } from "redux";

import { SET_CURSORS, CLEAR_CURSORS } from "./constants";
import { CursorsType } from "./types";

export function setCursors(payload: CursorsType) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SET_CURSORS,
            payload: payload
        })
    }
}

export function clearCursors() {
    return (dispatch: Dispatch) => {
        dispatch({
            type: CLEAR_CURSORS,
            payload: null
        })
    }
}
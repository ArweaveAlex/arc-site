import { Dispatch } from "redux";

import { SET_BOOKMARKS } from "./constants";
import { BookmarksType } from "./types";

export function setBookmarks(payload: BookmarksType) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SET_BOOKMARKS,
            payload: payload
        })
    }
}
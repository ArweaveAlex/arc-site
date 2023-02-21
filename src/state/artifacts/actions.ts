import { Dispatch } from "redux";

import { SET_COLLECTION } from "./constants";
import { BookmarksType } from "./types";

export function setBookmark(payload: BookmarksType) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_COLLECTION,
      payload: payload,
    });
  };
}

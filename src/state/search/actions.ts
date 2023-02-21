import { Dispatch } from "redux";

import {
  SET_SEARCH_IDS,
  CLEAR_SEARCH_IDS,
  SET_SEARCH_TERM,
  CLEAR_SEARCH_TERM,
  SET_SEARCH_INDECES,
  CLEAR_SEARCH_INDECES,
} from "./constants";
import { SearchIdsType, SearchTermType, SearchIndecesType } from "./types";

export function setSearchIds(payload: SearchIdsType) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_SEARCH_IDS,
      payload: payload,
    });
  };
}

export function clearSearchIds() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: CLEAR_SEARCH_IDS,
      payload: null,
    });
  };
}

export function setSearchTerm(payload: SearchTermType) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_SEARCH_TERM,
      payload: payload,
    });
  };
}

export function clearSearchTerm() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: CLEAR_SEARCH_TERM,
      payload: null,
    });
  };
}

export function setSearchIndeces(payload: SearchIndecesType) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_SEARCH_INDECES,
      payload: payload,
    });
  };
}

export function clearSearchIndeces() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: CLEAR_SEARCH_INDECES,
      payload: null,
    });
  };
}

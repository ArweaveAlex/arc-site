import { ReduxActionType } from "config/types";
import { SearchIdsType, SearchTermType } from "./types";
import { SET_SEARCH_IDS, CLEAR_SEARCH_IDS, SET_SEARCH_TERM, CLEAR_SEARCH_TERM } from "./constants";
import { REDUX_TABLES } from "config/redux";

export const initStateSearchIds: SearchIdsType = {
    [REDUX_TABLES.accountAll]: [],
    [REDUX_TABLES.accountCollections]: [],
    [REDUX_TABLES.poolAll]: [],
    [REDUX_TABLES.libraryAll]: [],
    [REDUX_TABLES.libraryCollections]: []
};

function checkIdPayload(payload: any, reduxCursor: string) {
    if (payload === null || payload === undefined) {
        return false;
    }
    else {
        if (payload[reduxCursor] === "") {
            return true;
        }
        if (payload[reduxCursor]) {
            return true;
        }
        else {
            return false;
        }
    }
}

export function searchIdsReducer(
    state: SearchIdsType = initStateSearchIds,
    action: ReduxActionType
) {
    switch (action.type) {
        case SET_SEARCH_IDS:
            return Object.assign({}, state, {
                [REDUX_TABLES.accountAll]: checkIdPayload(action.payload, REDUX_TABLES.accountAll) ?
                    action.payload[REDUX_TABLES.accountAll] : state[REDUX_TABLES.accountAll],
                [REDUX_TABLES.accountCollections]: checkIdPayload(action.payload, REDUX_TABLES.accountCollections) ?
                    action.payload[REDUX_TABLES.accountCollections] : state[REDUX_TABLES.accountCollections],
                [REDUX_TABLES.poolAll]: checkIdPayload(action.payload, REDUX_TABLES.poolAll) ?
                    action.payload[REDUX_TABLES.poolAll] : state[REDUX_TABLES.poolAll],
                [REDUX_TABLES.libraryAll]: checkIdPayload(action.payload, REDUX_TABLES.libraryAll) ?
                    action.payload[REDUX_TABLES.libraryAll] : state[REDUX_TABLES.libraryAll],
                [REDUX_TABLES.libraryCollections]: checkIdPayload(action.payload, REDUX_TABLES.libraryCollections) ?
                    action.payload[REDUX_TABLES.libraryCollections] : state[REDUX_TABLES.libraryCollections]
            })
        case CLEAR_SEARCH_IDS:
            return Object.assign({}, state, initStateSearchIds)
        default:
            return state;
    }
}

export const initStateSearchTerm: SearchTermType = {
    [REDUX_TABLES.accountAll]: "",
    [REDUX_TABLES.accountCollections]: "",
    [REDUX_TABLES.poolAll]: "",
    [REDUX_TABLES.libraryAll]: "",
    [REDUX_TABLES.libraryCollections]: ""
}

export function searchTermReducer(
    state: SearchTermType = initStateSearchTerm,
    action: ReduxActionType
) {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return Object.assign({}, state, {
                [REDUX_TABLES.accountAll]: checkIdPayload(action.payload, REDUX_TABLES.accountAll) ?
                    action.payload[REDUX_TABLES.accountAll] : state[REDUX_TABLES.accountAll],
                [REDUX_TABLES.accountCollections]: checkIdPayload(action.payload, REDUX_TABLES.accountCollections) ?
                    action.payload[REDUX_TABLES.accountCollections] : state[REDUX_TABLES.accountCollections],
                [REDUX_TABLES.poolAll]: checkIdPayload(action.payload, REDUX_TABLES.poolAll) ?
                    action.payload[REDUX_TABLES.poolAll] : state[REDUX_TABLES.poolAll],
                [REDUX_TABLES.libraryAll]: checkIdPayload(action.payload, REDUX_TABLES.libraryAll) ?
                    action.payload[REDUX_TABLES.libraryAll] : state[REDUX_TABLES.libraryAll],
                [REDUX_TABLES.libraryCollections]: checkIdPayload(action.payload, REDUX_TABLES.libraryCollections) ?
                    action.payload[REDUX_TABLES.libraryCollections] : state[REDUX_TABLES.libraryCollections]
            })
        case CLEAR_SEARCH_TERM:
            return Object.assign({}, state, initStateSearchTerm)
        default:
            return state;
    }
}
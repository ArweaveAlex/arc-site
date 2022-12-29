import { ReduxActionType } from "config/types";
import { SearchIdsType } from "./types";
import { SET_SEARCH_IDS, CLEAR_SEARCH_IDS } from "./constants";
import { REDUX_CURSORS } from "config/redux";

export const initStateSearchIds: SearchIdsType = {
    [REDUX_CURSORS.accountAll]: [],
    [REDUX_CURSORS.accountCollections]: [],
    [REDUX_CURSORS.poolAll]: [],
    [REDUX_CURSORS.libraryAll]: [],
    [REDUX_CURSORS.libraryCollections]: []
};

function checkPayload(payload: any, reduxCursor: string) {
    if (!payload) {
        return false;
    }
    else {
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
                [REDUX_CURSORS.accountAll]: checkPayload(action.payload, REDUX_CURSORS.accountAll) ?
                    action.payload[REDUX_CURSORS.accountAll] : state[REDUX_CURSORS.accountAll],
                [REDUX_CURSORS.accountCollections]: checkPayload(action.payload, REDUX_CURSORS.accountCollections) ?
                    action.payload[REDUX_CURSORS.accountCollections] : state[REDUX_CURSORS.accountCollections],
                [REDUX_CURSORS.poolAll]: checkPayload(action.payload, REDUX_CURSORS.poolAll) ?
                    action.payload[REDUX_CURSORS.poolAll] : state[REDUX_CURSORS.poolAll],
                [REDUX_CURSORS.libraryAll]: checkPayload(action.payload, REDUX_CURSORS.libraryAll) ?
                    action.payload[REDUX_CURSORS.libraryAll] : state[REDUX_CURSORS.libraryAll],
                [REDUX_CURSORS.libraryCollections]: checkPayload(action.payload, REDUX_CURSORS.libraryCollections) ?
                    action.payload[REDUX_CURSORS.libraryCollections] : state[REDUX_CURSORS.libraryCollections]
            })
        case CLEAR_SEARCH_IDS:
            return Object.assign({}, state, initStateSearchIds)
        default:
            return state;
    }
}
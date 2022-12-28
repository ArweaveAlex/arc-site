import { CursorObjectKeyType, ReduxActionType } from "config/types";
import { CursorsType } from "./types";
import { SET_CURSORS, CLEAR_CURSORS } from "./constants";
import { REDUX_CURSORS } from "config/redux";

export const initStateCursors: CursorsType = {
    gql: {
        [REDUX_CURSORS.accountAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_CURSORS.accountBookmarks]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_CURSORS.poolAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_CURSORS.libraryAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_CURSORS.libraryBookmarks]: {
            previous: null,
            next: null,
            cursors: []
        }
    },
    search: {
        [REDUX_CURSORS.accountAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_CURSORS.accountBookmarks]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_CURSORS.poolAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_CURSORS.libraryAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_CURSORS.libraryBookmarks]: {
            previous: null,
            next: null,
            cursors: []
        }
    }
};

function checkPayload(payload: any, objectKey: CursorObjectKeyType, reduxCursor: string) {
    if (!payload[objectKey]) {
        return false;
    }
    else {
        if (payload[objectKey][reduxCursor]) {
            return true;
        }
        else {
            return false;
        }
    }
}

export function cursorsReducer(
    state: CursorsType = initStateCursors,
    action: ReduxActionType
) {
    switch (action.type) {
        case SET_CURSORS:
            return Object.assign({}, state, {
                gql: {
                    [REDUX_CURSORS.accountAll]: checkPayload(action.payload, "gql", REDUX_CURSORS.accountAll) ?
                        action.payload.gql[REDUX_CURSORS.accountAll] : state.gql[REDUX_CURSORS.accountAll],
                    [REDUX_CURSORS.accountBookmarks]: checkPayload(action.payload, "gql", REDUX_CURSORS.accountBookmarks) ?
                        action.payload.gql[REDUX_CURSORS.accountBookmarks] : state.gql[REDUX_CURSORS.accountBookmarks],
                    [REDUX_CURSORS.poolAll]: checkPayload(action.payload, "gql", REDUX_CURSORS.poolAll) ?
                        action.payload.gql[REDUX_CURSORS.poolAll] : state.gql[REDUX_CURSORS.poolAll],
                    [REDUX_CURSORS.libraryAll]: checkPayload(action.payload, "gql", REDUX_CURSORS.libraryAll) ?
                        action.payload.gql[REDUX_CURSORS.libraryAll] : state.gql[REDUX_CURSORS.libraryAll],
                    [REDUX_CURSORS.libraryBookmarks]: checkPayload(action.payload, "gql", REDUX_CURSORS.libraryBookmarks) ?
                        action.payload.gql[REDUX_CURSORS.libraryBookmarks] : state.gql[REDUX_CURSORS.libraryBookmarks]
                },
                search: {
                    [REDUX_CURSORS.accountAll]: checkPayload(action.payload, "search", REDUX_CURSORS.accountAll) ?
                        action.payload.search[REDUX_CURSORS.accountAll] : state.search[REDUX_CURSORS.accountAll],
                    [REDUX_CURSORS.accountBookmarks]: checkPayload(action.payload, "search", REDUX_CURSORS.accountBookmarks) ?
                        action.payload.search[REDUX_CURSORS.accountBookmarks] : state.search[REDUX_CURSORS.accountBookmarks],
                    [REDUX_CURSORS.poolAll]: checkPayload(action.payload, "search", REDUX_CURSORS.poolAll) ?
                        action.payload.search[REDUX_CURSORS.poolAll] : state.search[REDUX_CURSORS.poolAll],
                    [REDUX_CURSORS.libraryAll]: checkPayload(action.payload, "search", REDUX_CURSORS.libraryAll) ?
                        action.payload.search[REDUX_CURSORS.libraryAll] : state.search[REDUX_CURSORS.libraryAll],
                    [REDUX_CURSORS.libraryBookmarks]: checkPayload(action.payload, "search", REDUX_CURSORS.libraryBookmarks) ?
                        action.payload.search[REDUX_CURSORS.libraryBookmarks] : state.search[REDUX_CURSORS.libraryBookmarks]
                }
            })
        case CLEAR_CURSORS:
            return Object.assign({}, state, initStateCursors)
        default:
            return state;
    }
}
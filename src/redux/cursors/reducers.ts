import { CursorObjectKeyType, CursorEnum, ReduxActionType } from "config/types";
import { CursorsType } from "./types";
import { SET_CURSORS, CLEAR_CURSORS } from "./constants";
import { REDUX_TABLES } from "config/redux";

export const initStateCursors: CursorsType = {
    gql: {
        [REDUX_TABLES.accountAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_TABLES.accountCollections]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_TABLES.poolAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_TABLES.libraryAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_TABLES.libraryCollections]: {
            previous: null,
            next: null,
            cursors: []
        }
    },
    search: {
        [REDUX_TABLES.accountAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_TABLES.accountCollections]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_TABLES.poolAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_TABLES.libraryAll]: {
            previous: null,
            next: null,
            cursors: []
        },
        [REDUX_TABLES.libraryCollections]: {
            previous: null,
            next: null,
            cursors: []
        }
    }
};

function checkCursorPayload(payload: any, objectKey: CursorObjectKeyType, reduxCursor: string) {
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
                    [REDUX_TABLES.accountAll]: checkCursorPayload(action.payload, CursorEnum.GQL, REDUX_TABLES.accountAll) ?
                        action.payload.gql[REDUX_TABLES.accountAll] : state.gql[REDUX_TABLES.accountAll],
                    [REDUX_TABLES.accountCollections]: checkCursorPayload(action.payload, CursorEnum.GQL, REDUX_TABLES.accountCollections) ?
                        action.payload.gql[REDUX_TABLES.accountCollections] : state.gql[REDUX_TABLES.accountCollections],
                    [REDUX_TABLES.poolAll]: checkCursorPayload(action.payload, CursorEnum.GQL, REDUX_TABLES.poolAll) ?
                        action.payload.gql[REDUX_TABLES.poolAll] : state.gql[REDUX_TABLES.poolAll],
                    [REDUX_TABLES.libraryAll]: checkCursorPayload(action.payload, CursorEnum.GQL, REDUX_TABLES.libraryAll) ?
                        action.payload.gql[REDUX_TABLES.libraryAll] : state.gql[REDUX_TABLES.libraryAll],
                    [REDUX_TABLES.libraryCollections]: checkCursorPayload(action.payload, CursorEnum.GQL, REDUX_TABLES.libraryCollections) ?
                        action.payload.gql[REDUX_TABLES.libraryCollections] : state.gql[REDUX_TABLES.libraryCollections]
                },
                search: {
                    [REDUX_TABLES.accountAll]: checkCursorPayload(action.payload, CursorEnum.Search, REDUX_TABLES.accountAll) ?
                        action.payload.search[REDUX_TABLES.accountAll] : state.search[REDUX_TABLES.accountAll],
                    [REDUX_TABLES.accountCollections]: checkCursorPayload(action.payload, CursorEnum.Search, REDUX_TABLES.accountCollections) ?
                        action.payload.search[REDUX_TABLES.accountCollections] : state.search[REDUX_TABLES.accountCollections],
                    [REDUX_TABLES.poolAll]: checkCursorPayload(action.payload, CursorEnum.Search, REDUX_TABLES.poolAll) ?
                        action.payload.search[REDUX_TABLES.poolAll] : state.search[REDUX_TABLES.poolAll],
                    [REDUX_TABLES.libraryAll]: checkCursorPayload(action.payload, CursorEnum.Search, REDUX_TABLES.libraryAll) ?
                        action.payload.search[REDUX_TABLES.libraryAll] : state.search[REDUX_TABLES.libraryAll],
                    [REDUX_TABLES.libraryCollections]: checkCursorPayload(action.payload, CursorEnum.Search, REDUX_TABLES.libraryCollections) ?
                        action.payload.search[REDUX_TABLES.libraryCollections] : state.search[REDUX_TABLES.libraryCollections]
                }
            })
        case CLEAR_CURSORS:
            return Object.assign({}, state, initStateCursors)
        default:
            return state;
    }
}
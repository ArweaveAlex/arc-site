import { CursorObjectKeyType, CursorEnum, ReduxActionType } from "config/types";
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
        [REDUX_CURSORS.accountCollections]: {
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
        [REDUX_CURSORS.libraryCollections]: {
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
        [REDUX_CURSORS.accountCollections]: {
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
        [REDUX_CURSORS.libraryCollections]: {
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
                    [REDUX_CURSORS.accountAll]: checkPayload(action.payload, CursorEnum.GQL, REDUX_CURSORS.accountAll) ?
                        action.payload.gql[REDUX_CURSORS.accountAll] : state.gql[REDUX_CURSORS.accountAll],
                    [REDUX_CURSORS.accountCollections]: checkPayload(action.payload, CursorEnum.GQL, REDUX_CURSORS.accountCollections) ?
                        action.payload.gql[REDUX_CURSORS.accountCollections] : state.gql[REDUX_CURSORS.accountCollections],
                    [REDUX_CURSORS.poolAll]: checkPayload(action.payload, CursorEnum.GQL, REDUX_CURSORS.poolAll) ?
                        action.payload.gql[REDUX_CURSORS.poolAll] : state.gql[REDUX_CURSORS.poolAll],
                    [REDUX_CURSORS.libraryAll]: checkPayload(action.payload, CursorEnum.GQL, REDUX_CURSORS.libraryAll) ?
                        action.payload.gql[REDUX_CURSORS.libraryAll] : state.gql[REDUX_CURSORS.libraryAll],
                    [REDUX_CURSORS.libraryCollections]: checkPayload(action.payload, CursorEnum.GQL, REDUX_CURSORS.libraryCollections) ?
                        action.payload.gql[REDUX_CURSORS.libraryCollections] : state.gql[REDUX_CURSORS.libraryCollections]
                },
                search: {
                    [REDUX_CURSORS.accountAll]: checkPayload(action.payload, CursorEnum.Search, REDUX_CURSORS.accountAll) ?
                        action.payload.search[REDUX_CURSORS.accountAll] : state.search[REDUX_CURSORS.accountAll],
                    [REDUX_CURSORS.accountCollections]: checkPayload(action.payload, CursorEnum.Search, REDUX_CURSORS.accountCollections) ?
                        action.payload.search[REDUX_CURSORS.accountCollections] : state.search[REDUX_CURSORS.accountCollections],
                    [REDUX_CURSORS.poolAll]: checkPayload(action.payload, CursorEnum.Search, REDUX_CURSORS.poolAll) ?
                        action.payload.search[REDUX_CURSORS.poolAll] : state.search[REDUX_CURSORS.poolAll],
                    [REDUX_CURSORS.libraryAll]: checkPayload(action.payload, CursorEnum.Search, REDUX_CURSORS.libraryAll) ?
                        action.payload.search[REDUX_CURSORS.libraryAll] : state.search[REDUX_CURSORS.libraryAll],
                    [REDUX_CURSORS.libraryCollections]: checkPayload(action.payload, CursorEnum.Search, REDUX_CURSORS.libraryCollections) ?
                        action.payload.search[REDUX_CURSORS.libraryCollections] : state.search[REDUX_CURSORS.libraryCollections]
                }
            })
        case CLEAR_CURSORS:
            return Object.assign({}, state, initStateCursors)
        default:
            return state;
    }
}
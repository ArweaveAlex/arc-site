import { ReduxActionType } from "types";
import { CursorsType } from "./types";
import { SET_CURSORS, CLEAR_CURSORS } from "./constants";
import { REDUX_CURSORS } from "redux-config";

export const initStateCursors: CursorsType = {
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
    },
};

export function cursorsReducer(
    state: CursorsType = initStateCursors,
    action: ReduxActionType
) {
    switch (action.type) {
        case SET_CURSORS:
            return Object.assign({}, state, {
                [REDUX_CURSORS.accountAll]: {
                    previous: action.payload[REDUX_CURSORS.accountAll]?.previous ?? state[REDUX_CURSORS.accountAll].previous,
                    next: action.payload[REDUX_CURSORS.accountAll]?.next ?? state[REDUX_CURSORS.accountAll].next,
                    cursors: action.payload[REDUX_CURSORS.accountAll]?.cursors ?? state[REDUX_CURSORS.accountAll].cursors
                },
                [REDUX_CURSORS.accountBookmarks]: {
                    previous: action.payload[REDUX_CURSORS.accountBookmarks]?.previous ?? state[REDUX_CURSORS.accountBookmarks].previous,
                    next: action.payload[REDUX_CURSORS.accountBookmarks]?.next ?? state[REDUX_CURSORS.accountBookmarks].next,
                    cursors: action.payload[REDUX_CURSORS.accountBookmarks]?.cursors ?? state[REDUX_CURSORS.accountBookmarks].cursors
                },
                [REDUX_CURSORS.poolAll]: {
                    previous: action.payload[REDUX_CURSORS.poolAll]?.previous ?? state[REDUX_CURSORS.poolAll].previous,
                    next: action.payload[REDUX_CURSORS.poolAll]?.next ?? state[REDUX_CURSORS.poolAll].next,
                    cursors: action.payload[REDUX_CURSORS.poolAll]?.cursors ?? state[REDUX_CURSORS.poolAll].cursors
                },
                [REDUX_CURSORS.libraryAll]: {
                    previous: action.payload[REDUX_CURSORS.libraryAll]?.previous ?? state[REDUX_CURSORS.libraryAll].previous,
                    next: action.payload[REDUX_CURSORS.libraryAll]?.next ?? state[REDUX_CURSORS.libraryAll].next,
                    cursors: action.payload[REDUX_CURSORS.libraryAll]?.cursors ?? state[REDUX_CURSORS.libraryAll].cursors
                },
                [REDUX_CURSORS.libraryBookmarks]: {
                    previous: action.payload[REDUX_CURSORS.libraryBookmarks]?.previous ?? state[REDUX_CURSORS.libraryBookmarks].previous,
                    next: action.payload[REDUX_CURSORS.libraryBookmarks]?.next ?? state[REDUX_CURSORS.libraryBookmarks].next,
                    cursors: action.payload[REDUX_CURSORS.libraryBookmarks]?.cursors ?? state[REDUX_CURSORS.libraryBookmarks].cursors
                },
            })
        case CLEAR_CURSORS:
            return Object.assign({}, state, {
                [REDUX_CURSORS.poolAll]: {
                    previous: null,
                    next: null,
                    cursors: []
                }
            })
        default:
            return state;
    }
}
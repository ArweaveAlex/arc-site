import { ReduxActionType } from "types";
import { CursorsType } from "./types";
import { SET_CURSORS, CLEAR_CURSORS } from "./constants";
import { REDUX_CURSORS } from "redux-config";

export const initStateCursors: CursorsType = {
    "collection-all": {
        previous: null,
        next: null,
        cursors: []
    }
};

export function cursorsReducer(
    state: CursorsType = initStateCursors,
    action: ReduxActionType
) {
    switch (action.type) {
        case SET_CURSORS:
            return Object.assign({}, state, {
                [REDUX_CURSORS.collectionAll]: {
                    previous: action.payload[REDUX_CURSORS.collectionAll].previous ?? state[REDUX_CURSORS.collectionAll].previous,
                    next: action.payload[REDUX_CURSORS.collectionAll].next ?? state[REDUX_CURSORS.collectionAll].next,
                    cursors: action.payload[REDUX_CURSORS.collectionAll].cursors ?? state[REDUX_CURSORS.collectionAll].cursors
                }
            })
        case CLEAR_CURSORS:
            return Object.assign({}, state, {
                [REDUX_CURSORS.collectionAll]: {
                    previous: null,
                    next: null,
                    cursors: []
                }
            })
        default:
            return state;
    }
}
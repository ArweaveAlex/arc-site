import { ReduxActionType } from "types";
import { CursorsType } from "./types";
import { SET_CURSORS } from "./constants";
import { REDUX_CURSORS } from "redux-config";

export const initStateCursors: CursorsType = {
    "collection-all": {
        previous: null,
        next: null
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
                    next: null
                }
            })
        default:
            return state;
    }
}
import { ReduxActionType } from "helpers/types";
import { CollectionsType } from "./types";
import { SET_COLLECTION } from "./constants";

export const initStateCollections: CollectionsType = {
    owner: null,
    ids: []
};

export function collectionsReducer(
    state: CollectionsType = initStateCollections,
    action: ReduxActionType
) {
    switch (action.type) {
        case SET_COLLECTION:
            return Object.assign({}, state, {
                owner: action.payload.owner ?? state.owner,
                ids: action.payload.ids ?? state.ids
            })
        default:
            return state;
    }
}
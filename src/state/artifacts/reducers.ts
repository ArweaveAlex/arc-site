import { ReduxActionType } from 'helpers/types';

<<<<<<< HEAD
import { SET_COLLECTION } from './constants';
=======
import { SET_BOOKMARKS } from './constants';
>>>>>>> dev
import { BookmarksType } from './types';

export const initStateBookmarks: BookmarksType = {
	owner: null,
	ids: [],
};

export function bookmarksReducer(state: BookmarksType = initStateBookmarks, action: ReduxActionType) {
	switch (action.type) {
		case SET_BOOKMARKS:
			return Object.assign({}, state, {
				owner: action.payload.owner ?? state.owner,
				ids: action.payload.ids ?? state.ids,
			});
		default:
			return state;
	}
}

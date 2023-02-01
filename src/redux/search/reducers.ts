import { ReduxActionType } from 'helpers/types';
import { SearchIdsType, SearchTermType, SearchIndecesType } from './types';
import { SET_SEARCH_IDS, CLEAR_SEARCH_IDS, SET_SEARCH_TERM, CLEAR_SEARCH_TERM, SET_SEARCH_INDECES, CLEAR_SEARCH_INDECES } from './constants';
import { REDUX_TABLES } from 'helpers/redux';

export const initStateSearchIds: SearchIdsType = {
	[REDUX_TABLES.accountAll]: [],
	[REDUX_TABLES.accountBookmarks]: [],
	[REDUX_TABLES.poolAll]: [],
	[REDUX_TABLES.libraryAll]: [],
	[REDUX_TABLES.libraryBookmarks]: [],
};

function checkPayload(payload: any, reduxCursor: string) {
	if (payload === null || payload === undefined) {
		return false;
	} else {
		if (payload[reduxCursor] === '') {
			return true;
		}
		if (payload[reduxCursor]) {
			return true;
		} else {
			return false;
		}
	}
}

export function searchIdsReducer(state: SearchIdsType = initStateSearchIds, action: ReduxActionType) {
	switch (action.type) {
		case SET_SEARCH_IDS:
			return Object.assign({}, state, {
				[REDUX_TABLES.accountAll]: checkPayload(action.payload, REDUX_TABLES.accountAll) ? action.payload[REDUX_TABLES.accountAll] : state[REDUX_TABLES.accountAll],
				[REDUX_TABLES.accountBookmarks]: checkPayload(action.payload, REDUX_TABLES.accountBookmarks) ? action.payload[REDUX_TABLES.accountBookmarks] : state[REDUX_TABLES.accountBookmarks],
				[REDUX_TABLES.poolAll]: checkPayload(action.payload, REDUX_TABLES.poolAll) ? action.payload[REDUX_TABLES.poolAll] : state[REDUX_TABLES.poolAll],
				[REDUX_TABLES.libraryAll]: checkPayload(action.payload, REDUX_TABLES.libraryAll) ? action.payload[REDUX_TABLES.libraryAll] : state[REDUX_TABLES.libraryAll],
				[REDUX_TABLES.libraryBookmarks]: checkPayload(action.payload, REDUX_TABLES.libraryBookmarks) ? action.payload[REDUX_TABLES.libraryBookmarks] : state[REDUX_TABLES.libraryBookmarks],
			});
		case CLEAR_SEARCH_IDS:
			return Object.assign({}, initStateSearchIds);
		default:
			return state;
	}
}

export const initStateSearchTerm: SearchTermType = {
	[REDUX_TABLES.accountAll]: {
		value: '',
		id: { value: '', type: null },
	},
	[REDUX_TABLES.accountBookmarks]: {
		value: '',
		id: { value: '', type: null },
	},
	[REDUX_TABLES.poolAll]: {
		value: '',
		id: { value: '', type: null },
	},
	[REDUX_TABLES.libraryAll]: {
		value: '',
		id: { value: '', type: null },
	},
	[REDUX_TABLES.libraryBookmarks]: {
		value: '',
		id: { value: '', type: null },
	},
};

export function searchTermReducer(state: SearchTermType = initStateSearchTerm, action: ReduxActionType) {
	switch (action.type) {
		case SET_SEARCH_TERM:
			return Object.assign({}, state, {
				[REDUX_TABLES.accountAll]: checkPayload(action.payload, REDUX_TABLES.accountAll) ? action.payload[REDUX_TABLES.accountAll] : state[REDUX_TABLES.accountAll],
				[REDUX_TABLES.accountBookmarks]: checkPayload(action.payload, REDUX_TABLES.accountBookmarks) ? action.payload[REDUX_TABLES.accountBookmarks] : state[REDUX_TABLES.accountBookmarks],
				[REDUX_TABLES.poolAll]: checkPayload(action.payload, REDUX_TABLES.poolAll) ? action.payload[REDUX_TABLES.poolAll] : state[REDUX_TABLES.poolAll],
				[REDUX_TABLES.libraryAll]: checkPayload(action.payload, REDUX_TABLES.libraryAll) ? action.payload[REDUX_TABLES.libraryAll] : state[REDUX_TABLES.libraryAll],
				[REDUX_TABLES.libraryBookmarks]: checkPayload(action.payload, REDUX_TABLES.libraryBookmarks) ? action.payload[REDUX_TABLES.libraryBookmarks] : state[REDUX_TABLES.libraryBookmarks],
			});
		case CLEAR_SEARCH_TERM:
			return Object.assign(
				{},
				{
					[REDUX_TABLES.accountAll]: {
						value: '',
						id: state[REDUX_TABLES.accountAll].id,
					},
					[REDUX_TABLES.accountBookmarks]: {
						value: '',
						id: state[REDUX_TABLES.accountBookmarks].id,
					},
					[REDUX_TABLES.poolAll]: {
						value: '',
						id: state[REDUX_TABLES.poolAll].id,
					},
					[REDUX_TABLES.libraryAll]: {
						value: '',
						id: state[REDUX_TABLES.libraryAll].id,
					},
					[REDUX_TABLES.libraryBookmarks]: {
						value: '',
						id: state[REDUX_TABLES.libraryBookmarks].id,
					},
				}
			);
		default:
			return state;
	}
}

export const initStateSearchIndeces: SearchTermType = {
	[REDUX_TABLES.accountAll]: {
		value: [],
		id: { value: '', type: null },
	},
	[REDUX_TABLES.accountBookmarks]: {
		value: [],
		id: { value: '', type: null },
	},
	[REDUX_TABLES.poolAll]: {
		value: [],
		id: { value: '', type: null },
	},
	[REDUX_TABLES.libraryAll]: {
		value: [],
		id: { value: '', type: null },
	},
	[REDUX_TABLES.libraryBookmarks]: {
		value: [],
		id: { value: '', type: null },
	},
};

export function searchIndecesReducer(state: SearchIndecesType = initStateSearchIndeces, action: ReduxActionType) {
	switch (action.type) {
		case SET_SEARCH_INDECES:
			return Object.assign({}, state, {
				[REDUX_TABLES.accountAll]: checkPayload(action.payload, REDUX_TABLES.accountAll) ? action.payload[REDUX_TABLES.accountAll] : state[REDUX_TABLES.accountAll],
				[REDUX_TABLES.accountBookmarks]: checkPayload(action.payload, REDUX_TABLES.accountBookmarks) ? action.payload[REDUX_TABLES.accountBookmarks] : state[REDUX_TABLES.accountBookmarks],
				[REDUX_TABLES.poolAll]: checkPayload(action.payload, REDUX_TABLES.poolAll) ? action.payload[REDUX_TABLES.poolAll] : state[REDUX_TABLES.poolAll],
				[REDUX_TABLES.libraryAll]: checkPayload(action.payload, REDUX_TABLES.libraryAll) ? action.payload[REDUX_TABLES.libraryAll] : state[REDUX_TABLES.libraryAll],
				[REDUX_TABLES.libraryBookmarks]: checkPayload(action.payload, REDUX_TABLES.libraryBookmarks) ? action.payload[REDUX_TABLES.libraryBookmarks] : state[REDUX_TABLES.libraryBookmarks],
			});
		case CLEAR_SEARCH_INDECES:
			return Object.assign(
				{},
				{
					[REDUX_TABLES.accountAll]: {
						value: [],
						id: state[REDUX_TABLES.accountAll].id,
					},
					[REDUX_TABLES.accountBookmarks]: {
						value: [],
						id: state[REDUX_TABLES.accountBookmarks].id,
					},
					[REDUX_TABLES.poolAll]: {
						value: [],
						id: state[REDUX_TABLES.poolAll].id,
					},
					[REDUX_TABLES.libraryAll]: {
						value: [],
						id: state[REDUX_TABLES.libraryAll].id,
					},
					[REDUX_TABLES.libraryBookmarks]: {
						value: [],
						id: state[REDUX_TABLES.libraryBookmarks].id,
					},
				}
			);
		default:
			return state;
	}
}

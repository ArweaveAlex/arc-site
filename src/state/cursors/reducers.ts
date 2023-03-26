<<<<<<< HEAD
import { REDUX_TABLES } from 'helpers/redux';
import { CursorEnum, CursorObjectKeyType, ReduxActionType } from 'helpers/types';
=======
import { CursorEnum, CursorObjectKeyType } from 'arcframework';

import { REDUX_TABLES } from 'helpers/redux';
import { ReduxActionType } from 'helpers/types';
>>>>>>> dev

import { CLEAR_CURSORS, SET_CURSORS } from './constants';
import { CursorsType } from './types';

export const initStateCursors: CursorsType = {
	gql: {
		[REDUX_TABLES.accountAll]: {
			previous: null,
			next: null,
			cursors: [],
		},
		[REDUX_TABLES.accountBookmarks]: {
			previous: null,
			next: null,
			cursors: [],
		},
		[REDUX_TABLES.poolAll]: {
			previous: null,
			next: null,
			cursors: [],
		},
		[REDUX_TABLES.libraryAll]: {
			previous: null,
			next: null,
			cursors: [],
		},
		[REDUX_TABLES.libraryBookmarks]: {
			previous: null,
			next: null,
			cursors: [],
		},
	},
	search: {
		[REDUX_TABLES.accountAll]: {
			previous: null,
			next: null,
			cursors: [],
		},
		[REDUX_TABLES.accountBookmarks]: {
			previous: null,
			next: null,
			cursors: [],
		},
		[REDUX_TABLES.poolAll]: {
			previous: null,
			next: null,
			cursors: [],
		},
		[REDUX_TABLES.libraryAll]: {
			previous: null,
			next: null,
			cursors: [],
		},
		[REDUX_TABLES.libraryBookmarks]: {
			previous: null,
			next: null,
			cursors: [],
		},
	},
};

function checkPayload(payload: any, objectKey: CursorObjectKeyType, reduxCursor: string) {
	if (!payload[objectKey]) {
		return false;
	} else {
		if (payload[objectKey][reduxCursor]) {
			return true;
		} else {
			return false;
		}
	}
}

export function cursorsReducer(state: CursorsType = initStateCursors, action: ReduxActionType) {
	switch (action.type) {
		case SET_CURSORS:
			return Object.assign({}, state, {
				gql: {
					[REDUX_TABLES.accountAll]: checkPayload(action.payload, CursorEnum.GQL, REDUX_TABLES.accountAll)
						? action.payload.gql[REDUX_TABLES.accountAll]
						: state.gql[REDUX_TABLES.accountAll],
					[REDUX_TABLES.accountBookmarks]: checkPayload(action.payload, CursorEnum.GQL, REDUX_TABLES.accountBookmarks)
						? action.payload.gql[REDUX_TABLES.accountBookmarks]
						: state.gql[REDUX_TABLES.accountBookmarks],
					[REDUX_TABLES.poolAll]: checkPayload(action.payload, CursorEnum.GQL, REDUX_TABLES.poolAll)
						? action.payload.gql[REDUX_TABLES.poolAll]
						: state.gql[REDUX_TABLES.poolAll],
					[REDUX_TABLES.libraryAll]: checkPayload(action.payload, CursorEnum.GQL, REDUX_TABLES.libraryAll)
						? action.payload.gql[REDUX_TABLES.libraryAll]
						: state.gql[REDUX_TABLES.libraryAll],
					[REDUX_TABLES.libraryBookmarks]: checkPayload(action.payload, CursorEnum.GQL, REDUX_TABLES.libraryBookmarks)
						? action.payload.gql[REDUX_TABLES.libraryBookmarks]
						: state.gql[REDUX_TABLES.libraryBookmarks],
				},
				search: {
					[REDUX_TABLES.accountAll]: checkPayload(action.payload, CursorEnum.Search, REDUX_TABLES.accountAll)
						? action.payload.search[REDUX_TABLES.accountAll]
						: state.search[REDUX_TABLES.accountAll],
					[REDUX_TABLES.accountBookmarks]: checkPayload(
						action.payload,
						CursorEnum.Search,
						REDUX_TABLES.accountBookmarks
					)
						? action.payload.search[REDUX_TABLES.accountBookmarks]
						: state.search[REDUX_TABLES.accountBookmarks],
					[REDUX_TABLES.poolAll]: checkPayload(action.payload, CursorEnum.Search, REDUX_TABLES.poolAll)
						? action.payload.search[REDUX_TABLES.poolAll]
						: state.search[REDUX_TABLES.poolAll],
					[REDUX_TABLES.libraryAll]: checkPayload(action.payload, CursorEnum.Search, REDUX_TABLES.libraryAll)
						? action.payload.search[REDUX_TABLES.libraryAll]
						: state.search[REDUX_TABLES.libraryAll],
					[REDUX_TABLES.libraryBookmarks]: checkPayload(
						action.payload,
						CursorEnum.Search,
						REDUX_TABLES.libraryBookmarks
					)
						? action.payload.search[REDUX_TABLES.libraryBookmarks]
						: state.search[REDUX_TABLES.libraryBookmarks],
				},
			});
		case CLEAR_CURSORS:
			return Object.assign(
				{},
				{
					gql: {
						[REDUX_TABLES.accountAll]: {
							previous: null,
							next: null,
							cursors: [],
						},
						[REDUX_TABLES.accountBookmarks]: {
							previous: null,
							next: null,
							cursors: [],
						},
						[REDUX_TABLES.poolAll]: {
							previous: null,
							next: null,
							cursors: [],
						},
						[REDUX_TABLES.libraryAll]: {
							previous: null,
							next: null,
							cursors: [],
						},
						[REDUX_TABLES.libraryBookmarks]: {
							previous: null,
							next: null,
							cursors: [],
						},
					},
					search: {
						[REDUX_TABLES.accountAll]: {
							previous: null,
							next: null,
							cursors: [],
						},
						[REDUX_TABLES.accountBookmarks]: {
							previous: null,
							next: null,
							cursors: [],
						},
						[REDUX_TABLES.poolAll]: {
							previous: null,
							next: null,
							cursors: [],
						},
						[REDUX_TABLES.libraryAll]: {
							previous: null,
							next: null,
							cursors: [],
						},
						[REDUX_TABLES.libraryBookmarks]: {
							previous: null,
							next: null,
							cursors: [],
						},
					},
				}
			);
		default:
			return state;
	}
}

<<<<<<< HEAD
import { ArweaveClient } from 'clients/arweave';
import { CURSORS, PAGINATOR, SEARCH } from 'helpers/config';
import { CursorEnum, CursorObjectKeyType, GQLResponseType, TagFilterType } from 'helpers/types';
import { checkGqlCursor, unquoteJsonKeys } from 'helpers/utils';
import * as cursorActions from 'state/cursors/actions';
import { store } from 'state/store';

export async function getGQLData(args: {
	ids: string[] | null;
	tagFilters: TagFilterType[] | null;
	uploader: string | null;
	cursor: string | null;
	reduxCursor: string | null;
	cursorObject: CursorObjectKeyType;
}): Promise<GQLResponseType[]> {
	let nextCursor: string | null;
	const arClient = new ArweaveClient();
	const data: GQLResponseType[] = [];
=======
import * as ArcFramework from 'arcframework';

import * as artifactActions from 'state/artifacts/actions';
import * as cursorActions from 'state/cursors/actions';
import { store } from 'state/store';

export async function getArtifactsByPool(
	args: ArcFramework.ArtifactArgsType
): Promise<ArcFramework.ArtifactResponseType> {
	return getArtifactsResponseObject(args, await ArcFramework.getArtifactsByPool(args), ArcFramework.CursorEnum.GQL);
}

export async function getArtifactsByUser(
	args: ArcFramework.ArtifactArgsType
): Promise<ArcFramework.ArtifactResponseType> {
	return getArtifactsResponseObject(args, await ArcFramework.getArtifactsByUser(args), ArcFramework.CursorEnum.GQL);
}
>>>>>>> dev

export async function getArtifactsByIds(
	args: ArcFramework.ArtifactArgsType
): Promise<ArcFramework.ArtifactResponseType> {
	return getArtifactsResponseObject(args, await ArcFramework.getArtifactsByIds(args), ArcFramework.CursorEnum.Search);
}

export async function getArtifactsByBookmarks(
	args: ArcFramework.ArtifactArgsType
): Promise<ArcFramework.ArtifactResponseType> {
	let bookmarkIds: string[];
	const bookmarksReducer = store.getState().bookmarksReducer;

	if (bookmarksReducer.owner === args.owner) {
		bookmarkIds = bookmarksReducer.ids;
	} else {
		if (args.owner) {
			bookmarkIds = await ArcFramework.getBookmarkIds(args.owner);
		} else {
			bookmarkIds = [];
		}
	}

	const reduxArgs = {
		ids: bookmarkIds,
		owner: args.owner,
		uploader: args.uploader,
		cursor: args.cursor,
		reduxCursor: args.reduxCursor,
	};
	return getArtifactsResponseObject(
		reduxArgs,
		await ArcFramework.getArtifactsByBookmarks(reduxArgs),
		ArcFramework.CursorEnum.GQL
	);
}

export async function setBookmarkIds(owner: string, ids: string[]): Promise<ArcFramework.NotificationResponseType> {
	const response = await ArcFramework.setBookmarkIds(owner, ids);
	if (response.status === 200) {
		store.dispatch(
			artifactActions.setBookmarks({
				owner: owner,
				ids: ids,
			})
		);
	}
	return response;
}

function getArtifactsResponseObject(
	args: ArcFramework.ArtifactArgsType,
	artifactsResponse: ArcFramework.ArtifactResponseType,
	cursorObject: ArcFramework.CursorEnum.GQL | ArcFramework.CursorEnum.Search
): ArcFramework.ArtifactResponseType {
	handleCursors(args.cursor, args.reduxCursor, cursorObject, artifactsResponse.nextCursor);

	let cursorState: any;
	if (args.reduxCursor) {
		cursorState = store.getState().cursorsReducer[cursorObject][args.reduxCursor];
	}

	let nextCursor: string | null = cursorState ? cursorState.next : null;
	let previousCursor: string | null = cursorState ? cursorState.previous : null;

	return {
		nextCursor: nextCursor,
		previousCursor: previousCursor,
		contracts: artifactsResponse.contracts,
	};
}

function handleCursors(
	cursor: string | null,
	reduxCursor: string | null,
	cursorObject: ArcFramework.CursorObjectKeyType,
	nextCursor: string | null
) {
	let cursorState: any;
	let cursorList: (string | null)[] = [];

	if (reduxCursor && cursorObject && store.getState().cursorsReducer[cursorObject][reduxCursor]) {
		cursorState = store.getState().cursorsReducer[cursorObject][reduxCursor];
		cursorList = [...cursorState.cursors];
	}

	if (reduxCursor && cursorState) {
		let nextCount = 0;
		let tempCursorList = [];

		if (nextCursor && cursorList[cursorList.length - 1] !== nextCursor) cursorList.push(nextCursor);

		if (cursorList.length >= 3) {
			for (let i = 0; i < cursorList.length; i++) {
				if (nextCursor) {
					tempCursorList[i] = cursorList[i];
					if (cursorList[i] === nextCursor) {
						nextCount++;
					}
				}
			}

			if (nextCount > 1) {
				cursorList = [...tempCursorList].slice(0, tempCursorList.length - 2);
			} else {
				cursorList = [...tempCursorList];
			}

			let previousCount = 3;

			cursorState.next = cursorList[cursorList.length - 1];
			cursorState.previous = cursorList[cursorList.length - previousCount];
		} else {
			if (cursorList.length === 1) {
				cursorState.next = cursorList[0];
				cursorState.previous = null;
			}
			if (cursorList.length === 2) {
				cursorState.next = cursorList[1];
				cursorState.previous = ArcFramework.CURSORS.p1;
				tempCursorList.push(cursorState.previous);
				for (let i = 0; i < cursorList.length; i++) {
					tempCursorList[i + 1] = cursorList[i];
				}
				cursorList = [...tempCursorList];
			}
		}

		if (cursor) {
			if (cursor === ArcFramework.CURSORS.p1) {
				cursorState.next = nextCursor;
				cursorState.previous = null;
				cursorList = [nextCursor];
			}
		}

		if (cursorObject) {
			cursorState.cursors = cursorList;
			store.dispatch(
				cursorActions.setCursors({
					[cursorObject]: { [reduxCursor]: cursorState },
				})
			);
		}
	}
}

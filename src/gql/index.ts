import { store } from 'store';
import * as cursorActions from 'store/cursors/actions';

import { CURSORS, GATEWAYS, PAGINATORS } from 'helpers/config';
import { AGQLResponseType, CursorObjectKeyType, GQLArgsType, GQLNodeResponseType } from 'helpers/types';

export async function getGQLData(args: GQLArgsType): Promise<AGQLResponseType> {
	const paginator = args.paginator ? args.paginator : PAGINATORS.default;

	let data: GQLNodeResponseType[] = [];
	let count: number = 0;
	let nextCursor: string | null = null;

	if (args.ids && !args.ids.length) {
		return { data: data, count: count, nextCursor: nextCursor, previousCursor: null };
	}

	try {
		const response = await fetch(`https://${args.gateway}/graphql`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: getQuery(args),
		});
		const responseJson = await response.json();
		if (responseJson.data && responseJson.data.transactions && responseJson.data.transactions.edges.length) {
			data = [...responseJson.data.transactions.edges];
			count = responseJson.data.transactions.count ?? 0;

			const lastResults: boolean = data.length < paginator || !responseJson.data.transactions.pageInfo.hasNextPage;

			if (lastResults) nextCursor = CURSORS.end;
			else nextCursor = data[data.length - 1].cursor;

			return getGQLResponseObject(args, {
				data: data,
				count: count,
				nextCursor: nextCursor,
				previousCursor: null,
			});
		} else {
			return { data: data, count: count, nextCursor: nextCursor, previousCursor: null };
		}
	} catch (e: any) {
		console.error(e);
		return { data: data, count: count, nextCursor: nextCursor, previousCursor: null };
	}
}

function getQuery(args: GQLArgsType): string {
	const paginator = args.paginator ? args.paginator : PAGINATORS.default;
	const ids = args.ids ? JSON.stringify(args.ids) : null;
	const tagFilters = args.tagFilters
		? JSON.stringify(args.tagFilters)
				.replace(/"([^"]+)":/g, '$1:')
				.replace(/"FUZZY_OR"/g, 'FUZZY_OR')
		: null;
	const owners = args.owners ? JSON.stringify(args.owners) : null;
	const cursor = args.cursor && args.cursor !== CURSORS.end ? `"${args.cursor}"` : null;

	let fetchCount: string = `first: ${paginator}`;
	let txCount: string = '';
	let nodeFields: string = `data { size type } owner { address } block { height timestamp }`;
	let order: string = '';

	switch (args.gateway) {
		case GATEWAYS.arweave:
			break;
		case GATEWAYS.goldsky:
			txCount = args.cursor ? '' : 'count';
			break;
	}

	const query = {
		query: `
                query {
                    transactions(
                        ids: ${ids},
                        tags: ${tagFilters},
						${fetchCount}
                        owners: ${owners},
                        after: ${cursor},
						${order}
						
                    ){
					${txCount}
					pageInfo {
						hasNextPage
					}
                    edges {
                        cursor
                        node {
                            id
                            tags {
                                name 
                                value 
                            }
							${nodeFields}
                        }
                    }
                }
            }
        `,
	};

	return JSON.stringify(query);
}

export function getGQLResponseObject(args: GQLArgsType, gqlResponse: AGQLResponseType): AGQLResponseType {
	handleCursors(args.cursor, args.reduxCursor, args.cursorObjectKey, gqlResponse.nextCursor);

	let cursorState: any;
	if (args.reduxCursor) {
		cursorState = store.getState().cursorsReducer[args.cursorObjectKey][args.reduxCursor];
	}

	let nextCursor: string | null = cursorState ? cursorState.next : null;
	let previousCursor: string | null = cursorState ? cursorState.previous : null;

	return {
		data: gqlResponse.data,
		count: gqlResponse.count,
		nextCursor: nextCursor,
		previousCursor: previousCursor,
	};
}

export function handleCursors(
	cursor: string | null,
	reduxCursor: string | null,
	cursorObjectKey: CursorObjectKeyType,
	nextCursor: string | null
) {
	let cursorState: any;
	let cursorList: (string | null)[] = [];

	if (reduxCursor && cursorObjectKey && store.getState().cursorsReducer[cursorObjectKey][reduxCursor]) {
		cursorState = store.getState().cursorsReducer[cursorObjectKey][reduxCursor];
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
				cursorState.previous = CURSORS.p1;
				tempCursorList.push(cursorState.previous);
				for (let i = 0; i < cursorList.length; i++) {
					tempCursorList[i + 1] = cursorList[i];
				}
				cursorList = [...tempCursorList];
			}
		}

		if (cursor) {
			if (cursor === CURSORS.p1) {
				cursorState.next = nextCursor;
				cursorState.previous = null;
				cursorList = [nextCursor];
			}
		}

		if (cursorObjectKey) {
			cursorState.cursors = cursorList;
			store.dispatch(
				cursorActions.setCursors({
					[cursorObjectKey]: { [reduxCursor]: cursorState },
				})
			);
		}
	}
}

export * from './artifacts';
export * from './profiles';
export * from './search';

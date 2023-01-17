import * as cursorActions from "redux/cursors/actions";
import { store } from "redux/store";

import { ArweaveClient } from "clients/arweave";
import { unquoteJsonKeys, checkGqlCursor } from "helpers/utils";
import { CURSORS, PAGINATOR, SEARCH } from "helpers/config";
import {
    GQLResponseType,
    TagFilterType,
    CursorObjectKeyType,
    CursorEnum
} from "helpers/types";

export async function getGQLData(args: {
    ids: string[] | null;
    tagFilters: TagFilterType[] | null,
    uploader: string | null,
    cursor: string | null,
    reduxCursor: string | null,
    cursorObject: CursorObjectKeyType
}): Promise<GQLResponseType[]> {

    let nextCursor: string | null;
    const arClient = new ArweaveClient();
    const data: GQLResponseType[] = [];

    if (args.ids && args.ids.length <= 0) {
        return data;
    }

    let ids = args.ids ? JSON.stringify(args.ids) : null;
    let tags = args.tagFilters ? unquoteJsonKeys(args.tagFilters) : null;
    let owners = args.uploader ? JSON.stringify([args.uploader]) : null;

    let cursor = args.cursor ? `"${args.cursor}"` : null;

    if (args.reduxCursor && args.cursorObject && args.cursorObject === CursorEnum.Search) {
        let i: number;
        let cursor: string;
        
        if (args.cursor && (args.cursor !== CURSORS.p1 && args.cursor !== CURSORS.end && !checkGqlCursor(args.cursor))) {
            i = Number(args.cursor.slice(-1));
            cursor = args.cursor;
        }
        else {
            i = 0;
            cursor = `${SEARCH.cursorPrefix}-${i}`;
        }

        if (store.getState().searchIdsReducer[args.reduxCursor][i]) {
            ids = JSON.stringify(store.getState().searchIdsReducer[args.reduxCursor][i][cursor]);
            nextCursor = JSON.parse(ids).length < PAGINATOR ? CURSORS.end : `${SEARCH.cursorPrefix}-${++i}`;
        }
    }

    const operation = {
        query: `
                query {
                    transactions(
                        ids: ${ids},
                        tags: ${tags},
                        owners: ${owners},
                        first: ${PAGINATOR}, 
                        after: ${cursor}
                    ){
                    edges {
                        cursor
                        node {
                            id
                            tags {
                                name 
                                value 
                            }
                            data {
                                size
                                type
                            }
                        }
                    }
                }
            }
        `
    }

    const response = await arClient.arweaveGet.api.post("/graphql", operation);
    if (response.data.data) {
        const responseData = response.data.data.transactions.edges;
        if (responseData.length > 0) {
            data.push(...responseData);
            if (args.cursorObject && args.cursorObject === CursorEnum.GQL) {
                if (responseData.length < PAGINATOR) {
                    nextCursor = CURSORS.end;
                }
                else {
                    nextCursor = responseData[responseData.length - 1].cursor;
                }
            }
        }
    }

    handleCursors(args.cursor, args.reduxCursor, args.cursorObject, nextCursor);

    return data;
}

function handleCursors(
    cursor: string | null,
    reduxCursor: string | null,
    cursorObject: CursorObjectKeyType,
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

        if (nextCursor && (cursorList[cursorList.length - 1] !== nextCursor)) cursorList.push(nextCursor);

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
            }
            else {
                cursorList = [...tempCursorList];
            }

            let previousCount = 3;

            cursorState.next = cursorList[cursorList.length - 1];
            cursorState.previous = cursorList[cursorList.length - previousCount];
        }

        else {
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

        if (cursorObject) {
            cursorState.cursors = cursorList;
            store.dispatch(cursorActions.setCursors({ [cursorObject]: { [reduxCursor]: cursorState } }));
        }
    }
}
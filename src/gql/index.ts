import * as cursorActions from "redux/cursors/actions";
import { store } from "redux/store";

import { ArweaveClient } from "arweave-client";
import { unquoteJsonKeys } from "utils";
import { GQLResponseType, TagFilterType } from "types";
import { PAGINATOR } from "config";

export async function getGQLData(args: {
    ids: string[] | null;
    tagFilters: TagFilterType[] | null,
    uploader: string | null,
    cursor: string | null,
    reduxCursor: string | null
}): Promise<GQLResponseType[]> {

    let nextCursor;
    const arClient = new ArweaveClient();
    const data: GQLResponseType[] = [];

    if (args.ids && args.ids.length <= 0) {
        return data;
    }

    const ids = args.ids ? JSON.stringify(args.ids) : null;
    const tags = args.tagFilters ? unquoteJsonKeys(args.tagFilters) : null;
    const owners = args.uploader ? JSON.stringify([args.uploader]) : null;

    const operation = {
        query: `
            query {
                    transactions(
                        ids: ${ids},
                        tags: ${tags},
                        owners: ${owners},
                        first: ${PAGINATOR}, 
                        after: ${args.cursor}
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
            nextCursor = responseData[responseData.length - 1].cursor;
            data.push(...responseData);
        }
    }

    handleCursors(args.cursor, nextCursor, args.reduxCursor);

    return data;
}

function handleCursors(cursor: string | null, nextCursor: string | null, reduxCursor: string | null) {
    let cursorState;
    let cursorList: (string | null)[] = [];

    if (reduxCursor && store.getState().cursorsReducer[reduxCursor]) {
        cursorState = store.getState().cursorsReducer[reduxCursor];
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
            cursorState.next = cursorList[cursorList.length - 1];
            cursorState.previous = cursorList[cursorList.length - 3];
        }

        else {
            if (cursorList.length === 1) {
                cursorState.next = cursorList[0];
                cursorState.previous = null;
            }
            if (cursorList.length === 2) {
                cursorState.next = cursorList[1];
                cursorState.previous = "PAGE_ONE";
                tempCursorList.push(cursorState.previous);
                for (let i = 0; i < cursorList.length; i++) {
                    tempCursorList[i + 1] = cursorList[i];
                }
                cursorList = [...tempCursorList];
            }
        }

        if (cursor) {
            if (cursor === "PAGE_ONE") {
                cursorState.next = nextCursor;
                cursorState.previous = null;
                cursorList = [nextCursor];
            }
        }

        cursorState.cursors = cursorList;
        store.dispatch(cursorActions.setCursors({ [reduxCursor]: cursorState }));
    }

}
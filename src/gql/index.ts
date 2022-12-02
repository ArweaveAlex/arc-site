import * as gql from "gql-query-builder";
import * as cursorActions from "redux/cursors/actions";
import { store } from "redux/store";

import { ArweaveClient } from "arweave-client";
import { GQLResponseType, TagFilterType } from "types";
import { PAGINATOR } from "config";

export async function getDataByTags(args: {
    tagFilters: TagFilterType[],
    cursor: string | null,
    reduxCursor: string | null
}): Promise<GQLResponseType[]> {
    const arClient = new ArweaveClient();

    const data: GQLResponseType[] = [];

    let nextCursor;
    let cursorState;
    let cursorList: (string | null)[] = [];

    if (args.reduxCursor && store.getState().cursorsReducer[args.reduxCursor]) {
        cursorState = store.getState().cursorsReducer[args.reduxCursor];
        cursorList = [...cursorState.cursors];
    }

    const query = (cursor: string) => gql.query({
        operation: "transactions",
        variables: {
            tags: {
                value: args.tagFilters,
                type: "[TagFilter!]"
            },
            first: PAGINATOR,
            after: cursor
        },
        fields: [
            {
                edges: [
                    "cursor",
                    {
                        node: [
                            "id",
                            {
                                "tags": [
                                    "name",
                                    "value"
                                ],
                                "data": [
                                    "size",
                                    "type"
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })

    const response: any = await arClient.arweaveGet.api.post("/graphql", query(args.cursor ? args.cursor : ""));
    if (response.data.data) {
        const responseData = response.data.data.transactions.edges;
        if (responseData.length > 0) {
            if (args.reduxCursor && cursorState) {
                nextCursor = responseData[responseData.length - 1].cursor;
                cursorList.push(nextCursor);
            }
            data.push(...responseData);
        }
    }

    if (args.reduxCursor && cursorState) {
        let tempCursorList = [];
        let nextCount = 0;

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

        if (args.cursor) {
            if (args.cursor === "PAGE_ONE") {
                cursorState.next = nextCursor;
                cursorState.previous = null;
                cursorList = [nextCursor];
            }
        }

        cursorState.cursors = cursorList;

        store.dispatch(cursorActions.setCursors({ [args.reduxCursor]: cursorState }));
    }

    return data;
}

export async function getDataByTxIds(txIds: string[]): Promise<GQLResponseType[]> {
    const arClient = new ArweaveClient();

    const data: GQLResponseType[] = [];
    let cursor: string | null = null;

    if (txIds.length > 0) {
        const operation = {
            operationName: null,
            query: `
                    {\n  
                        transactions(ids: ${JSON.stringify(txIds)}, first: ${PAGINATOR}, after: ${cursor}) 
                        {\n    
                            edges {\n      
                                node {\n        
                                    id\n        
                                    tags {\n          
                                        name\n          
                                        value\n        }\n        
                                        data {\n          
                                            size\n          
                                            type\n        
                                        }\n      
                                    }\n    
                                }\n  
                        }\n
                    }\n
                `
        }

        const response = await arClient.arweaveGet.api.post("/graphql", operation);

        if (response.data.data) {
            const responseData = response.data.data.transactions.edges;
            if (responseData.length > 0) {
                cursor = responseData[responseData.length - 1].cursor;
                data.push(...responseData);
                if (responseData.length < PAGINATOR) {
                    cursor = null;
                }
            }
            else {
                cursor = null;
            }
        }
    }

    return data;
}
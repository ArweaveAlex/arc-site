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

    let cursorState: any;
    if (args.reduxCursor && store.getState().cursorsReducer[args.reduxCursor]) {
        cursorState = store.getState().cursorsReducer[args.reduxCursor];
        const currentCursor = cursorState.current;
        
        if (args.cursor) {
            cursorState.previous = currentCursor;
            cursorState.current = args.cursor;
        }
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
            if (cursorState) {
                cursorState.next = responseData[responseData.length - 1].cursor;
            }
            data.push(...responseData);
            if ((responseData.length < PAGINATOR) && cursorState) {
                cursorState.next = null;
            }
        }
        else {
            if (cursorState) {
                cursorState.next = null;
            }
        }
    }

    if (args.reduxCursor && cursorState) {
        store.dispatch(cursorActions.setCursors( {[args.reduxCursor]: cursorState }));
    }

    return data;
}

export async function getDataByTxIds(txIds: string[]): Promise<GQLResponseType[]> {
    const arClient = new ArweaveClient();

    const data: GQLResponseType[] = [];
    let cursor: string | null = null;

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

    return data;
}
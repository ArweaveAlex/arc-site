import * as gql from "gql-query-builder";

import { store } from "redux/store";
import * as actions from "redux/artifacts/actions";
import { arweave } from "providers/ARProvider";
import { ArtifactQueryType, ArtifactResponseType } from "types";
import { getTagValue } from "utils";
import { TAGS, PAGINATOR, STORAGE } from "config";

export async function getBookmarks(owner: string): Promise<string[]> {
    const aggregatedBookmarks: any = [];
    let cursor: string | null = "";

    const query = (cursor: string) => gql.query({
        operation: "transactions",
        variables: {
            tags: {
                value: {
                    name: TAGS.keys.bookmarkSearch,
                    values: [owner]
                },
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
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })

    while (cursor !== null) {
        const response: any = await arweave.api.post("/graphql", query(cursor));
        if (response.data.data) {
            const responseData = response.data.data.transactions.edges;
            if (responseData.length > 0) {
                cursor = responseData[responseData.length - 1].cursor;
                aggregatedBookmarks.push(...responseData);
                if (responseData.length < PAGINATOR) {
                    cursor = null;
                }
            }
            else {
                cursor = null;
            }
        }
        else {
            cursor = null;
        }
    }

    if (aggregatedBookmarks.length > 0) {
        let recentDate = Number(getTagValue(aggregatedBookmarks[0].node.tags, TAGS.keys.dateCreated)!)

        for (let i = 0; i < aggregatedBookmarks.length; i++) {
            const date = Number(getTagValue(aggregatedBookmarks[i].node.tags, TAGS.keys.dateCreated)!);
            recentDate = Math.max(recentDate, date)
        }

        for (let i = 0; i < aggregatedBookmarks.length; i++) {
            if (recentDate === Number(getTagValue(aggregatedBookmarks[i].node.tags, TAGS.keys.dateCreated)!)) {
                return JSON.parse(getTagValue(aggregatedBookmarks[i].node.tags, TAGS.keys.bookmarkIds)!)
            }
        }

        return [];
    }
    else {
        return [];
    }
}

export async function setBookmarks(owner: string, ids: string[]): Promise<void> {
    // TODO - setTxPending --> disable Update Bookmarks if (txPending - txRes Id)

    store.dispatch(actions.setBookmarks({
        owner: owner,
        ids: ids
    }));

    let txRes = await arweave.createTransaction({ data: JSON.stringify(ids) }, "use_wallet");
    txRes.addTag(TAGS.keys.bookmarkSearch, owner);
    txRes.addTag(TAGS.keys.dateCreated, Date.now().toString());
    txRes.addTag(TAGS.keys.bookmarkIds, JSON.stringify(ids));

    try {
        await arweave.transactions.sign(txRes, "use_wallet");
    }
    catch (e) {
        console.log(e)
    }

    await arweave.transactions.post(txRes);
}

export async function getArtifactsByBookmarks(owner: string, cursor: string | null): Promise<ArtifactResponseType> {
    const bookmarksReducer = store.getState().bookmarksReducer;
    let bookmarkIds: string[];

    if (bookmarksReducer.owner === owner) {
        bookmarkIds = bookmarksReducer.ids;
    }
    else {
        bookmarkIds = await getBookmarks(owner);
    }

    const aggregatedArtifacts: any = [];

    const operation = {
        operationName: null,
        query: `
                {\n  
                    transactions(ids: ${JSON.stringify(bookmarkIds)}) 
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
            `,
        variables: {
            first: PAGINATOR,
            after: cursor ? cursor : ""
        }
    }

    const response = await arweave.api.post("/graphql", operation);

    if (response.data.data) {
        const responseData = response.data.data.transactions.edges;
        if (responseData.length > 0) {
            cursor = responseData[responseData.length - 1].cursor;
            aggregatedArtifacts.push(...responseData);
            if (responseData.length < PAGINATOR) {
                cursor = null;
            }
        }
        else {
            cursor = null;
        }
    }

    let count = aggregatedArtifacts.length;

    return ({
        nextCursor: cursor,
        previousCursor: cursor,
        contracts: aggregatedArtifacts.filter(
            (element: ArtifactQueryType) => getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none),
        count: count
    })
}
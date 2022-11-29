import * as gql from "gql-query-builder";

import { ArweaveClient } from "arweave-client";
import { GQLResponseType, TagFilterType } from "types";
import { PAGINATOR } from "config";

export async function getDataByTags(tagFilters: TagFilterType[]): Promise<GQLResponseType[]> {
    const arClient = new ArweaveClient();

    const data: GQLResponseType[] = [];
    let cursor: string | null = "";

    const query = (cursor: string) => gql.query({
        operation: "transactions",
        variables: {
            tags: {
                value: tagFilters,
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

    const response: any = await arClient.arweave.api.post("/graphql", query(cursor));
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

    const response = await arClient.arweave.api.post("/graphql", operation);

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
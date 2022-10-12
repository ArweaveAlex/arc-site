import React, { useEffect } from "react";

import Arweave from 'arweave';

// import { query as Query } from "gql-query-builder";

import { Table } from "@/components/organisms/Table";

import { LANGUAGE } from "@/language"

import { MOCK_DATA_DETAIL } from "@/mock-data";

// import { useARProvder } from "@/providers/ARProvider";
import { ArweaveCollectionProps } from "@/types";

import * as gql from 'gql-query-builder'



// console.log(query)

// // Output
// query ($id: Int) {
//   thought (id: $id) {
//     id, name, thought
//   }
// }

// // Variables
// { "id": 1 }

export default function CollectionDetail(props: { collectionData: ArweaveCollectionProps }) {
    // const arProvider = useARProvder();
    const data = MOCK_DATA_DETAIL;

    const header = {
        title: { width: "77.5%" },
        dateCreated: { width: "22.5%" }
    };

    const arweave: any = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
        timeout: 40000,
        logging: false,
    });

// const query = gql.query({
//   operation: 'thought',
//   variables: { id: 1 },
//   fields: ['id', 'name', 'thought']
// })

    async function getAllArtefactsByPool(arweave: Arweave, pool: string) {
        const query = gql.query({
            operation: "transactions",
            variables: {
                tags: {
                    value: {
                        name: "Pool-Id",
                        values: [pool]
                    },
                    type: "[TagFilter!]"
                }
            },
            fields: [
                {
                    edges: [
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

        const result = await arweave.api.post("/graphql", query);
        return result.data.data.transactions.edges.map((node: any) => {
            return node
        })
    }

    useEffect(() => {
        getAllArtefactsByPool(arweave, props.collectionData.id).then((artefacts: any) => {
            console.log(artefacts);
        });
    });

    return (
        <Table
            title={LANGUAGE.artefacts}
            header={header}
            data={data}
            recordsPerPage={50}
        />
    )
}


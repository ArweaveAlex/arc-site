import React, { useEffect } from "react";

import Arweave from 'arweave';

import { query as Query } from "gql-query-builder";

import { Table } from "@/components/organisms/Table";

import { LANGUAGE } from "@/language"

import { MOCK_DATA_DETAIL } from "@/mock-data";

import { getAllArtefactsByPool } from "@alex/arc-funds";
import { useARProvder } from "@/providers/ARProvider";
import { ArweaveCollectionProps } from "@/types";

export default function CollectionDetail(props: { collectionData: ArweaveCollectionProps }) {
    const arProvider = useARProvder();
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

    async function getAllArtefactsByPool(arweave: Arweave, pool: string) {

        const query = Query({
    
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
                                "id"
                            ]
                        }
                    ]
                }
            ]
    
        })
        const res = await arweave.api.post("/graphql", query);
        return res.data.data.transactions.edges.map((node) => {
            return node.node.id
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


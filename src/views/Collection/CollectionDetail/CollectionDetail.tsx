import React  from "react";
import Arweave from "arweave";
import * as gql from "gql-query-builder";

import { Table } from "@/components/organisms/Table";

import { getTagValue } from "@/util";
import { LANGUAGE } from "@/language"

import { ArweaveCollectionProps } from "@/types";

export default function CollectionDetail(props: { collectionData: ArweaveCollectionProps }) {
    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        const arweave: any = Arweave.init({
            host: "arweave.net",
            port: 443,
            protocol: "https",
            timeout: 40000,
            logging: false,
        });
        
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
                    },
                    first: 1000
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

            setData((await arweave.api.post("/graphql", query)).data.data.transactions.edges.map((element: any) => {
                return { title: getTagValue(element.node.tags, "Artefact-Name"), dateCreated: getTagValue(element.node.tags, "Created-At") }
            }));
        }

        getAllArtefactsByPool(arweave, props.collectionData.id);
    }, [])

    const header = {
        title: { width: "77.5%" },
        dateCreated: { width: "22.5%" }
    };

    return data ? (
        <Table
            title={LANGUAGE.artefacts}
            header={header}
            data={data}
            recordsPerPage={50}
        />
    ) : <p>Loading Artifacts ...</p>
}


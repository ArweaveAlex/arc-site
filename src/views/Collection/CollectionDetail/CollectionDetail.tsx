import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { Table } from "@/components/organisms/Table";

import { getViewblockEndpoint } from "@/endpoints";
import { getTagValue, formatDate } from "@/util";
import { LANGUAGE } from "@/language"

import { ArweaveCollectionProps } from "@/types";

export default function CollectionDetail(props: { collectionData: ArweaveCollectionProps }) {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    function getViewblockLink(uploaderTxId: string | null, label: string | null) {
        if (!uploaderTxId || !label) {
            return <a target="_blank" href={"#"}></a>
        }
        return <a target="_blank" href={getViewblockEndpoint(uploaderTxId)}>{label}</a>
    }

    React.useEffect(() => {
        (async function () {
            setData((await arProvider.getAllArtefactsByPool(props.collectionData.id)).map((element: any) => {
                return { 
                    title: getViewblockLink(getTagValue(element.node.tags, "Uploader-Tx-Id"), getTagValue(element.node.tags, "Artefact-Name")), 
                    dateCreated: formatDate(getTagValue(element.node.tags, "Created-At"), "ts") 
                }
            }));
        })();
    }, [])

    return data ? (
        <Table
            title={LANGUAGE.artefacts}
            header={{
                title: { width: "77.5%" },
                dateCreated: { width: "22.5%" }
            }}
            data={data}
            recordsPerPage={50}
        />
    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}


import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { Table } from "@/components/organisms/Table";

import { getTagValue, formatDate } from "@/util";
import { LANGUAGE } from "@/language"

import { ArweaveCollectionProps } from "@/types";

export default function CollectionDetail(props: { collectionData: ArweaveCollectionProps }) {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        (async function () {
            console.log(await arProvider.getAllArtefactsByPool(props.collectionData.id))
            setData((await arProvider.getAllArtefactsByPool(props.collectionData.id)).map((element: any) => {
                return { title: getTagValue(element.node.tags, "Artefact-Name"), dateCreated: formatDate(getTagValue(element.node.tags, "Created-At"), "ts") }
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


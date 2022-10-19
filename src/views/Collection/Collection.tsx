import { useARProvder } from "@/providers/ARProvider";

import { ArweaveCollectionProps } from "@/types";

import { Loader } from "@/components/atoms/Loader";

import { CollectionHeader } from "./CollectionHeader";
import { CollectionDetail } from "./CollectionDetail";

// import { getViewblockEndpoint } from "@/endpoints";

import { getTxUrl, formatDate, getTagValue } from "@/util";
import * as S from "./styles";
import React from "react";

export default function _Collection(props: { data: ArweaveCollectionProps }) {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    // function getViewblockLink(uploaderTxId: string | null, label: string | null) {
    //     if (!uploaderTxId || !label) {
    //         return <a target="_blank" href={"#"}></a>
    //     }
    //     return <a target="_blank" href={getViewblockEndpoint(uploaderTxId)}>{label}</a>
    // }

    React.useEffect(() => {
        (async function () {
            setData((await arProvider.getAllArtifactsByPool(props.data.id)).map((element: any) => {
                console.log(element)
                return {
                    title: getTagValue(element.node.tags, "Artefact-Name"), 
                    dateCreated: formatDate(getTagValue(element.node.tags, "Created-At"), "epoch"),
                    id: element.node.id
                }
            }));
        })();
    }, [])
    
    return data ? (
        <S.Wrapper>
            <CollectionHeader
                id={props.data.id}
                image={getTxUrl(props.data.state.image)}
                title={props.data.state.title}
                description={props.data.state.description}
                dateCreated={formatDate(props.data.ts, "iso")}
                artifactCount={data ? data.length : 0}
                totalContributions={arProvider.getARAmount(props.data.state.totalContributions)}
            />
            <CollectionDetail artifactData={data}/>
        </S.Wrapper>
    ) : <Loader />
}
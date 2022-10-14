import { useARProvder } from "@/providers/ARProvider";

import { ArweaveCollectionProps } from "@/types";

import { CollectionHeader } from "./CollectionHeader";
import { CollectionDetail } from "./CollectionDetail";

import { getTxUrl, formatDate, getTagValue } from "@/util";
import * as S from "./styles";
import React from "react";
import { LANGUAGE } from "@/language";

export default function _Collection(props: { data: ArweaveCollectionProps }) {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        (async function () {
            setData((await arProvider.getAllArtefactsByPool(props.data.id)).map((element: any) => {
                return { 
                    // title: getViewblockLink(getTagValue(element.node.tags, "Uploader-Tx-Id"), getTagValue(element.node.tags, "Artefact-Name")), 
                    title: getTagValue(element.node.tags, "Artefact-Name"), 
                    dateCreated: formatDate(getTagValue(element.node.tags, "Created-At"), "ts") 
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
                artefactCount={data ? data.length : 0}
                totalContributions={arProvider.getARAmount(props.data.state.totalContributions)}
            />
            <CollectionDetail artefactData={data}/>
        </S.Wrapper>
    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}
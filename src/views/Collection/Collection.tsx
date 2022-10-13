import { useARProvder } from "@/providers/ARProvider";

import { ArweaveCollectionProps } from "@/types";

import { CollectionHeader } from "./CollectionHeader";
import { CollectionDetail } from "./CollectionDetail";

import { getTxUrl, formatDate } from "@/util";
import * as S from "./styles";

export default function _Collection(props: { data: ArweaveCollectionProps }) {
    const arProvider = useARProvder();
    
    return (
        <S.Wrapper>
            <CollectionHeader
                id={props.data.id}
                image={getTxUrl(props.data.state.image)}
                title={props.data.state.title}
                description={props.data.state.description}
                dateCreated={formatDate(props.data.ts, "iso")}
                artefactCount={props.data.artefacts}
                totalContributions={arProvider.getARAmount(props.data.state.totalContributions)}
            />
            <CollectionDetail collectionData={props.data}/>
        </S.Wrapper>
    )
}
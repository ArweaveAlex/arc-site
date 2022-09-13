import { ArweaveCollectionProps } from "@/types";

import { CollectionHeader } from "./CollectionHeader";

import * as S from "./styles";

export default function _Collection(props: { data: ArweaveCollectionProps }) {
    return (
        <S.Wrapper>
            <CollectionHeader
                id={props.data.id}
                image={props.data.state.image}
                title={props.data.state.title}
                artefactCount={props.data.artefacts}
                totalContributions={props.data.state.totalContributions}
            />
        </S.Wrapper>
    )
}
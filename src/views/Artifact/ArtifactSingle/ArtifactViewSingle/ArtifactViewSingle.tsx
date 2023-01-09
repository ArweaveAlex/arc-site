import { ArtifactMessagingSingle } from "./ArtifactMessagingSingle";
import { ArtifactWebpageSingle } from "./ArtifactWebpageSingle";

import { ArtifactEnum } from "config/types";
import { IProps } from "../types";
import * as S from "./styles";

export default function ArtifactViewSingle(props: IProps) {
    function getArtifact() {
        if (props.data) {
            switch (props.data.artifactType) {
                case ArtifactEnum.Messaging:
                    return <ArtifactMessagingSingle data={props.data} />
                case ArtifactEnum.Webpage:
                    return <ArtifactWebpageSingle data={props.data} />
                default:
                    return null
            }
        }
        else {
            return null;
        }
    }

    return (
        <S.Wrapper>
            {getArtifact()}
        </S.Wrapper>
    );
}
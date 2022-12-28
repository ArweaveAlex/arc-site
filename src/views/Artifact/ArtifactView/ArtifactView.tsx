import { ArtifactMessaging } from "./ArtifactMessaging";
import { ArtifactWebpage } from "./ArtifactWebpage";

import { ArtifactEnum } from "config/types";
import { IProps } from "../types";
import * as S from "./styles";

export default function ArtifactView(props: IProps) {
    function getArtifact() {
        if (props.data) {
            switch (props.data.artifactType) {
                case ArtifactEnum.Messaging:
                    return <ArtifactMessaging data={props.data} />
                case ArtifactEnum.Webpage:
                    return <ArtifactWebpage data={props.data} />
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
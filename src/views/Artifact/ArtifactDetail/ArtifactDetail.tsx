import { ArtifactMessaging } from "./ArtifactMessaging";
import { ArtifactWebpage } from "./ArtifactWebpage";

import { ArtifactEnum } from "@/types";
import { IProps } from "../types";
import * as S from "./styles";

export default function ArtifactDetail(props: IProps) {
    function getArtifact() {
        if (props.data) {
            switch (props.data.artifactType) {
                case ArtifactEnum.Messaging:
                    return <ArtifactMessaging data={props.data} />
                case ArtifactEnum.Webpage:
                    return <ArtifactWebpage data={props.data} />
                default:
                    try {
                        JSON.parse(props.data.rawData);
                        return <ArtifactMessaging data={props.data} />
                    }
                    catch (e) {
                        return <ArtifactWebpage data={props.data} />
                    }
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
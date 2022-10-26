import { ArtifactTweet } from "./ArtifactTweet";
import { ArtifactWiki } from "./ArtifactWiki";

import { ArtifactEnum } from "@/types";
import { IProps } from "../types";
import * as S from "./styles";

export default function ArtifactDetail(props: IProps) {
    function getArtifact() {
        if (props.data) {
            switch (props.data.artifactType) {
                case ArtifactEnum.Tweet:
                    return <ArtifactTweet data={props.data} />
                case ArtifactEnum.Wiki:
                    return <ArtifactWiki data={props.data} />
                default:
                    try {
                        JSON.parse(props.data.rawData);
                        return <ArtifactTweet data={props.data} />
                    }
                    catch (e) {
                        return <ArtifactWiki data={props.data} />
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
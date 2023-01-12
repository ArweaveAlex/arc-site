import { ArtifactMessagingList } from "./ArtifactMessagingList";

import { ArtifactEnum } from "helpers/types";
import { IProps } from "../types";
import * as S from "./styles";

export default function ArtifactViewList(props: IProps) {
    function getArtifact() {
        if (props.data && props.data.length > 0) {
            switch (props.data[0].artifactType) {
                case ArtifactEnum.Messaging:
                    return (
                        <ArtifactMessagingList 
                            data={props.data}
                            loading={props.loading}
                        />
                    )
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
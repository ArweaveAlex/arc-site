import React from "react";

import { ArtifactHeader } from "./ArtifactHeader";
import { ArtifactShare } from "./ArtifactShare";
import { ArtifactDetail } from "./ArtifactDetail";

import { IProps } from "./types";
import * as S from "./styles";

export default function _Artifact(props: IProps) {

    return (
        <S.Wrapper>
            <S.Content>
                <ArtifactHeader />
                <S.FlexWrapper>
                    {/* <ArtifactShare /> */}
                    <S.ArtifactWrapper>
                        <ArtifactDetail data={props.data}/>
                    </S.ArtifactWrapper>
                </S.FlexWrapper>
            </S.Content>
        </S.Wrapper>
    );
}
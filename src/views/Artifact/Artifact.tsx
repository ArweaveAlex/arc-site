import React from "react";

import { ArtifactHeader } from "./ArtifactHeader";
// import { ArtifactShare } from "./ArtifactShare";
import { ArtifactDetail } from "./ArtifactDetail";
import { ArtifactFile } from "./ArtifactFile";

import { ARTIFACT_TABS, TAB_OPTIONS } from "@/config";
import { IProps } from "./types";
import * as S from "./styles";

export default function _Artifact(props: IProps) {
    const [currentTab, setCurrentTab] = React.useState<string>(ARTIFACT_TABS[0]!.label);

    function handleTabClick(label: string) {
        setCurrentTab(label);
    }

    function getArtifact() {
        switch (currentTab) {
            case TAB_OPTIONS.file:
                return <ArtifactFile data={props.data} />
            case TAB_OPTIONS.artifactDetails:
                return <ArtifactDetail data={props.data} />
            default:
                return <ArtifactDetail data={props.data} />
        }
    }

    return (
        <S.Wrapper>
            <S.Content>
                <ArtifactHeader data={props.data} onTabPropClick={(label: string) => handleTabClick(label)} />
                <S.FlexWrapper>
                    {/* <ArtifactShare /> */}
                    <S.ArtifactWrapper>
                        {getArtifact()}
                    </S.ArtifactWrapper>
                </S.FlexWrapper>
            </S.Content>
        </S.Wrapper>
    );
}
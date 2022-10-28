import React from "react";
import { ReactSVG } from "react-svg";

import { ArtifactHeader } from "./ArtifactHeader";
// import { ArtifactShare } from "./ArtifactShare";
import { ArtifactDetail } from "./ArtifactDetail";
import { ArtifactView } from "./ArtifactView";

import { ARTIFACT_TABS, ARTIFACT_TYPES, TAB_OPTIONS, TAGS } from "@/config";
import { IProps } from "./types";
import * as S from "./styles";

export default function _Artifact(props: IProps) {
    const [currentTab, setCurrentTab] = React.useState<string>(ARTIFACT_TABS[0]!.label);

    function handleTabClick(label: string) {
        setCurrentTab(label);
    }

    function getArtifactType() {
        let artifactType = ARTIFACT_TYPES[props.data.artifactType];
        if (artifactType) {
            return artifactType;
        }
        else {
            return  ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
        }
    }

    function getArtifact() {
        switch (currentTab) {
            case TAB_OPTIONS.view:
                return <ArtifactView data={props.data} />
            case TAB_OPTIONS.details:
                return <ArtifactDetail data={props.data} type={getArtifactType()} />
            default:
                return <ArtifactDetail data={props.data} type={getArtifactType()} />
        }
    }

    return (
        <S.Wrapper>
            <S.Content>
                <ArtifactHeader data={props.data} type={getArtifactType()} onTabPropClick={(label: string) => handleTabClick(label)} />
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
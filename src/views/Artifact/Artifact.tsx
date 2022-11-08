import React from "react";
import { useParams } from "react-router-dom";

import { useARProvder } from "providers/ARProvider";

import { ArtifactHeader } from "./ArtifactHeader";
// import { ArtifactShare } from "./ArtifactShare";
import { ArtifactDetail } from "./ArtifactDetail";
import { ArtifactView } from "./ArtifactView";

import { Loader } from "components/atoms/Loader";

import * as window from "window";
import {
    ARTIFACT_TABS,
    ARTIFACT_TYPES,
    TAB_OPTIONS,
    TAGS
} from "config";
import { checkNullValues } from "utils";
import { ArtifactType } from "types";
import * as S from "./styles";
import { LANGUAGE } from "language";

export default function Artifact() {
    const { id } = useParams();

    const arProvider = useARProvder();

    const [data, setData] = React.useState<ArtifactType | null>(null);
    const [currentTab, setCurrentTab] = React.useState<string>(ARTIFACT_TABS[0]!.label);

    React.useEffect(() => {
        (async function () {
            window.scrollTo(0, 0);
            setData(await arProvider.getArtifactById(id!));
        })()
    }, [arProvider, id]);

    function handleTabClick(label: string) {
        setCurrentTab(label);
    }

    function getArtifactType() {
        if (data) {
            let artifactType = ARTIFACT_TYPES[data.artifactType];
            if (artifactType) {
                return artifactType;
            }
            else {
                return ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
            }
        }
        else {
            return null;
        }
    }

    function getArtifact() {
        if (data) {
            switch (currentTab) {
                case TAB_OPTIONS.view:
                    return <ArtifactView data={data} />
                case TAB_OPTIONS.details:
                    return <ArtifactDetail data={data} type={getArtifactType()} />
                default:
                    return <ArtifactDetail data={data} type={getArtifactType()} />
            }
        }
        else {
            return <Loader />;
        }
    }

    function validateData() {
        if (data) {
            return !checkNullValues(data);
        }
        else {
            return false;
        }
    }

    function getData() {
        if (validateData()) {
            return (
                <S.Wrapper>
                    <S.Content>
                        <ArtifactHeader data={data} type={getArtifactType()} onTabPropClick={(label: string) => handleTabClick(label)} />
                        <S.FlexWrapper>
                            <S.ArtifactWrapper>
                                {getArtifact()}
                            </S.ArtifactWrapper>
                        </S.FlexWrapper>
                    </S.Content>
                </S.Wrapper>
            )
        }
        else {
            return (
                <S.MessageContainer>
                    <p>{LANGUAGE.errorFetchingArtifact}</p>
                </S.MessageContainer>
            )
        }
    }

    return data ? <>{getData()}</> : <Loader /> ;
}

import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

import { getTagValue, formatArtifactType } from "helpers/utils";
import { GQLResponseType } from "helpers/types";
import { ARTIFACT_TYPES, TAGS } from "helpers/config";
import * as urls from "helpers/urls";
import { IProps } from "./types"
import * as S from "./styles";
import { LANGUAGE } from "helpers/language";

export default function PoolRecentlyMinted(props: IProps) {

    function getArtifactType(type: string) {
        let artifactType = ARTIFACT_TYPES[type];
        if (artifactType) {
            return artifactType;
        }
        else {
            return ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
        }
    }

    function getData() {
        if (props.data && props.data.contracts.length > 0) {
            return (
                <>
                    {props.data.contracts.map((element: GQLResponseType, index: number) => {
                        const type = getArtifactType(getTagValue(element.node.tags, TAGS.keys.artifactType));
                        return (
                            <S.NodeWrapper key={index}>
                                <Link to={`${urls.artifact}${element.node.id}`}>
                                    <S.TypeLabel>
                                        <p>{formatArtifactType(type.label)}</p>
                                    </S.TypeLabel>
                                    <S.Icon>
                                        <ReactSVG src={type.icon} />
                                    </S.Icon>
                                    <S.Info>
                                        <S.InfoTitle>
                                            <p>{getTagValue(element.node.tags, TAGS.keys.artifactName)}</p>
                                        </S.InfoTitle>
                                    </S.Info>
                                </Link>
                            </S.NodeWrapper>
                        )
                    })}
                </>
            )
        }
        else if (props.data && props.data.contracts.length <= 0) {
            return <p>{LANGUAGE.noArtifacts}</p>;
        }
        else {
            return (
                <>
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((element: number) => {
                        return (
                            <S.Placeholder key={element} />
                        )
                    })}
                </>
            )
        }
    }

    return (
        <S.Wrapper>
            <S.Header>
                <h2>{LANGUAGE.recentlyMintedArtifacts}</h2>
            </S.Header>
            <S.Body>
                {getData()}
            </S.Body>
        </S.Wrapper>
    )
}
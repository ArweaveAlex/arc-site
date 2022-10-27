import { ReactSVG } from "react-svg";

import { Tabs } from "@/components/organisms/Tabs";

import { formatAddress, formatDate } from "@/util";
import { ARTIFACT_TABS, ARTIFACT_TYPES, ASSETS, TAGS } from "@/config";
import { LANGUAGE } from "@/language";
import * as urls from "@/urls";
import { IProps } from "./types";
import * as S from "./styles";

export default function ArtifactHeader(props: IProps) {
    function getArtifactType() {
        let artifactType = ARTIFACT_TYPES[props.data.artifactType];
        if (artifactType) {
            return (
                <>
                    <ReactSVG src={ASSETS.artifactTypes.webpage} />
                    <p>{artifactType.label}</p>
                </>
            )
        }
        else {
            artifactType = ARTIFACT_TYPES[TAGS.values.defaultArtifactType]
            return (
                <>
                    <ReactSVG src={artifactType!.icon} />
                    <p>{artifactType!.label}</p>
                </>
            )
        }
    }

    return (
        <S.Wrapper>
            <S.ContentWrapper>
                {/* <S.HideWrapper>

                </S.HideWrapper> */}
                <S.Content>
                    <S.Info>
                        <S.InfoLogo>
                            <ReactSVG src={ASSETS.logoAlt1} />
                        </S.InfoLogo>
                        <S.InfoTitle>
                            <p>{props.data.artifactName}</p>
                        </S.InfoTitle>
                        <S.InfoType>
                            {getArtifactType()}
                        </S.InfoType>
                        <S.InfoMintDate>
                            <p>{LANGUAGE.minted} {formatDate(props.data.minted, "epoch")}</p>
                        </S.InfoMintDate>
                        <S.InfoOwner>
                            <p>{LANGUAGE.archivist} {formatAddress(props.data.archivist, false)}</p>
                        </S.InfoOwner>
                        <S.InfoCollection>
                            <a href={`${urls.collection}/${props.data.poolId}`}>{props.data.poolName}</a>
                        </S.InfoCollection>
                    </S.Info>
                    <S.TabsWrapper>
                        <Tabs onTabPropClick={(label: string) => props.onTabPropClick(label)}>
                            {ARTIFACT_TABS.map((tab: { label: string }, index: number) => {
                                return (
                                    <S.TabWrapper key={index} label={tab.label}/>
                                )
                            })}
                        </Tabs>
                    </S.TabsWrapper>
                </S.Content>
            </S.ContentWrapper>
        </S.Wrapper>
    )
}
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { SocialShare } from "global/SocialShare";

import { Tabs } from "components/organisms/Tabs";

import {
    formatAddress,
    formatDate,
    formatArtifactType
} from "config/utils";
import { LANGUAGE } from "config/language";
import { ARTIFACT_TABS, ASSETS } from "config";
import * as urls from "config/urls";
import { IProps } from "./types";
import * as S from "./styles";

export default function ArtifactHeaderSingle(props: IProps) {
    return (props.data && props.type) ? (
        <S.Wrapper>
            <S.ContentWrapper>
                <S.Content>
                    <S.Info>
                        <S.InfoTitle>
                            <p>{props.data.ansTitle}</p>
                        </S.InfoTitle>
                        <S.InfoType>
                            <>
                                <ReactSVG src={props.type.icon} />
                                <p>{formatArtifactType(props.type.label)}</p>
                            </>
                        </S.InfoType>
                        <S.InfoMintDate>
                            <>
                                <ReactSVG src={ASSETS.mint} />
                                <p>{formatDate(props.data.minted, "epoch")}</p>
                            </>
                        </S.InfoMintDate>
                        <S.InfoOwner>
                            <>
                                <ReactSVG src={ASSETS.owner} />
                                <Link to={`${urls.libraryAll(props.data.owner!)}`}>{formatAddress(props.data.owner, false)}</Link>
                            </>
                        </S.InfoOwner>
                        <S.InfoPools>
                            <>
                                <ReactSVG src={ASSETS.pool} />
                                <Link to={`${urls.pool}${props.data.poolId}`}>{props.data.poolName}</Link>
                            </>
                        </S.InfoPools>
                    </S.Info>
                    <S.Body>
                        <Tabs onTabPropClick={(label: string) => props.onTabPropClick(label)}>
                            {ARTIFACT_TABS.map((tab: { label: string }, index: number) => {
                                return (
                                    <S.TabWrapper key={index} label={tab.label} />
                                )
                            })}
                        </Tabs>
                        <SocialShare
                            type={"secondary"}
                            href={window.location.href}
                            title={LANGUAGE.shareArtifact}
                        />
                    </S.Body>
                </S.Content>
            </S.ContentWrapper>
        </S.Wrapper>
    ) : null;
}
import Router from "next/router";
import { ReactSVG } from "react-svg";

import { Tabs } from "@/components/organisms/Tabs";

import { formatAddress, formatDate } from "@/util";
import { ARTIFACT_TABS, ASSETS } from "@/config";
import * as urls from "@/urls";
import { IProps } from "./types";
import * as S from "./styles";

export default function ArtifactHeader(props: IProps) {
    function handleViewCollection() {
        Router.push(`/${urls.collection}[id]`, `${urls.collection}/${props.data.poolId}`);
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
                            <p>{props.data.ansTitle}</p>
                        </S.InfoTitle>
                        <S.InfoType>
                            <>
                                <ReactSVG src={props.type.icon} />
                                <p>{props.type.label}</p>
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
                                <p>{formatAddress(props.data.archivist, false)}</p>
                            </>
                        </S.InfoOwner>
                        <S.InfoCollection>
                            <>
                                <ReactSVG src={ASSETS.collection} />
                                <div onClick={handleViewCollection}>{props.data.poolName}</div>
                            </>
                        </S.InfoCollection>
                    </S.Info>
                    <S.TabsWrapper>
                        <Tabs onTabPropClick={(label: string) => props.onTabPropClick(label)}>
                            {ARTIFACT_TABS.map((tab: { label: string }, index: number) => {
                                return (
                                    <S.TabWrapper key={index} label={tab.label} />
                                )
                            })}
                        </Tabs>
                    </S.TabsWrapper>
                </S.Content>
            </S.ContentWrapper>
        </S.Wrapper>
    )
}
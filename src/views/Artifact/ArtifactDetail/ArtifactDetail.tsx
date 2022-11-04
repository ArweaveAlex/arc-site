import React from "react";
import { ReactSVG } from "react-svg";

import { formatAddress, formatDataSize, formatDate } from "utils";
import * as urls from "urls";
import { LANGUAGE } from "language";
import { ASSETS } from "config";
import { IProps } from "./types";
import * as S from "./styles";

export default function ArtifactDetail(props: IProps) {
    const [viewRaw, setViewRaw] = React.useState<boolean>(false);
    
    return props.type ?  (
        <S.Wrapper>
            <S.IconWrapper>
                <S.Icon>
                    <ReactSVG src={props.type.icon} />
                </S.Icon>
            </S.IconWrapper>
            <S.Content>
                <S.ContentLine>
                    <S.InfoData>
                        <S.Icons>
                            <S.IconLine>
                                <ReactSVG src={ASSETS.owner} />
                                <p>{formatAddress(props.data.archivist, false)}</p>
                            </S.IconLine>
                            <S.IconLine>
                                <ReactSVG src={ASSETS.mint} />
                                <p>{formatDate(props.data.minted, "epoch")}</p>
                            </S.IconLine>
                            <S.IconLine>
                                <ReactSVG src={ASSETS.collection} />
                                <a href={`${urls.collection}/${props.data.poolId}`}>{props.data.poolName}</a>
                            </S.IconLine>
                        </S.Icons>
                    </S.InfoData>
                </S.ContentLine>
                <S.ContentLine>
                    <S.InfoData>
                        <span>
                            {LANGUAGE.artifactDetail.title}
                        </span>
                        <S.BodyData>
                            {props.data.ansTitle}
                        </S.BodyData>
                    </S.InfoData>
                </S.ContentLine>
                <S.ContentLine>
                    <S.InfoData>
                        <button onClick={() => setViewRaw(!viewRaw)}>
                            {LANGUAGE.artifactDetail.viewRaw}
                        </button>
                        {viewRaw &&
                            <S.RawData>
                                <p>{props.data.rawData}</p>
                            </S.RawData>
                        }
                    </S.InfoData>
                </S.ContentLine>
                <S.ContentLine>
                    <S.InfoData>
                        <span>
                            {LANGUAGE.artifactDetail.tags}
                        </span>
                        <S.Tags>
                            {JSON.parse(props.data.keywords).map((keyword: string, index: number) => [
                                <S.Tag key={index}>
                                    <p>{keyword}</p>
                                </S.Tag>
                            ])}
                        </S.Tags>
                    </S.InfoData>
                </S.ContentLine>
                <S.ContentLine>
                    <S.InfoData>
                        <span>
                            {LANGUAGE.artifactDetail.fileInformation}
                        </span>
                        <S.LinkWrapper>
                            <S.InfoData>
                                <S.IconLine>
                                    <ReactSVG src={ASSETS.artifact} />
                                    <p>{props.data.artifactName}</p>
                                </S.IconLine>
                            </S.InfoData>
                        </S.LinkWrapper>
                        <S.LinkWrapperAlt>
                            <S.InfoData>
                                <S.IconLine>
                                    <ReactSVG src={ASSETS.logoAlt2} />
                                    <a target={"_blank"} rel={"noreferrer"} href={props.data.dataUrl}>{props.data.dataUrl}</a>
                                </S.IconLine>
                            </S.InfoData>
                        </S.LinkWrapperAlt>
                        <S.LinkWrapper>
                            <S.InfoData>
                                <S.IconLine>
                                    <ReactSVG src={ASSETS.data} />
                                    <p>{formatDataSize(props.data.dataSize)}</p>
                                </S.IconLine>
                            </S.InfoData>
                        </S.LinkWrapper>
                    </S.InfoData>
                </S.ContentLine>
            </S.Content>
        </S.Wrapper>
    ) : null;
}
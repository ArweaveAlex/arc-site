import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

import { IconButton } from "components/atoms/IconButton";

import { formatAddress, formatDataSize, formatDate } from "utils";
import * as urls from "urls";
import { LANGUAGE } from "language";
import { ASSETS } from "config";
import { IProps } from "./types";
import * as S from "./styles";

export default function ArtifactDetail(props: IProps) {
    const [viewRaw, setViewRaw] = React.useState<boolean>(false);
    const [copied, setCopied] = React.useState<boolean>(false);

    const copyRawData = React.useCallback(async () => {
        await navigator.clipboard.writeText(props.data.rawData!);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [props.data.rawData]);

    return props.type && props.data ? (
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
                            <S.DataLine>
                                <S.DataHeader>{LANGUAGE.archivist}:&nbsp;</S.DataHeader>
                                <Link to={`${urls.libraryAll(props.data.owner!)}`}>{formatAddress(props.data.owner, false)}</Link>
                            </S.DataLine>
                            <S.DataLine>
                                <S.DataHeader>{LANGUAGE.minted}:&nbsp;</S.DataHeader>
                                <p>{formatDate(props.data.minted, "epoch")}</p>
                            </S.DataLine>
                            <S.DataLine>
                                <S.DataHeader>{LANGUAGE.collection.subheader1}:&nbsp;</S.DataHeader>
                                <Link to={`${urls.collection}${props.data.collectionId}`}>{props.data.poolName}</Link>
                            </S.DataLine>
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
                    {copied &&
                        <S.RawDataCopied>
                            <p>{LANGUAGE.copied}</p>
                        </S.RawDataCopied>
                    }
                    <S.InfoData>
                        <S.RawContainer>
                            <button onClick={() => setViewRaw(!viewRaw)}>
                                {LANGUAGE.artifactDetail.viewRaw}
                            </button>
                            <IconButton
                                type={"primary"}
                                src={ASSETS.copy}
                                handlePress={copyRawData}
                            />
                        </S.RawContainer>
                        {viewRaw &&
                            <S.RawData>
                                <code>{props.data.rawData}</code>
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
                            {JSON.parse(props.data.keywords!).map((keyword: string, index: number) => [
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
                                <S.DataLine>
                                    <ReactSVG src={ASSETS.artifact} />
                                    <p>{props.data.artifactName}</p>
                                </S.DataLine>
                            </S.InfoData>
                        </S.LinkWrapper>
                        <S.LinkWrapperAlt>
                            <S.InfoData>
                                <S.DataLine>
                                    <ReactSVG src={ASSETS.logoAlt2} />
                                    <S.DataUrl target={"_blank"} rel={"noreferrer"} href={props.data.dataUrl!}>{props.data.dataUrl}</S.DataUrl>
                                </S.DataLine>
                            </S.InfoData>
                        </S.LinkWrapperAlt>
                        <S.LinkWrapper>
                            <S.InfoData>
                                <S.DataLine>
                                    <ReactSVG src={ASSETS.data} />
                                    <p>{formatDataSize(props.data.dataSize!)}</p>
                                </S.DataLine>
                            </S.InfoData>
                        </S.LinkWrapper>
                    </S.InfoData>
                </S.ContentLine>
            </S.Content>
        </S.Wrapper>
    ) : null;
}
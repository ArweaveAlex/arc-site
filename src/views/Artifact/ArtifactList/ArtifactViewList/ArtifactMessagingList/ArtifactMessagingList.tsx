import React from "react";
import { ReactSVG } from "react-svg";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Button } from "components/atoms/Button";
import { Loader } from "components/atoms/Loader";
import { MessagingMedia } from "global/MessagingMedia";

import { getPoolById } from "gql/pools";
import { getArtifactById } from "gql/artifacts";
import { sortByAssociationSequence } from "filters/artifacts";
import { ArtifactDetailType, PoolType } from "helpers/types";
import { STORAGE } from "helpers/config";
import { getTxEndpoint } from "helpers/endpoints";
import { ASSETS } from "helpers/config";
import { formatAddress, formatMessagingData, getUsername, formatDate } from "helpers/utils";
import { LANGUAGE } from "helpers/language";
import * as urls from "helpers/urls";
import { IProps } from "../../types";
import * as S from "./styles";

function ChildAsset(props: { id: string }) {
    const [detailData, setDetailData] = React.useState<ArtifactDetailType | null>(null);

    React.useEffect(() => {
        (async function () {
            if (props.id) {
                setDetailData(await getArtifactById(props.id));
            }
        })()
    }, [props.id]);

    function getDetailData() {
        if (!detailData) {
            return <Loader sm />
        }
        else {
            return (
                <ListItem
                    data={detailData}
                    showBorder={false}
                    active={false}
                />
            )
        }
    }

    return (
        <S.ChildAssetContainer>
            {getDetailData()}
        </S.ChildAssetContainer>
    )
}

function ListItem(props: { data: ArtifactDetailType, showBorder: boolean, active: boolean }) {
    const [messageData, setMessageData] = React.useState<any>(null);

    React.useEffect(() => {
        if (props.data && props.data.rawData) {
            setMessageData(JSON.parse(props.data.rawData));
        }
    }, [props.data])

    function getProfileImage() {
        if (props.data && props.data.profileImagePath && props.data.profileImagePath !== STORAGE.none) {
            const profileImageJson = JSON.parse(props.data.profileImagePath);
            const profileImageKeys = Object.keys(profileImageJson);
            const profileImageId = (profileImageJson[profileImageKeys[0]]).id;

            return (
                <S.ProfileImage>
                    <img src={getTxEndpoint(profileImageId)} alt={""} />
                </S.ProfileImage>
            )
        }
        else {
            return null;
        }
    }

    function getChildAssets() {
        if (props.data && props.data.childAssets && props.data.childAssets !== STORAGE.none) {
            const childAssetsJson = JSON.parse(props.data.childAssets);
            if (childAssetsJson.length > 0) {
                return (childAssetsJson.map((id: string) => {
                    return (
                        <ChildAsset id={id} key={id} />
                    )
                }))
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }

    return (props.data && messageData) ? (
        <S.LIWrapper showBorder={props.showBorder} active={props.active}>
            <S.LIContent>
                <S.LIHeader>
                    <S.ProfileWrapper>
                        {getProfileImage()}
                        <S.NUContainer>
                            <S.Name>{messageData.user && messageData.user.name ? messageData.user.name : STORAGE.none}</S.Name>
                            <S.Username>{getUsername(messageData)}</S.Username>
                        </S.NUContainer>
                    </S.ProfileWrapper>
                    <S.ArtifactInfoWrapper>
                        <S.ArtifactLinkWrapper>
                            <span>{`${LANGUAGE.artifact}:`}&nbsp;</span>
                            <Link to={`${urls.artifact}${props.data.artifactId}`}>
                                {props.data ? formatAddress(props.data.artifactId, false) : null}
                            </Link>
                            {props.active &&
                                <S.ActiveContainer>
                                    <ReactSVG src={ASSETS.star} />
                                </S.ActiveContainer>
                            }
                        </S.ArtifactLinkWrapper>
                        <S.ArtifactLinkWrapper>
                            <span>{`${LANGUAGE.owner}:`}&nbsp;</span>
                            <Link to={`${urls.libraryAll(props.data.owner)}`}>
                                {props.data ? formatAddress(props.data.owner, false) : null}
                            </Link>
                        </S.ArtifactLinkWrapper>
                    </S.ArtifactInfoWrapper>
                </S.LIHeader>
                <S.LIBody>
                    <S.Message>
                        <p>{parse(formatMessagingData(messageData))}</p>
                    </S.Message>
                    {getChildAssets()}
                    <MessagingMedia mediaIds={props.data.mediaIds} />
                    {messageData.created_at &&
                        <S.PostDate>{formatDate(messageData.created_at, "iso")}</S.PostDate>
                    }
                    {messageData.public_metrics &&
                        <S.PublicMetrics>
                            <S.Metric>
                                <ReactSVG src={ASSETS.impressions} />
                                <p>{messageData.public_metrics.impression_count}</p>
                            </S.Metric>
                            <S.Metric>
                                <ReactSVG src={ASSETS.replies} />
                                <p>{messageData.public_metrics.reply_count}</p>
                            </S.Metric>
                            <S.Metric>
                                <ReactSVG src={ASSETS.retweet} />
                                <p>{messageData.public_metrics.retweet_count}</p>
                            </S.Metric>
                            <S.Metric>
                                <ReactSVG src={ASSETS.favorite} />
                                <p>{messageData.public_metrics.like_count}</p>
                            </S.Metric>
                        </S.PublicMetrics>
                    }
                </S.LIBody>
            </S.LIContent>
        </S.LIWrapper>
    ) : null;
}

export default function ArtifactMessagingList(props: IProps) {
    const { id } = useParams();

    const [threadData, setThreadData] = React.useState<ArtifactDetailType[]>(null);
    const [headerData, setHeaderData] = React.useState<PoolType | null>(null);
    const [detailData, setDetailData] = React.useState<ArtifactDetailType | null>(null);

    const [showAction, setShowAction] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.data) {
            setThreadData(sortByAssociationSequence(props.data));
            setTimeout(() => {
                setShowAction(true);
            }, 100);
        }
    }, [props.data])

    React.useEffect(() => {
        (async function () {
            if (props.data && props.data.length) {
                setHeaderData(await getPoolById(props.data[0].poolId));
            }
        })();
    }, [props.data])

    React.useEffect(() => {
        (async function () {
            if (id) {
                setDetailData(await getArtifactById(id));
            }
        })()
    }, [id]);

    function updateSequence() {
        setShowAction(false);
        props.updateSequence();
    }

    function getAction() {
        if (props.loading) {
            return (
                <Loader sm />
            )
        }
        if (showAction) {
            return (
                <Button
                    type={"alt2"}
                    label={LANGUAGE.showMoreReplies}
                    handlePress={() => updateSequence()}
                    disabled={props.updateDisabled}
                />
            )
        }
        return null;
    }

    function getThreadData() {
        if (!threadData) {
            return (
                <S.LoadingContainerInit>
                    <Loader sm />
                </S.LoadingContainerInit>
            )
        }
        else {
            return (
                <>
                    {threadData.map((artifact: ArtifactDetailType, index: number) => {
                        return (
                            <ListItem
                                key={index}
                                data={artifact}
                                showBorder={true}
                                active={detailData ? detailData.artifactId === artifact.artifactId : false}
                            />
                        )
                    })}
                    <S.ActionContainer>
                        {getAction()}
                    </S.ActionContainer>
                </>
            )
        }
    }

    function getHeaderData() {
        if (!headerData) {
            return <Loader sm />
        }
        else {
            return (
                <S.HeaderContent>
                    <Link to={`${urls.pool}${headerData.id}`}>{headerData.state.title}</Link>
                    <S.SubheaderFlex>
                        <S.SubheaderContainer>
                            <S.Subheader1><p>{LANGUAGE.pool.subheader1}</p></S.Subheader1>
                            &nbsp;
                            <S.ID><Link to={`${urls.pool}${headerData.id}`}>{headerData.id ? formatAddress(headerData.id, false) : null}</Link></S.ID>
                        </S.SubheaderContainer>
                        <S.SubheaderContainer>
                            <S.Subheader1><p>{LANGUAGE.pool.createdOn}</p></S.Subheader1>
                            &nbsp;
                            <S.Subheader2><p>{headerData.state.timestamp ? formatDate(headerData.state.timestamp, "epoch") : null}</p></S.Subheader2>
                        </S.SubheaderContainer>
                    </S.SubheaderFlex>
                </S.HeaderContent>
            )
        }
    }

    function getDetailData() {
        if (!detailData) {
            return <Loader sm />
        }
        else {
            return (
                <ListItem
                    data={detailData}
                    showBorder={false}
                    active={true}
                />
            )
        }
    }

    return (
        <S.Wrapper>
            <S.ListWrapper>
                {getThreadData()}
            </S.ListWrapper>
            <S.SingleWrapper>
                <S.SingleContent>
                    <S.HeaderWrapper>
                        {getHeaderData()}
                    </S.HeaderWrapper>
                    <S.DetailWrapper>
                        {getDetailData()}
                    </S.DetailWrapper>
                </S.SingleContent>
            </S.SingleWrapper>
        </S.Wrapper>
    );
}
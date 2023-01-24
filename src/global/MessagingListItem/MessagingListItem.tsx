import React from "react";
import { ReactSVG } from "react-svg";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

import { Loader } from "components/atoms/Loader";
import { Carousel } from "components/molecules/Carousel";

import { getTxEndpoint } from "helpers/endpoints";
import { getArtifactById } from "gql/artifacts";
import { formatMessagingData, getUsername } from "helpers/utils";
import { formatDate, formatAddress } from "helpers/utils";
import { LANGUAGE } from "helpers/language";
import { STORAGE, ASSETS, MEDIA_TYPES } from "helpers/config";
import { ArtifactDetailType } from "helpers/types";
import * as urls from "helpers/urls";
import { IProps, IMProps } from "./types";
import * as S from "./styles";

function MessagingMedia(props: IMProps) {    
    function getMediaType(type: string, url: string) {
        switch (type) {
            case MEDIA_TYPES.mp4:
                return (
                    <S.MediaContent>
                        <S.VideoContent controls>
                            <S.VideoSource type={"video/mp4"} src={url} />
                        </S.VideoContent>
                    </S.MediaContent>
                )
            case MEDIA_TYPES.jpg:
            case MEDIA_TYPES.jpeg:
            case MEDIA_TYPES.png:
                return (
                    <S.ImageContent image={url} />
                )
            default:
                return (
                    <S.ArweaveLinkWrapper>
                        <S.ArweaveLink target={"_blank"} rel={"noreferrer"} href={url}>
                            {LANGUAGE.viewOnArweave}
                        </S.ArweaveLink>
                    </S.ArweaveLinkWrapper>
                )
        }
    }

    function getMedia() {
        const mediaComponents: React.ReactElement[] = [];

        if (props.mediaIds) {
            const mediaIdsJson = JSON.parse(props.mediaIds);
            const mediaIdsJsonKeys = Object.keys(mediaIdsJson);

            for (let i = 0; i < mediaIdsJsonKeys.length; i++) {
                if (mediaIdsJsonKeys[i].length > 0) {
                    const mediaId = (mediaIdsJson[mediaIdsJsonKeys[i]]).id;
                    if (mediaIdsJsonKeys[i].indexOf(".")) {
                        mediaComponents.push(
                            <S.MediaElement key={mediaId}>
                                {getMediaType(mediaIdsJsonKeys[i].slice(mediaIdsJsonKeys[i].indexOf(".") + 1), getTxEndpoint(mediaId))}
                            </S.MediaElement>
                        )
                    }
                }
            }

            if (mediaComponents.length > 0) {
                return (
                    <S.MediaWrapper>
                        <Carousel title={null} data={mediaComponents} />
                    </S.MediaWrapper>
                );
            }
            else {
                return null;
            }
        }
        else {
            return null
        }
    }

    return (
        <>{getMedia()}</>
    )
}

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
                <MessagingListItem
                    data={detailData}
                    isListItem={false}
                    active={false}
                    showArtifactLink={true}
                    showOwnerLink={true}
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

export default function MessagingListItem(props: IProps) {
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
                        <ChildAsset
                            key={id}
                            id={id}
                        />
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

    const artifactLink = `${urls.artifact}${props.data.artifactId}`;
    const ownerLink = `${urls.libraryAll(props.data.owner)}`;

    return (props.data && messageData) ? (
        <S.LIWrapper
            isListItem={props.isListItem}
            active={props.active}
        >
            <S.LIContent>
                <S.LIHeader>
                    <S.ProfileWrapper>
                        {getProfileImage()}
                        <S.NUContainer>
                            <S.Name>{messageData.user && messageData.user.name ? messageData.user.name : STORAGE.none}</S.Name>
                            <S.Username>{getUsername(messageData)}</S.Username>
                        </S.NUContainer>
                    </S.ProfileWrapper>
                    <S.AInfoWrapper>
                        <S.ALinkWrapper>
                            {props.active &&
                                <S.ActiveContainer>
                                    <ReactSVG src={ASSETS.star} />
                                </S.ActiveContainer>
                            }
                            {props.showArtifactLink &&
                                <>
                                    <S.ALink>
                                        <span>{`${LANGUAGE.artifact}:`}&nbsp;</span>
                                        <Link to={artifactLink}>
                                            {props.data ? formatAddress(props.data.artifactId, false) : null}
                                        </Link>
                                    </S.ALink>
                                    <S.ALinkNT>
                                        <Link to={artifactLink} target={"_blank"} tabIndex={-1}>
                                            <ReactSVG src={ASSETS.newTab} />
                                        </Link>
                                    </S.ALinkNT>
                                </>
                            }
                        </S.ALinkWrapper>
                        <S.ALinkWrapper>
                            {props.showOwnerLink &&
                                <>
                                    <S.ALink>
                                        <span>{`${LANGUAGE.owner}:`}&nbsp;</span>
                                        <Link to={ownerLink}>
                                            {props.data ? formatAddress(props.data.owner, false) : null}
                                        </Link>
                                    </S.ALink>
                                    <S.ALinkNT>
                                        <Link to={ownerLink} target={"_blank"} tabIndex={-1}>
                                            <ReactSVG src={ASSETS.newTab} />
                                        </Link>
                                    </S.ALinkNT>
                                </>
                            }
                        </S.ALinkWrapper>
                    </S.AInfoWrapper>
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
import React from "react";
import { ReactSVG } from "react-svg";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

import { Loader } from "components/atoms/Loader";
import { MessagingMedia } from "global/MessagingMedia";

import { sortByAssociationSequence } from "filters/artifacts";
import { ArtifactDetailType } from "helpers/types";
import { STORAGE } from "helpers/config";
import { getTxEndpoint } from "helpers/endpoints";
import { ASSETS } from "helpers/config";
import { formatAddress, getMessageText, getUsername, formatDate } from "helpers/utils";
import { LANGUAGE } from "helpers/language";
import * as urls from "helpers/urls";
import { IProps } from "../../types";
import * as S from "./styles";

// TODO - Thread loader (Need different sort)
function ListItem(props: { data: ArtifactDetailType }) {
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

    return (props.data && messageData) ? (
        <S.LIWrapper>
            <S.LIContent>
                <S.LIHeader>
                    <S.ProfileWrapper>
                        {getProfileImage()}
                        <S.NUContainer>
                            <S.Name>{messageData.user && messageData.user.name ? messageData.user.name : STORAGE.none}</S.Name>
                            <S.Username>{getUsername(messageData)}</S.Username>
                        </S.NUContainer>
                    </S.ProfileWrapper>
                    <S.ArtifactLinkWrapper>
                        <span>{`${LANGUAGE.artifact}:`}&nbsp;</span>
                        <Link to={`${urls.thread}${props.data.artifactId}`}>
                            {props.data ? formatAddress(props.data.artifactId, false) : null}
                        </Link>
                    </S.ArtifactLinkWrapper>
                </S.LIHeader>
                <S.LIBody>
                    <S.Message>
                        <p>{parse(getMessageText(messageData))}</p>
                    </S.Message>
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
    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        if (props.data) {
            setData(sortByAssociationSequence(props.data));
        }
    }, [props.data])

    return data ? (
        <S.Wrapper>
            <S.ListWrapper>
                {data.map((artifact: ArtifactDetailType, index: number) => {
                    return (
                        <ListItem key={index} data={artifact} />
                    )
                })}
            </S.ListWrapper>
            {props.loading && (
                <S.LoadingContainer>
                    <Loader sm />
                </S.LoadingContainer>
            )}
        </S.Wrapper>
    ) : null;
}
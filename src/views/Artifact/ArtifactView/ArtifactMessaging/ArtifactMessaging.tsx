import React from "react";
import parse from "html-react-parser";

import { Button } from "components/atoms/Button";
import { Carousel } from "components/molecules/Carousel";

import { MEDIA_TYPES, STORAGE } from "config";
import { getTxEndpoint } from "endpoints";
import { LANGUAGE } from "language";
import { IProps } from "../../types";
import * as S from "./styles";

export default function ArtifactMessaging(props: IProps) {

    const [data, setData] = React.useState<any>(null);
    const [contentApproved, setContentApproved] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (props.data.rawData) {
            setData(JSON.parse(props.data.rawData));
        }
    }, [props.data])

    function getMessageText() {
        if (data) {
            if (data.includes && data.includes.tweets && data.includes.tweets.length > 0) {
                for (let i = 0; i < data.includes.tweets.length; i++) {
                    if (!data.includes.tweets[i].referenced_tweets) {
                        return data.includes.tweets[i].text;
                    }
                }
                return data.includes.tweets[0].text
            }
            else {
                if (data.extended_tweet && data.extended_tweet.full_text) {
                    return data.extended_tweet.full_text;
                }
                if (data.full_text) {
                    return data.full_text;
                }
                else {
                    return data.text;
                }
            }
        }
        else {
            return STORAGE.none;
        }
    }

    function getMessage() {
        return (
            <S.PostContent>
                <S.Header>
                    <S.BorderSection>
                        <S.InfoData>
                            <span>{LANGUAGE.messaging.name}</span>
                            <p>{data.user && data.user.name ? data.user.name : STORAGE.none}</p>
                        </S.InfoData>
                    </S.BorderSection>
                    <S.Section>
                        <S.InfoData>
                            <span>{LANGUAGE.messaging.handle}</span>
                            <p>{data.user && data.user.screen_name ? `@${data.user.screen_name}` : STORAGE.none}</p>
                        </S.InfoData>
                    </S.Section>
                </S.Header>
                <S.Body>
                    <S.Message>
                        <span>{LANGUAGE.messaging.message}</span>
                        <p>{getMessageText()}</p>
                    </S.Message>
                </S.Body>
                <S.Footer>
                    <S.BorderSection>
                        <S.InfoData>
                            <span>{LANGUAGE.messaging.originalPostDate}</span>
                            <p>{data.created_at ? data.created_at : STORAGE.none}</p>
                        </S.InfoData>
                    </S.BorderSection>
                    <S.Section>
                        <S.InfoData>
                            <span>{LANGUAGE.messaging.source}</span>
                            <p>{data.source ? parse(data.source) : STORAGE.none}</p>
                        </S.InfoData>
                    </S.Section>
                </S.Footer>
            </S.PostContent>
        )
    }

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
                return <S.ImageContent image={url} />
            default:
                return (
                    <S.ArweaveLinkWrapper>
                        <S.ArweaveLink>
                            <a target={"_blank"} rel={"noreferrer"} href={url}>{LANGUAGE.viewOnArweave}</a>
                        </S.ArweaveLink>
                    </S.ArweaveLinkWrapper>
                )
        }
    }

    function getMedia() {
        const mediaComponents: React.ReactElement[] = [];

        if (props.data.mediaIds) {
            const mediaIdsJson = JSON.parse(props.data.mediaIds);
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
                        {!contentApproved && (
                            <S.ContentApproveWrapper>
                                <S.ContentApprove>
                                    <p>{LANGUAGE.mediaCaution}</p>
                                    <Button
                                        type={"secondary"}
                                        label={LANGUAGE.accept}
                                        handlePress={() => setContentApproved(true)}
                                    />
                                </S.ContentApprove>
                            </S.ContentApproveWrapper>
                        )}
                        <Carousel title={LANGUAGE.media} data={mediaComponents} />
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

    return data ? (
        <S.Wrapper>
            {getMessage()}
            {getMedia()}
        </S.Wrapper>
    ) : null;
}
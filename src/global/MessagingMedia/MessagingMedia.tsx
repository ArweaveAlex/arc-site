import React from "react";

// import { Button } from "components/atoms/Button";
import { Carousel } from "components/molecules/Carousel";

import { MEDIA_TYPES } from "helpers/config";
import { LANGUAGE } from "helpers/language";
import { getTxEndpoint } from "helpers/endpoints";

import { IProps } from "./types";
import * as S from "./styles";

export default function MessagingMedia(props: IProps) {
    // const [contentApproved, setContentApproved] = React.useState<boolean>(false);
    
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
                        {/* {!contentApproved && (
                            <S.ContentApproveWrapper>
                                <S.ContentApprove>
                                    <p>{LANGUAGE.mediaCaution}</p>
                                    <Button
                                        type={"alt1"}
                                        label={LANGUAGE.accept}
                                        handlePress={() => setContentApproved(true)}
                                    />
                                </S.ContentApprove>
                            </S.ContentApproveWrapper>
                        )} */}
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
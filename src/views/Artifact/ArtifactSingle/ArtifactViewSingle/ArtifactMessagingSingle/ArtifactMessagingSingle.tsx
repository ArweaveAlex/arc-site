import React from "react";
import parse from "html-react-parser";

import { MessagingMedia } from "global/MessagingMedia";

import { STORAGE } from "helpers/config";
import { getMessageText, getUsername } from "helpers/utils";
import { LANGUAGE } from "helpers/language";
import { formatDate } from "helpers/utils";
import { IProps } from "../../types";
import * as S from "./styles";

export default function ArtifactMessagingSingle(props: IProps) {
    const [messageData, setMessageData] = React.useState<any>(null);

    React.useEffect(() => {
        if (props.data.rawData) {
            setMessageData(JSON.parse(props.data.rawData));
        }
    }, [props.data])

    function getMessage() {
        return (
            <S.PostContent>
                <S.Header>
                    <S.BorderSection>
                        <S.InfoData>
                            <span>{LANGUAGE.messaging.name}</span>
                            <p>{messageData.user && messageData.user.name ? messageData.user.name : STORAGE.none}</p>
                        </S.InfoData>
                    </S.BorderSection>
                    <S.Section>
                        <S.InfoData>
                            <span>{LANGUAGE.messaging.handle}</span>
                            <p>{getUsername(messageData)}</p>
                        </S.InfoData>
                    </S.Section>
                </S.Header>
                <S.Body>
                    <S.InfoData>
                        <span>{LANGUAGE.messaging.message}</span>
                    </S.InfoData>
                    <S.Message>
                        <p>{parse(getMessageText(messageData))}</p>
                    </S.Message>
                </S.Body>
                <S.Footer>
                    <S.Section>
                        <S.InfoData>
                            <span>{LANGUAGE.messaging.originalPostDate}</span>
                            {messageData.created_at &&
                                <p>{formatDate(messageData.created_at, "iso")}</p>
                            }
                        </S.InfoData>
                    </S.Section>
                </S.Footer>
            </S.PostContent>
        )
    }

    return messageData ? (
        <S.Wrapper>
            {getMessage()}
            <MessagingMedia mediaIds={props.data.mediaIds} />
        </S.Wrapper>
    ) : null;
}
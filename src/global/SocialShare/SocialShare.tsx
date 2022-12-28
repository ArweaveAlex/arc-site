import React from "react";
import { ReactSVG } from "react-svg";
import { TwitterShareButton } from "react-share";

import { IconButton } from "components/atoms/IconButton";

import { ASSETS } from "config";
import { LANGUAGE } from "config/language";
import { IProps } from "./types";
import * as S from "./styles";

export default function SocialShare(props: IProps) {
    const [copied, setCopied] = React.useState<boolean>(false);

    const copyUrl = React.useCallback(async () => {
        await navigator.clipboard.writeText(props.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [props.href]);

    return (
        <S.Wrapper>
            <S.Info secondary={props.type === "secondary"}>
                {props.type === "primary" &&
                    <ReactSVG src={ASSETS.shareLink} />
                }
                <p>{LANGUAGE.share.toUpperCase()}</p>
            </S.Info>
            <S.Actions>
                {copied &&
                    <S.URLCopied>
                        <p>{LANGUAGE.urlCopied}</p>
                    </S.URLCopied>
                }
                <IconButton
                    type={props.type === "primary" ? "secondary" : "tertiary"}
                    src={ASSETS.link}
                    handlePress={copyUrl}
                />
                <TwitterShareButton
                    title={props.title}
                    url={props.href}
                >
                    <S.Icon secondary={props.type === "secondary"}>
                        <ReactSVG src={ASSETS.social.twitter} />
                    </S.Icon>
                </TwitterShareButton>
            </S.Actions>
        </S.Wrapper>
    )
}
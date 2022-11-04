import React from "react";
import { ReactSVG } from "react-svg";
import { TwitterShareButton } from "react-share";

import { IconButton } from "components/atoms/IconButton";

import { ASSETS } from "config";
import { LANGUAGE } from "language";
import { IProps } from "./types";
import * as S from "./styles";

export default function PageShare(props: IProps) {
    const [copied, setCopied] = React.useState<boolean>(false);

    const copyAddress = React.useCallback(async () => {
        await navigator.clipboard.writeText(props.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [props.href]);

    return (
        <S.Wrapper>
            <S.Info>
                <ReactSVG src={ASSETS.shareLink} />
                <p>{LANGUAGE.share.toUpperCase()}</p>
            </S.Info>
            <S.Actions>
                {copied &&
                    <S.LinkCopied>
                        <p>{LANGUAGE.linkCopied}</p>
                    </S.LinkCopied>
                }
                <IconButton
                    type={"secondary"}
                    src={ASSETS.link}
                    handlePress={copyAddress}
                />
                <TwitterShareButton
                    title={props.title}
                    url={props.href}
                >
                    <S.Icon>
                        <ReactSVG src={ASSETS.social.twitter} />
                    </S.Icon>
                </TwitterShareButton>
            </S.Actions>
        </S.Wrapper>
    )
}
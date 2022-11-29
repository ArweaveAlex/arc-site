import React from "react";
import { useArweaveProvider } from "providers/ArweaveProvider";

import { Button } from "components/atoms/Button";
import { URLTabs } from "components/organisms/URLTabs";

import * as urls from "urls";
import { formatAddress, getHashUrl } from "utils";
import { ASSETS, URLS } from "config";
import { LANGUAGE } from "language";
import * as S from "./styles";

export default function Account() {
    const arProvider = useArweaveProvider();

    const [copied, setCopied] = React.useState<boolean>(false);

    const copyUrl = React.useCallback(async () => {
        console.log(arProvider.walletAddress)
        if (arProvider.walletAddress) {
            await navigator.clipboard.writeText(`${getHashUrl(window.location.origin)}${urls.libraryAll(arProvider.walletAddress)}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [arProvider.walletAddress]);

    return (
        <S.Wrapper>
            <S.HeaderWrapper>
                <S.HeaderContent>
                    <S.HeaderContainer>
                        <S.FlexHeader>
                            <S.Header1>{LANGUAGE.account.header1}</S.Header1>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <S.Header2Container>
                                <S.Header2>{formatAddress(arProvider.walletAddress, true)}</S.Header2>
                            </S.Header2Container>
                        </S.FlexHeader>
                    </S.HeaderContainer>
                    <S.ShareWrapper>
                        {copied &&
                            <S.URLCopied>
                                <p>{LANGUAGE.urlCopied}</p>
                            </S.URLCopied>
                        }
                        <Button
                            type={"primary"}
                            label={LANGUAGE.shareUrlLabel}
                            handlePress={copyUrl}
                            icon={ASSETS.shareLink}
                            iconLeftAlign
                        />
                    </S.ShareWrapper>
                </S.HeaderContent>
            </S.HeaderWrapper>
            <S.TabsWrapper>
                <URLTabs tabs={URLS.account} activeUrl={URLS.account[0]!.url} />
            </S.TabsWrapper>
        </S.Wrapper>
    )
}
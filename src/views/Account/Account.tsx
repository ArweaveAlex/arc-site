import { useARProvder } from "providers/ARProvider";

import { URLTabs } from "components/organisms/URLTabs";

import { formatAddress } from "utils";
import { URLS } from "config";
import { LANGUAGE } from "language";
import * as S from "./styles";

export default function Account() {
    const arProvider = useARProvder();

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
                </S.HeaderContent>
            </S.HeaderWrapper>
            <S.TabsWrapper>
                <URLTabs tabs={URLS.account} activeUrl={URLS.account[0]!.url} />
            </S.TabsWrapper>
        </S.Wrapper>
    )
}
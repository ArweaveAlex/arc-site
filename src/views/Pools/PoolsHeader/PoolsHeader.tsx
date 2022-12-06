import { SocialShare } from "global/SocialShare";

import { LANGUAGE } from "language";
import * as S from "./styles";

export default function PoolsHeader() {
    return (
        <S.Wrapper>
            <S.Header>
                <S.HeaderFlex>
                    <S.Header1>{LANGUAGE.pools.header1}</S.Header1>
                    <SocialShare
                        type={"primary"}
                        href={window.location.href}
                        title={LANGUAGE.sharePools}
                    />
                </S.HeaderFlex>
            </S.Header>
        </S.Wrapper>
    )
}
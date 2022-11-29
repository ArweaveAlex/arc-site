import { PageShare } from "global/PageShare";

import { LANGUAGE } from "language";
import * as S from "./styles";

export default function CollectionsHeader() {
    return (
        <S.Wrapper>
            <S.Header>
                <S.HeaderFlex>
                    <S.Header1>{LANGUAGE.collections.header1}</S.Header1>
                    <PageShare
                        type={"primary"}
                        href={window.location.href}
                        title={LANGUAGE.shareCollection}
                    />
                </S.HeaderFlex>
            </S.Header>
        </S.Wrapper>
    )
}
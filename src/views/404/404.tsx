import * as S from "./styles";

import { language } from "@/language";

export default function _404() {
    return (
        <S.Wrapper>
            <S.Content>
                <S.Header>404</S.Header>
                <S.Divider />
                <S.Message>{language.pageNotFound}</S.Message>
            </S.Content>
        </S.Wrapper>
    )
}
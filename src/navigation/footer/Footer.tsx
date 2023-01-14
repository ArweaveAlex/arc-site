import { LANGUAGE } from "helpers/language";
import * as S from "./styles";

export default function Footer() {
    return (
        <S.Wrapper>
            <S.Container>
                <S.Content>
                    {`${LANGUAGE.companyTitle} ${new Date().getFullYear()}`}
                </S.Content>
            </S.Container>
        </S.Wrapper>
    )
}
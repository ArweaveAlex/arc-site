import { LANGUAGE } from "language";
import * as urls from "urls";
import * as S from "./styles";

export default function LandingFAQLink() {
    return (
        <S.Wrapper>
            <S.Content>
                <S.HeaderContainer>
                    <S.Flex>
                        <S.Header1>{LANGUAGE.faq.header1}</S.Header1>
                        &nbsp;
                        <S.Header2>{LANGUAGE.faq.header2}</S.Header2>
                    </S.Flex>
                    <S.Flex>
                        <S.Header1>{LANGUAGE.faq.header3}</S.Header1>
                        &nbsp;
                        <S.Header3 href={"#"}>{LANGUAGE.faq.display}</S.Header3>
                    </S.Flex>
                </S.HeaderContainer>
            </S.Content>
        </S.Wrapper>
    )
}
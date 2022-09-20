import { language } from "@/language";
import * as S from "./styles";

export default function LandingFAQLink() {
    return (
        <S.Wrapper>
            <S.Content>
                <S.HeaderContainer>
                    <S.Flex>
                        <S.Header1>{language.faq.header1}</S.Header1>
                        &nbsp;
                        <S.Header2>{language.faq.header2}</S.Header2>
                    </S.Flex>
                    <S.Flex>
                        <S.Header1>{language.faq.header3}</S.Header1>
                        &nbsp;
                        <S.Header3 href="#">{language.faq.display}</S.Header3>
                    </S.Flex>
                </S.HeaderContainer>
            </S.Content>
        </S.Wrapper>
    )
}
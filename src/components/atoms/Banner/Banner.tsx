import { language } from "@/language";
import * as S from "./styles";

export default function Banner() {
    return (
        <S.Wrapper>
            <S.Content>
                <S.HeaderContainer>
                    <S.Flex>
                        <S.Header1>{language.banner.header1}</S.Header1>
                        &nbsp;
                        &nbsp;
                        <S.Header2Container>
                            <S.Header2>{language.banner.header2}</S.Header2>
                            <S.Highlight />
                        </S.Header2Container>
                    </S.Flex>
                    <S.Flex>
                        <S.Header1>{language.banner.header3}</S.Header1>
                        &nbsp;
                        &nbsp;
                        <S.Header3>{language.companyTitle}</S.Header3>
                    </S.Flex>
                </S.HeaderContainer>
            </S.Content>
        </S.Wrapper>
    )
}
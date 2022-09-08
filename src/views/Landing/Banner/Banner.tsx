import { ReactSVG } from "react-svg";

import { language } from "@/language";
import * as S from "./styles";

export default function Banner() {
    return (
        <S.Wrapper>
            <S.Content>
                <S.HeaderContainer>
                    <S.FlexHeader>
                        <S.Header1>{language.banner.header1}</S.Header1>
                        &nbsp;
                        &nbsp;
                        <S.Header2Container>
                            <S.Header2>{language.banner.header2}</S.Header2>
                            <S.Highlight />
                        </S.Header2Container>
                    </S.FlexHeader>
                    <S.FlexHeader>
                        <S.Header1>{language.banner.header3}</S.Header1>
                        &nbsp;
                        &nbsp;
                        <S.Header3>{language.companyTitle}</S.Header3>
                    </S.FlexHeader>
                </S.HeaderContainer>
                <S.SubheaderContainer>
                    <S.FlexSubheader>
                        <S.Subheader1>{language.banner.subheader1}</S.Subheader1>
                        <S.Logo>
                            <ReactSVG src={"/assets/img/logo.svg"}/>
                        </S.Logo>
                    </S.FlexSubheader>
                    <S.Subheader2>
                        <p>{language.banner.subheader2}</p>
                    </S.Subheader2>
                </S.SubheaderContainer>
            </S.Content>
        </S.Wrapper>
    )
}
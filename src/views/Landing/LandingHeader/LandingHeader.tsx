import { ReactSVG } from "react-svg";

import { ASSETS } from "config";
import { LANGUAGE } from "language";
import * as S from "./styles";

export default function LandingHeader() {
    return (
        <S.Wrapper>
            <S.Content>
                <S.HeaderContainer>
                    <S.FlexHeader>
                        <S.Header1>{LANGUAGE.banner.header1}</S.Header1>
                        &nbsp;
                        &nbsp;
                        <S.Header2Container>
                            <S.Header2>{LANGUAGE.banner.header2}</S.Header2>
                            <S.Highlight />
                        </S.Header2Container>
                    </S.FlexHeader>
                    <S.FlexHeader>
                        <S.Header1>{LANGUAGE.banner.header3}</S.Header1>
                        &nbsp;
                        &nbsp;
                        <S.Header3>{LANGUAGE.companyTitle}</S.Header3>
                    </S.FlexHeader>
                </S.HeaderContainer>
                <S.SubheaderContainer>
                    <S.FlexSubheader>
                        <S.Subheader1>{LANGUAGE.banner.subheader1}</S.Subheader1>
                        <S.Logo>
                            <ReactSVG src={ASSETS.logo} />
                        </S.Logo>
                    </S.FlexSubheader>
                    {/* <S.Subheader2>
                        <p>{LANGUAGE.banner.subheader2}</p>
                    </S.Subheader2>
                    <S.Link >
                        <a target={"_blank"} href={"#"}>{LANGUAGE.readMore}</a>
                    </S.Link> */}
                </S.SubheaderContainer>
            </S.Content>
        </S.Wrapper>
    )
}
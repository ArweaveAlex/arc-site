import { ReactSVG } from "react-svg";

import { LANGUAGE } from "language";
import { SOCIAL_PATHS } from "paths";
import * as S from "./styles";

export default function Footer() {
    return (
        <S.Wrapper>
            <S.Container>
                <S.FlexContainer>
                    <S.ContainerOne>
                        <S.LogoContainer>
                            <S.LogoContent>
                                <S.LogoHeader>{LANGUAGE.companyTitle}</S.LogoHeader>
                                <S.LogoSubHeader>{LANGUAGE.companyDescription}</S.LogoSubHeader>
                            </S.LogoContent>
                        </S.LogoContainer>
                    </S.ContainerOne>
                    <S.ContainerTwo>
                        <S.SocialPaths>
                            {SOCIAL_PATHS.map((path, index) => (
                                <S.SocialLink key={index} target={"_blank"} href={path.href}>
                                    <ReactSVG src={path.svg} />
                                </S.SocialLink>
                            ))}
                        </S.SocialPaths>
                    </S.ContainerTwo>
                </S.FlexContainer>
            </S.Container>
            <S.YearContainer>
                <S.Year>
                    {new Date().getFullYear()}
                </S.Year>
            </S.YearContainer>
        </S.Wrapper>
    )
}
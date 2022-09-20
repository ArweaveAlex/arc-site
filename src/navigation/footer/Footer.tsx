import { ReactSVG } from "react-svg";

import { language } from "@/language";
import { SOCIAL_PATHS } from "@/paths";
import * as S from "./styles";

export default function Footer() {
    return (
        <S.Wrapper>
            <S.Container>
                <S.FlexContainer>
                    <S.ContainerOne>
                        <S.LogoContainer>
                            <S.LogoContent>
                                <S.LogoHeader>{language.companyTitle}</S.LogoHeader>
                                <S.LogoSubHeader>{language.companyDescription}</S.LogoSubHeader>
                            </S.LogoContent>
                        </S.LogoContainer>
                        {/* <S.NavContainer>
                            <S.NavContainerHeader>
                                {language.companyTitle}
                            </S.NavContainerHeader>
                            <S.NavLinkContainer>
                                {NAV_PATHS.map((path, index) => (
                                    <S.NavLink key={index} href={path.href}>
                                        {path.name}
                                    </S.NavLink>
                                ))}
                            </S.NavLinkContainer>
                        </S.NavContainer> */}
                        {/* <S.NavContainer>
                            <S.NavContainerHeader>
                                {language.community}
                            </S.NavContainerHeader>
                            <S.NavLinkContainer>
                                <S.SocialPaths>
                                    {SOCIAL_PATHS.map((path, index) => (
                                        <S.SocialLink key={index} href={path.href}>
                                            <ReactSVG src={"/assets/" + path.svg} />
                                        </S.SocialLink>
                                    ))}
                                </S.SocialPaths>
                            </S.NavLinkContainer>
                        </S.NavContainer> */}
                    </S.ContainerOne>
                    <S.ContainerTwo>
                        <S.SocialPaths>
                            {SOCIAL_PATHS.map((path, index) => (
                                <S.SocialLink key={index} href={path.href}>
                                    <ReactSVG src={"/assets/" + path.svg} />
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
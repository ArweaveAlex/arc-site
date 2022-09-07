import { ReactSVG } from "react-svg";

import { language } from "@/language";
import { NAV_PATHS, SOCIAL_PATHS } from "@/paths";
import * as S from "./styles";

export default function Footer() {
    return (
        <S.Wrapper>
            <S.Container>
                <S.FlexContainer>
                    <S.ContainerOne>
                        <S.NavContainer>
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
                        </S.NavContainer>
                        <S.NavContainer>
                            <S.NavContainerHeader>
                                {language.community}
                            </S.NavContainerHeader>
                            <S.NavLinkContainer>
                                <S.SocialPaths>
                                    {SOCIAL_PATHS.map((path, index) => (
                                        <S.SocialLink key={index} href={path.href}>
                                            <ReactSVG src={"/assets/img/" + path.svg} />
                                        </S.SocialLink>
                                    ))}
                                </S.SocialPaths>
                            </S.NavLinkContainer>
                        </S.NavContainer>
                    </S.ContainerOne>
                </S.FlexContainer>
                <S.ContainerC>
                    <S.Copyright>
                        {new Date().getFullYear()}
                    </S.Copyright>
                </S.ContainerC>
            </S.Container>
        </S.Wrapper>
    )
}
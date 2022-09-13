import React from "react";
import dynamic from "next/dynamic";

import { language } from "@/language";
import * as urls from "@/urls";
import * as S from "./styles";

const DynamicNavigation = dynamic(
    () => import("./DynamicNavigation") as any,
    { ssr: false }
)

export default function Header() {
    return (
        <S.Wrapper>
            <S.NavContainer>
                <S.LogoContainer>
                    <S.LogoLink href={urls.base}>
                        <S.LogoContent>
                            <S.LogoHeaderContent>
                                <S.LogoHeader>{language.companyTitle}</S.LogoHeader>
                                <S.Version>
                                    <span>{language.beta.toUpperCase()}</span>
                                </S.Version>
                            </S.LogoHeaderContent>
                            <S.LogoSubHeader>{language.companyDescription}</S.LogoSubHeader>
                        </S.LogoContent>
                    </S.LogoLink>
                </S.LogoContainer>
                <DynamicNavigation />
            </S.NavContainer>
        </S.Wrapper>
    )
}
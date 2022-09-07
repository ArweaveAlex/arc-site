import React from "react";

import { Banner } from "@/components/atoms/Banner";
import { FAQLink } from "@/components/atoms/FAQLink";

import * as S from "./styles";

export default function Landing() {
    return (
        <S.Wrapper>
            <Banner />
            <FAQLink />
        </S.Wrapper>
    )
}
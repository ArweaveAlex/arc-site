import React from "react";

import { Banner } from "./Banner";
import { Collections } from "./Collections";
import { Info } from "./Info";
import { Steps } from "./Steps";
import { FAQLink } from "./FAQLink";

import * as S from "./styles";

export default function Landing({ data }) {
    return (
        <S.Wrapper>
            <Banner />
            <Collections data={data}/>
            <Info />
            <Steps />
            <FAQLink />
        </S.Wrapper>
    )
}
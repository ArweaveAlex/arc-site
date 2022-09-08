import React from "react";

import { Banner } from "./Banner";
import { PoolCollections } from "./PoolCollections";
import { Info } from "./Info";
import { Steps } from "./Steps";
import { FAQLink } from "./FAQLink";

import * as S from "./styles";

export default function Landing({ data }) {
    return (
        <S.Wrapper>
            <Banner />
            <PoolCollections data={data}/>
            <Info />
            <Steps />
            <FAQLink />
        </S.Wrapper>
    )
}
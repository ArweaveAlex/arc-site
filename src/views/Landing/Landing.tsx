import React from "react";

import { Banner } from "@/components/atoms/Banner";
import { FAQLink } from "@/components/atoms/FAQLink";
import { PoolCollections } from "@/components/organisms/PoolCollections";
import { Steps } from "@/components/organisms/Steps";

import * as S from "./styles";

export default function Landing({ data }) {
    return (
        <S.Wrapper>
            <Banner />
            <PoolCollections data={data}/>
            <Steps />
            <FAQLink />
        </S.Wrapper>
    )
}
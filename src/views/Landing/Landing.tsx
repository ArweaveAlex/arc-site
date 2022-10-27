import React from "react";

import { LandingHeader } from "./LandingHeader";
import { LandingCollections } from "./LandingCollections";
import { LandingInfo } from "./LandingInfo";
import { LandingSteps } from "./LandingSteps";
// import { LandingFAQLink } from "./LandingFAQLink";

import * as S from "./styles";

export default function Landing({ data }) {
    return (
        <S.Wrapper>
            <LandingHeader />
            <LandingCollections data={data}/>
            <LandingInfo />
            <LandingSteps />
            {/* <LandingFAQLink /> */}
        </S.Wrapper>
    )
}
import React from "react";

import { getCollections } from "gql/collections";

import { Loader } from "components/atoms/Loader";

import { LandingHeader } from "./LandingHeader";
import { LandingCollections } from "./LandingCollections";
import { LandingInfo } from "./LandingInfo";
import { LandingSteps } from "./LandingSteps";

import * as S from "./styles";

export default function Landing() {

    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        (async function () {
            setData(await getCollections());
        })()
    }, [])

    return data ? (
        <S.Wrapper>
            <LandingHeader />
            <LandingCollections data={data} />
            <LandingInfo />
            <LandingSteps />
        </S.Wrapper>
    ) : <Loader />
}
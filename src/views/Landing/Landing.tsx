import React from "react";

import { getPools } from "gql/pools";

import { Loader } from "components/atoms/Loader";

import { LandingHeader } from "./LandingHeader";
import { LandingPools } from "./LandingPools";
import { LandingInfo } from "./LandingInfo";
import { LandingSteps } from "./LandingSteps";

import { PoolType } from "types";
import { sortByMostContributed } from "filters/pools";
import * as S from "./styles";

export default function Landing() {

    const [data, setData] = React.useState<PoolType[] | null>(null);

    React.useEffect(() => {
        (async function () {
            setData(sortByMostContributed(await getPools(), 5));
        })()
    }, [])

    return data ? (
        <S.Wrapper>
            <LandingHeader />
            <LandingPools data={data} />
            <LandingInfo />
            <LandingSteps />
        </S.Wrapper>
    ) : <Loader />
}
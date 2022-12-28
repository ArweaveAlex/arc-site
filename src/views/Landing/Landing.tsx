import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "redux/store";
import { PoolUpdate } from "redux/pools/PoolUpdate";

import { Loader } from "components/atoms/Loader";

import { LandingHeader } from "./LandingHeader";
import { LandingPools } from "./LandingPools";
import { LandingInfo } from "./LandingInfo";
import { LandingSteps } from "./LandingSteps";

import { PoolType } from "config/types";
import { sortByMostContributed } from "filters/pools";
import * as S from "./styles";

export default function Landing() {
    const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

    const [data, setData] = React.useState<PoolType[] | null>(null);

    React.useEffect(() => {
        if (poolsReducer.data) {
            setData(sortByMostContributed(poolsReducer.data, 5));
        }
    }, [poolsReducer.data])

    function getData() {
        if (data) {
            return (
                <S.Wrapper>
                    <LandingHeader />
                    <LandingPools data={data} />
                    <LandingInfo />
                    <LandingSteps />
                </S.Wrapper>
            )
        }
        else {
            return (
                <Loader />
            )
        }
    }

    return (
        <PoolUpdate>
            {getData()}
        </PoolUpdate>
    )
}
import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "redux/store";
import { ReduxPoolsUpdate } from "redux/pools/ReduxPoolsUpdate";

import { Loader } from "components/atoms/Loader";

import { LandingHeader } from "./LandingHeader";
import { LandingPools } from "./LandingPools";
import { LandingInfo } from "./LandingInfo";
import { LandingSteps } from "./LandingSteps";

import { PoolType } from "helpers/types";
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

    console.log(data);

    return (
        <ReduxPoolsUpdate>
            {getData()}
        </ReduxPoolsUpdate>
    )
}
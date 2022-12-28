import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "redux/store";
import { PoolUpdate } from "redux/pools/PoolUpdate";

import { PoolsHeader } from "./PoolsHeader";
import { PoolsGrid } from "./PoolsGrid";

import { Loader } from "components/atoms/Loader";

import { PoolType } from "config/types";
import { POOL_FILTERS } from "config";
import * as S from "./styles";

export default function Pools() {
    const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

    const [data, setData] = React.useState<PoolType[] | null>(null);
    const [currentFilter, setCurrentFilter] = React.useState<any>(POOL_FILTERS[0]);

    React.useEffect(() => {
        if (poolsReducer.data) {
            setData(poolsReducer.data);
        }
    }, [poolsReducer.data])

    function getPoolFilter(option: string) {
        for (let i = 0; i < POOL_FILTERS.length; i++) {
            if (POOL_FILTERS[i].title === option) {
                return POOL_FILTERS[i];
            }
        }
    }

    function getData() {
        if (data) {
            return (
                <S.Wrapper>
                    <PoolsHeader />
                    <PoolsGrid
                        data={currentFilter.fn(data!)}
                        title={currentFilter.title}
                        setCurrentFilter={(option: string) => setCurrentFilter(getPoolFilter(option))}
                    />
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
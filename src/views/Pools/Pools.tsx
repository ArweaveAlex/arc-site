import React from "react";

import { getPools } from "gql/pools";

import { PoolsHeader } from "./PoolsHeader";
import { PoolsGrid } from "./PoolsGrid";

import { Loader } from "components/atoms/Loader";

import { PoolType } from "types";
import { POOL_FILTERS } from "config";
import * as S from "./styles";

export default function Pools() {
    const [data, setData] = React.useState<PoolType[] | null>(null);
    const [currentFilter, setCurrentFilter] = React.useState<any>(POOL_FILTERS[0]);

    React.useEffect(() => {
        (async function () {
            setData(await getPools());
        })()
    }, [])

    function getPoolFilter(option: string) {
        for (let i = 0; i < POOL_FILTERS.length; i++) {
            if (POOL_FILTERS[i].title === option) {
                return POOL_FILTERS[i];
            }
        }
    }

    return data ? (
        <S.Wrapper>
            <PoolsHeader />
            <PoolsGrid 
                data={currentFilter.fn(data!)} 
                title={currentFilter.title}
                setCurrentFilter={(option: string) => setCurrentFilter(getPoolFilter(option))}
            />
        </S.Wrapper>
    ) : <Loader />
}
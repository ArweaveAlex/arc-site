import React from "react";

import { getCollections } from "gql/collections";

import { CollectionsHeader } from "./CollectionsHeader";
import { CollectionsGrid } from "./CollectionsGrid";

import { Loader } from "components/atoms/Loader";

import { CollectionType } from "types";
import { collectionFilters } from "config";
import * as S from "./styles";

export default function Collections() {
    const [data, setData] = React.useState<CollectionType[] | null>(null);
    const [currentFilter, setCurrentFilter] = React.useState(collectionFilters[0]);

    React.useEffect(() => {
        (async function () {
            // TODO - On select change in grid resort data - cache all to resort by all
            setData(await getCollections());
        })()
    }, [])

    return data ? (
        <S.Wrapper>
            <CollectionsHeader />
            <CollectionsGrid 
                data={currentFilter.fn(data!)} 
                title={currentFilter.title}
                setCurrentFilter={(filter) => setCurrentFilter(filter)}
            />
        </S.Wrapper>
    ) : <Loader />
}
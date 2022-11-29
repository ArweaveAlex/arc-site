import React from "react";

import { getCollections } from "gql/collections";

import { CollectionsHeader } from "./CollectionsHeader";
import { CollectionsGrid } from "./CollectionsGrid";

import { Loader } from "components/atoms/Loader";

import { LANGUAGE } from "language";
import * as S from "./styles";

export default function Collections() {
    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        (async function () {
            // TODO - On select change in grid resort data - cache all to resort by all
            setData(await getCollections());
        })()
    }, [])

    function getTitle() {
        return LANGUAGE.collections.gridTitles.all
    }

    return data ? (
        <S.Wrapper>
            <CollectionsHeader />
            <CollectionsGrid data={data} title={getTitle()}/>
        </S.Wrapper>
    ) : <Loader />
}
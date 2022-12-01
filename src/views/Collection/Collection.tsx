import React from "react";
import { useParams } from "react-router-dom";

import { getCollectionById, getCollectionCount } from "gql/collections";
import { getArtifactsByCollection } from "gql/artifacts";

import { Loader } from "components/atoms/Loader";

import { CollectionHeader } from "./CollectionHeader";
import { CollectionStatistics } from "./CollectionStatistics";
import { CollectionDetail } from "./CollectionDetail";

import { CollectionType, ArtifactResponseType } from "types";
import { getTxEndpoint } from "endpoints";
import { formatDate, getTagValue } from "utils";
import { TAGS, FALLBACK_IMAGE } from "config";
import { REDUX_CURSORS } from "redux-config";
import { LANGUAGE } from "language";
import * as S from "./styles";

export default function Collection() {
    const { id } = useParams();

    const [cursor, setCursor] = React.useState<string | null>(null);
    const [count, setCount] = React.useState<string | null>(null);
    const [headerData, setHeaderData] = React.useState<CollectionType | null>(null);
    const [detailData, setDetailData] = React.useState<ArtifactResponseType | null>(null);

    // TODO - Clear cursors on new collection page

    React.useEffect(() => {
        (async function () {
            if (id) {
                setHeaderData(await getCollectionById(id));
                setDetailData((await getArtifactsByCollection({
                    collectionIds: [id],
                    owner: null,
                    cursor: cursor,
                    reduxCursor: REDUX_CURSORS.collectionAll
                })));
            }
        })();
        /*  ESLint used to avoid warning with detailData.nextCursor not being used in dependency array
            By adding detailData.nextCursor to dependency array this effect will continue to run
            getArtifactsByCollection and return each subsequent query set */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, cursor])

    React.useEffect(() => {
        (async function () {
            if (detailData && detailData.contracts.length > 0) {
                setCount((await getCollectionCount(getTagValue(detailData.contracts[0].node.tags, TAGS.keys.contractSrc))).toString())
            }
        })();
    }, [detailData])

    function checkState() {
        return headerData;
    }

    function getCollectionHeader() {
        if (headerData) {
            return (
                <CollectionHeader 
                    id={headerData.id}
                    image={getTxEndpoint(headerData.state.image.length > 0 ? headerData.state.image : FALLBACK_IMAGE)}
                    title={headerData.state.title}
                    description={headerData.state.description}
                    dateCreated={formatDate(headerData.state.timestamp, "epoch")}
                    count={count ? count : `-`}
                    totalContributions={headerData.state.totalContributions}
                    contributors={headerData.state.contributors}
                />
            )
        }
        else {
            return null;
        }
    }

    function getCollectionStatistics() {
        if (headerData && detailData) {
            return (
                <CollectionStatistics
                    headerData={headerData}
                    detailData={detailData}
                />
            )
        }
        else {
            return null;
        }
    }

    function getCollectionDetail() {
        if (detailData) {
            return (
                <CollectionDetail
                    data={detailData}
                    handleUpdateFetch={(cursor: string | null) => setCursor(cursor)}
                    cursors={{
                        next: detailData.nextCursor,
                        previous: detailData.previousCursor
                    }}
                />
            )
        }
        else {
            return (
                <p>{LANGUAGE.loading}&nbsp;...</p>
            )
        }
    }

    return checkState() ? (
        <S.Wrapper>
            {getCollectionHeader()}
            {getCollectionStatistics()}
            {getCollectionDetail()}
        </S.Wrapper>
    ) : <Loader />
}
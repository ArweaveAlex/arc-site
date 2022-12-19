import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPoolById, getPoolCount } from "gql/pools";
import { getArtifactsByPool } from "gql/artifacts";

import { Loader } from "components/atoms/Loader";

import { PoolHeader } from "./PoolHeader";
import { PoolStatistics } from "./PoolStatistics";
import { PoolDetail } from "./PoolDetail";

import { clearCursors } from "redux/cursors/actions";
import { PoolType, ArtifactResponseType } from "types";
import { getTxEndpoint } from "endpoints";
import { formatDate, getTagValue } from "utils";
import { TAGS, FALLBACK_IMAGE } from "config";
import { REDUX_CURSORS } from "redux-config";
import * as S from "./styles";

import { searchTerm } from "../../search";

export default function Pool() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [cursor, setCursor] = React.useState<string | null>(null);
    const [count, setCount] = React.useState<string | null>(null);
    const [headerData, setHeaderData] = React.useState<PoolType | null>(null);
    const [detailData, setDetailData] = React.useState<ArtifactResponseType | null>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        (async function () {
                let searchResults = await searchTerm(id, "TOIAlerts");
        })();
    }, []);

    React.useEffect(() => {
        dispatch(clearCursors());
    }, [dispatch])

    React.useEffect(() => {
        (async function () {
            if (id) {
                setHeaderData(await getPoolById(id));
            }
        })();
    }, [id, cursor])

    React.useEffect(() => {
        (async function () {
            if (id && headerData) {
                setDetailData((await getArtifactsByPool({
                    poolIds: [id],
                    owner: null,
                    uploader: headerData.state.owner,
                    cursor: cursor,
                    reduxCursor: REDUX_CURSORS.poolAll
                })));
            }
        })();
    }, [id, headerData, cursor])

    React.useEffect(() => {
        (async function () {
            if (detailData && detailData.contracts.length > 0) {
                setCount((await getPoolCount(getTagValue(detailData.contracts[0].node.tags, TAGS.keys.contractSrc))).toString())
            }
        })();
    }, [detailData])

    React.useEffect(() => {
        (async function () {
            if (headerData) {
                const imageResponse = (await fetch(getTxEndpoint(headerData.state.image.length > 0 ? headerData.state.image : FALLBACK_IMAGE)));
                setImageUrl(imageResponse.status === 200 ? imageResponse.url : getTxEndpoint(FALLBACK_IMAGE));
            }
        })()
    }, [headerData])

    function checkState() {
        return headerData;
    }

    function getPoolsHeader() {
        if (headerData && imageUrl) {
            return (
                <PoolHeader
                    id={headerData.id}
                    image={imageUrl}
                    title={headerData.state.title}
                    description={headerData.state.description}
                    dateCreated={formatDate(headerData.state.timestamp, "epoch")}
                    count={count}
                    totalContributions={headerData.state.totalContributions}
                    contributors={headerData.state.contributors}
                />
            )
        }
        else {
            return null;
        }
    }

    function getPoolStatistics() {
        if (headerData && detailData) {
            return (
                <PoolStatistics
                    headerData={headerData}
                    detailData={detailData}
                />
            )
        }
        else {
            return null;
        }
    }

    function getPoolDetail() {
        if (detailData) {
            return (
                <PoolDetail
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
                null
            )
        }
    }

    return checkState() ? (
        <S.Wrapper>
            {getPoolsHeader()}
            {getPoolStatistics()}
            {getPoolDetail()}
        </S.Wrapper>
    ) : <Loader />
}
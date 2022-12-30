import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "redux/store";
import { getPoolById, getPoolCount } from "gql/pools";
import { getArtifactsByPool, getArtifactsByIds } from "gql/artifacts";

import { Loader } from "components/atoms/Loader";

import { PoolHeader } from "./PoolHeader";
import { PoolStatistics } from "./PoolStatistics";
import { PoolDetail } from "./PoolDetail";

import { clearCursors } from "redux/cursors/actions";
import { PoolType, ArtifactResponseType, CursorEnum } from "config/types";
import { getTxEndpoint } from "config/endpoints";
import { formatDate, getTagValue } from "config/utils";
import { TAGS, FALLBACK_IMAGE } from "config";
import { REDUX_CURSORS } from "config/redux";
import * as S from "./styles";

export default function Pool() {
    const dispatch = useDispatch();

    const { id } = useParams();
    const searchIdsReducer = useSelector((state: RootState) => state.searchIdsReducer);

    const [headerData, setHeaderData] = React.useState<PoolType | null>(null);
    const [detailData, setDetailData] = React.useState<ArtifactResponseType | null>(null);

    const [cursor, setCursor] = React.useState<string | null>(null);
    const [searchRequested, setSearchRequested] = React.useState<boolean>(false);

    const [count, setCount] = React.useState<number | null>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        dispatch(clearCursors());
    }, [dispatch])

    React.useEffect(() => {
        (async function () {
            if (id) {
                setHeaderData(await getPoolById(id));
            }
        })();
    }, [id])

    React.useEffect(() => {
        (async function () {
            if (searchRequested && searchIdsReducer[REDUX_CURSORS.poolAll] && searchIdsReducer[REDUX_CURSORS.poolAll].length > 0) {
                setDetailData(null);
                setDetailData((await getArtifactsByIds({
                    ids: null,
                    owner: null,
                    uploader: null,
                    cursor: cursor,
                    reduxCursor: REDUX_CURSORS.poolAll
                })));
            }
        })()
    }, [searchRequested, searchIdsReducer, cursor])

    React.useEffect(() => {
        (async function () {
            if (id && headerData && !searchRequested) {
                // TODO - Handle Clear / Cache Search Term / Search from second page - non-search request
                setDetailData(null);
                setDetailData((await getArtifactsByPool({
                    ids: [id],
                    owner: null,
                    uploader: headerData.state.owner,
                    cursor: cursor,
                    reduxCursor: REDUX_CURSORS.poolAll
                })))
            }
        })();
    }, [id, headerData, cursor, searchRequested])

    React.useEffect(() => {
        (async function () {
            if (detailData && detailData.contracts.length > 0) {
                setCount((await getPoolCount(getTagValue(detailData.contracts[0].node.tags, TAGS.keys.contractSrc))))
            }
            else {
                if (detailData && detailData.contracts.length <= 0) {
                    setCount(0);
                }
            }
        })();
    }, [detailData])

    React.useEffect(() => {
        (async function () {
            if (headerData) {
                const imageResponse = (await fetch(getTxEndpoint(headerData.state.image.length > 0 ?
                    headerData.state.image : FALLBACK_IMAGE)));
                setImageUrl(imageResponse.status === 200 ? imageResponse.url : getTxEndpoint(FALLBACK_IMAGE));
            }
        })()
    }, [headerData])

    function getPoolHeader() {
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
        return (
            <PoolDetail
                id={{
                    value: id,
                    type: "poolId"
                }}
                data={detailData}
                handleCursorFetch={(cursor: string | null) => setCursor(cursor)}
                cursors={{
                    next: detailData?.nextCursor ?? null,
                    previous: detailData?.previousCursor ?? null
                }}
                cursorObject={{
                    key: CursorEnum.Search,
                    value: REDUX_CURSORS.poolAll
                }}
                setSearchRequested={(searchRequested: boolean) => setSearchRequested(searchRequested)}
            />

        )
    }

    return headerData ? (
        <S.Wrapper>
            {getPoolHeader()}
            {getPoolStatistics()}
            {getPoolDetail()}
        </S.Wrapper>
    ) : <Loader />
}
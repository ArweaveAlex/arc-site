import React from "react";
import { useParams } from "react-router-dom";

import { getPoolById, getPoolCount } from "gql/pools";

import { Loader } from "components/atoms/Loader";

import { PoolHeader } from "./PoolHeader";
import { PoolStatistics } from "./PoolStatistics";
import { PoolDetail } from "./PoolDetail";

import { PoolType, CursorEnum } from "config/types";
import { getTxEndpoint } from "config/endpoints";
import { formatDate, getTagValue } from "config/utils";
import { TAGS, FALLBACK_IMAGE } from "config";
import { REDUX_TABLES } from "config/redux";
import * as S from "./styles";
import { getArtifactsByPool } from "gql/artifacts";

export default function Pool() {
    const { id } = useParams();

    const [headerData, setHeaderData] = React.useState<PoolType | null>(null);

    const [count, setCount] = React.useState<number | null>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        (async function () {
            if (id) {
                setHeaderData(await getPoolById(id));
            }
        })();
    }, [id])

    React.useEffect(() => {
        (async function () {
            if (id && headerData) {
                let detailData = await getArtifactsByPool({
                    ids: [id],
                    owner: null,
                    uploader: headerData.state.owner,
                    cursor: null,
                    reduxCursor: REDUX_TABLES.poolAll
                });

                if (detailData && detailData.contracts.length > 0) {
                    setCount((await getPoolCount(getTagValue(detailData.contracts[0].node.tags, TAGS.keys.contractSrc))));
                } else {
                    setCount(0);
                }
            }
        })();
    }, [id, headerData])

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

    function getPoolStatistics() {
        return (
            <PoolStatistics headerData={headerData} />
        )
    }

    function getPoolDetail() {
        return (
            <PoolDetail
                id={{ value: id, type: "poolId" }}
                cursorObject={{
                    key: CursorEnum.Search,
                    value: REDUX_TABLES.poolAll
                }}
                uploader={headerData.state.owner}
            />
        )
    }

    return headerData ? (
        <>
            <S.Wrapper>
                {getPoolHeader()}
                {getPoolStatistics()}
                {getPoolDetail()}
            </S.Wrapper>
        </>
    ) : <Loader />
}
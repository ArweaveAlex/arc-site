import React from "react";
import { useParams } from "react-router-dom";

import { useARProvder } from "providers/ARProvider";

import { Loader } from "components/atoms/Loader";

import { CollectionHeader } from "./CollectionHeader";
import { CollectionDetail } from "./CollectionDetail";

import { CollectionType, ArtifactResponseType } from "types";
import { getTxEndpoint } from "endpoints";
import { formatDate } from "utils";
import * as S from "./styles";

export default function Collection() {
    const { id } = useParams();

    const arProvider = useARProvder();

    const [headerData, setHeaderData] = React.useState<CollectionType | null>(null);
    const [detailData, setDetailData] = React.useState<ArtifactResponseType>({ cursor: null, contracts: [] });

    const [state, setState] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {
            setHeaderData(await arProvider.getPoolById(id!));
            setDetailData((await arProvider.getAllArtifactsByPool(id!, detailData.cursor ? detailData.cursor : null)));
        })();
    }, [arProvider.walletAddress, state])

    function handleUpdateFetch() {
        setState(!state);
    }

    return (headerData && detailData) ? (
        <S.Wrapper>
            <CollectionHeader
                id={headerData.id}
                image={getTxEndpoint(headerData.state.image)}
                title={headerData.state.title}
                description={headerData.state.description}
                dateCreated={formatDate(headerData.state.timestamp, "epoch")}
                count={detailData ? detailData.contracts.length : 0}
                totalContributions={arProvider.getARAmount(headerData.state.totalContributions)}
            />
            <CollectionDetail
                data={detailData}
                handleUpdateFetch={handleUpdateFetch}
            />
        </S.Wrapper>
    ) : <Loader />
}
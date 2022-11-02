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
    const [detailData, setDetailData] = React.useState<ArtifactResponseType>({ cursor: null, contracts: [], count: null });

    const [state, setState] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {
            setHeaderData(await arProvider.getPoolById(id!));
            setDetailData((await arProvider.getAllArtifactsByPool([id!], detailData.cursor ? detailData.cursor : null, null)));
        })();
        // ESLinst used to avoid warning with detailData.cursor not being used in dependency array
        // By adding detailData.cursor to dependency array this effect will continue to run
        // getAllArtifactsByPool and return each subsequent query set
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arProvider, arProvider.walletAddress, state, id])

    function handleUpdateFetch() {
        setState(!state);
    }

    function checkState() {
        return headerData && (detailData && (detailData.count !== null));
    }

    return checkState() ? (
        <S.Wrapper>
            <CollectionHeader
                id={headerData!.id}
                image={getTxEndpoint(headerData!.state.image)}
                title={headerData!.state.title}
                description={headerData!.state.description}
                dateCreated={formatDate(headerData!.state.timestamp, "epoch")}
                count={detailData.count!}
                totalContributions={arProvider.getARAmount(headerData!.state.totalContributions)}
            />
            <CollectionDetail
                data={detailData}
                handleUpdateFetch={handleUpdateFetch}
            />
        </S.Wrapper>
    ) : <Loader />
}
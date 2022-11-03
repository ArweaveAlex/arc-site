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

    const [cursor, setCursor] = React.useState<string | null>(null);
    const [headerData, setHeaderData] = React.useState<CollectionType | null>(null);
    const [detailData, setDetailData] = React.useState<ArtifactResponseType>({
        nextCursor: null,
        previousCursor: null,
        contracts: [],
        count: null
    });

    React.useEffect(() => {
        (async function () {
            setHeaderData(await arProvider.getPoolById(id!));
            setDetailData((await arProvider.getAllArtifactsByPool({ 
                poolIds: [id!], 
                cursor: cursor, 
                owner: null 
            })));
        })();
        /*  ESLint used to avoid warning with detailData.nextCursor not being used in dependency array
            By adding detailData.nextCursor to dependency array this effect will continue to run
            getAllArtifactsByPool and return each subsequent query set */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arProvider, arProvider.walletAddress, id, cursor])

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
                handleUpdateFetch={(cursor: string | null) => setCursor(cursor)}
                cursors={{
                    next: detailData.nextCursor,
                    previous: detailData.previousCursor
                }}
            />
        </S.Wrapper>
    ) : <Loader />
}
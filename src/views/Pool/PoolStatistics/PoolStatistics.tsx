import { PoolRecentlyMinted } from "./PoolRecentlyMinted";
import { PoolContributors } from "./PoolContributors";

import { IProps } from "./types";
import * as S from "./styles";

import { getRedstoneDescEndpoint } from "config/endpoints";
import React from "react";
import { REDUX_TABLES } from "config/redux";
import { getArtifactsByIds, getArtifactsByPool } from "gql/artifacts";
import { getTagValue } from "config/utils";
import { TAGS } from "config";
import { ArtifactResponseType, GQLResponseType } from "config/types";

export default function PoolStatistics(props: IProps) {
    const [detailData, setDetailData] = React.useState<ArtifactResponseType | null>(null);

    React.useEffect(() => {
        (async function () {
            if(props.headerData) {
                let dataForTags = await getArtifactsByPool({
                    ids: [props.headerData.id],
                    owner: null,
                    uploader: props.headerData.state.owner,
                    cursor: null,
                    reduxCursor: REDUX_TABLES.poolAll
                });
                if(dataForTags && (dataForTags.contracts.length > 0)) {
                    let nftContractSrc = getTagValue(dataForTags.contracts[0].node.tags, TAGS.keys.contractSrc);
                    let redstoneContracts = await fetch(getRedstoneDescEndpoint(nftContractSrc));
                    let json = await redstoneContracts.json();
                    let ids = json.contracts.map((c: any) => {return c.contractId});
                    let detailDataFinal = await getArtifactsByIds({
                        ids: ids,
                        owner: null,
                        uploader: null,
                        cursor: null,
                        reduxCursor: null
                    });
                    setDetailData(detailDataFinal);
                }
            }
        })();
    }, [])

    return (
        <S.Wrapper>
            {detailData && 
                <PoolRecentlyMinted data={detailData.contracts} />
            }

            <PoolContributors data={props.headerData} />
        </S.Wrapper>
    )
}
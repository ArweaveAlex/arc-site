import { PoolRecentlyMinted } from "./PoolRecentlyMinted";
import { PoolContributors } from "./PoolContributors";

import { IProps } from "./types";
import * as S from "./styles";

import { getRedstoneDescEndpoint } from "helpers/endpoints";
import React from "react";
import { REDUX_TABLES } from "helpers/redux";
import { getArtifactsByIds, getArtifactsByPool } from "gql/artifacts";
import { getTagValue } from "helpers/utils";
import { TAGS } from "helpers/config";
import { ArtifactResponseType } from "helpers/types";

export default function PoolStatistics(props: IProps) {
    const [detailData, setDetailData] = React.useState<ArtifactResponseType | null>(null);

    React.useEffect(() => {
        (async function () {
            if (props.headerData) {
                const dataForTags = await getArtifactsByPool({
                    ids: [props.headerData.id],
                    owner: null,
                    uploader: props.headerData.state.owner,
                    cursor: null,
                    reduxCursor: REDUX_TABLES.poolAll
                });
                if (dataForTags && (dataForTags.contracts.length > 0)) {
                    const nftContractSrc = getTagValue(dataForTags.contracts[0].node.tags, TAGS.keys.contractSrc);
                    const redstoneContracts = await fetch(getRedstoneDescEndpoint(nftContractSrc));
                    const redstoneJson = await redstoneContracts.json();
                    const ids = redstoneJson.contracts.map((contract: any) => { return contract.contractId });
                    const detailDataFinal = await getArtifactsByIds({
                        ids: ids,
                        owner: null,
                        uploader: null,
                        cursor: null,
                        reduxCursor: null
                    });
                    setDetailData(detailDataFinal);
                }
                else {
                    if (dataForTags && (dataForTags.contracts.length <= 0)) {
                        setDetailData({
                            nextCursor: null,
                            previousCursor: null,
                            contracts: []
                        })
                    }
                }
            }
        })();
    }, [props.headerData])

    return (
        <S.Wrapper>
            <PoolRecentlyMinted data={detailData} />
            <PoolContributors data={props.headerData} />
        </S.Wrapper>
    )
}
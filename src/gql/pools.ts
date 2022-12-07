import { ArweaveClient } from "arweave-client";
import {
    GQLResponseType,
    PoolType
} from "types";
import { getRedstoneSrcTxEndpoint } from "endpoints";
import { getGQLData } from "gql";
import { getTagValue } from "utils";
import { TAGS } from "config";

export async function getPoolIds() {
    const pools: GQLResponseType[] = await getGQLData({
        ids: null,
        tagFilters: [
            {
                name: TAGS.keys.appType, 
                values: [
                    TAGS.values.poolVersions["1.2"],
                    TAGS.values.poolVersions["1.4"]
                ]
            }
        ],
        uploader: null,
        cursor: null,
        reduxCursor: null
    });

    return pools.map((pool: GQLResponseType) => {
        switch (getTagValue(pool.node.tags, TAGS.keys.appType)) {
            case TAGS.values.poolVersions["1.2"]:
                return pool.node.id;
            case TAGS.values.poolVersions["1.4"]:
                return getTagValue(pool.node.tags, TAGS.keys.uploaderTxId);
            default:
                return getTagValue(pool.node.tags, TAGS.keys.uploaderTxId);
        }
    });
}

export async function getPools(): Promise<PoolType[]> {
    const arClient = new ArweaveClient();

    const pools: PoolType[] = [];
    const poolIds = await getPoolIds();

    for (let i = 0; i < poolIds.length; i++) {
        try {
            const contract = arClient.smartweave.contract(poolIds[i]!);
            try {
                pools.push({ id: poolIds[i], state: (await contract.readState() as any).state });
            }
            catch (error: any) {
                console.error(error);
            }
        }
        catch (error: any) {
            console.error(error)
        }
    }

    return pools;
}

export async function getPoolById(poolId: string): Promise<PoolType | null> {
    const arClient = new ArweaveClient();

    try {
        const contract = arClient.smartweave.contract(poolId)
        return { id: poolId, state: (await contract.readState() as any).state };
    }
    catch (error: any) {
        console.error(error)
        return null
    }
}

export async function getPoolCount(nftContractSrc: string): Promise<number> {
    let redstoneContracts = await fetch(getRedstoneSrcTxEndpoint(nftContractSrc));
    let redstoneJson = await redstoneContracts.json();
    return parseInt(redstoneJson.paging.total);
}
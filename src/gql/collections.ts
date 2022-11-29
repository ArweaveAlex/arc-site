import { ArweaveClient } from "arweave-client";
import {
    GQLResponseType,
    CollectionType
} from "types";
import { getRedstoneSrcTxEndpoint } from "endpoints";
import { getDataByTags } from "gql";
import { getTagValue } from "utils";
import { TAGS } from "config";

export async function getCollectionIds() {
    const collections: GQLResponseType[] = await getDataByTags([
        { name: TAGS.keys.appType, values: [TAGS.values.poolv1, TAGS.values.poolv2] }
    ]);

    return collections.map((collection: GQLResponseType) => {
        if (getTagValue(collection.node.tags, TAGS.keys.appType) === TAGS.values.poolv1) {
            return collection.node.id;
        }
        else {
            return getTagValue(collection.node.tags, TAGS.keys.uploaderTxId)
        }
    });
}

export async function getCollections() {
    const arClient = new ArweaveClient();

    const collections: CollectionType[] = [];
    const collectionIds = await getCollectionIds();

    for (let i = 0; i < collectionIds.length; i++) {
        try {
            const contract = arClient.smartweave.contract(collectionIds[i]!);
            try {
                collections.push({ id: collectionIds[i], state: (await contract.readState() as any).state });
            }
            catch (error: any) {
                console.error(error);
            }
        }
        catch (error: any) {
            console.error(error)
        }
    }

    return collections;
}

export async function getCollectionById(collectionId: string): Promise<CollectionType | null> {
    const arClient = new ArweaveClient();
    
    try {
        const contract = arClient.smartweave.contract(collectionId);
        return { id: collectionId, state: (await contract.readState() as any).state };
    }
    catch (error: any) {
        console.error(error)
        return null
    }
}

export async function getCollectionCount(nftContractSrc: string): Promise<number> {
    let redstoneContracts = await fetch(getRedstoneSrcTxEndpoint(nftContractSrc));
    let redstoneJson = await redstoneContracts.json();
    return parseInt(redstoneJson.paging.total);
}
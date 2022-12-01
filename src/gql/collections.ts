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
    const collections: GQLResponseType[] = await getDataByTags({
        tagFilters: [
            {
                name: TAGS.keys.appType, 
                values: [
                    TAGS.values.collectionVersions["1.2"],
                    TAGS.values.collectionVersions["1.4"]
                ]
            }
        ], 
        cursor: null,
        reduxCursor: null
    });

    return collections.map((collection: GQLResponseType) => {
        switch (getTagValue(collection.node.tags, TAGS.keys.appType)) {
            case TAGS.values.collectionVersions["1.2"]:
                return collection.node.id;
            case TAGS.values.collectionVersions["1.4"]:
                return getTagValue(collection.node.tags, TAGS.keys.uploaderTxId);
            default:
                return getTagValue(collection.node.tags, TAGS.keys.uploaderTxId);
        }
    });
}

export async function getCollections(): Promise<CollectionType[]> {
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
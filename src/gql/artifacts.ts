import { store } from "redux/store";
import * as artifactActions from "redux/artifacts/actions";
import { ArweaveClient } from "clients/arweave";
import {
    ArtifactDetailType,
    ArtifactArgsType,
    ArtifactResponseType,
    CollectionResponseType,
    PoolType,
    GQLResponseType,
    TagFilterType,
    CursorEnum
} from "config/types";
import { getGQLData } from "gql";
import { getTxEndpoint } from "config/endpoints";
import { getPoolById, getPoolIds } from "./pools";
import { checkGqlCursor, getTagValue } from "config/utils";
import { LANGUAGE } from "config/language";
import { TAGS, STORAGE, CURSORS } from "config";

const arClient = new ArweaveClient();

export async function getArtifactsByAssociation(artifactId: string, callback: (artifacts: ArtifactDetailType | ArtifactDetailType[]) => void): Promise<void> {
    const artifacts: ArtifactDetailType[] = [];

    const artifact: GQLResponseType = (await getGQLData({
        ids: [artifactId],
        tagFilters: null,
        uploader: null,
        cursor: null,
        reduxCursor: null,
        cursorObject: null
    }))[0];

    if (artifact) {
        const associationId = getTagValue(artifact.node.tags, TAGS.keys.associationId);
        if (associationId && (associationId !== STORAGE.none)) {
            const gqlArtifacts: GQLResponseType[] = await getGQLData({
                ids: null,
                tagFilters: [
                    {
                        name: TAGS.keys.associationId,
                        values: [associationId]
                    }
                ],
                uploader: null,
                cursor: null,
                reduxCursor: null,
                cursorObject: null
            });

            for (let i = 0; i < gqlArtifacts.length; i++) {
                artifacts.push(await getArtifact(gqlArtifacts[i]));
                callback(artifacts);
            }
        }
        else {
            return callback(await getArtifact(artifact));
        }
    }
}

export async function getArtifactById(artifactId: string): Promise<ArtifactDetailType | null> {
    const artifact: GQLResponseType = (await getGQLData({
        ids: [artifactId],
        tagFilters: null,
        uploader: null,
        cursor: null,
        reduxCursor: null,
        cursorObject: null
    }))[0];

    if (artifact) {
        return await getArtifact(artifact)
    }
    else {
        return null
    }
}

export async function getArtifact(artifact: GQLResponseType): Promise<ArtifactDetailType | null> {
    let pool: PoolType | null = await getPoolById(getTagValue(artifact.node.tags, TAGS.keys.poolId));

    try {
        const response = await fetch(getTxEndpoint(artifact.node.id));
        if (response.status === 200 && artifact) {
            try {
                return ({
                    artifactId: artifact.node.id,
                    artifactName: getTagValue(artifact.node.tags, TAGS.keys.artifactName),
                    artifactType: getTagValue(artifact.node.tags, TAGS.keys.artifactType) as any,
                    associationId: getTagValue(artifact.node.tags, TAGS.keys.associationId),
                    associationSequence: getTagValue(artifact.node.tags, TAGS.keys.associationSequence),
                    profileImagePath: getTagValue(artifact.node.tags, TAGS.keys.profileImage),
                    owner: getTagValue(artifact.node.tags, TAGS.keys.initialOwner),
                    ansTitle: getTagValue(artifact.node.tags, TAGS.keys.ansTitle),
                    minted: getTagValue(artifact.node.tags, TAGS.keys.dateCreated),
                    keywords: getTagValue(artifact.node.tags, TAGS.keys.keywords),
                    mediaIds: getTagValue(artifact.node.tags, TAGS.keys.mediaIds),
                    poolName: pool ? pool.state.title : null,
                    poolId: pool ? pool.id : null,
                    dataUrl: response.url,
                    dataSize: artifact ? artifact.node.data.size : null,
                    rawData: await response.text(),
                });
            }
            catch (error: any) {
                console.error(error);
                return null;
            }
        }
        else {
            return null;
        }
    }
    catch (error: any) {
        console.error(error);
        return null;
    }
}

export async function getArtifactsByPool(args: ArtifactArgsType): Promise<ArtifactResponseType> {
    let tagFilters: TagFilterType[] = [{
        name: TAGS.keys.poolId,
        values: args.ids!
    }];

    if (args.owner) {
        tagFilters.push({
            name: TAGS.keys.initialOwner,
            values: [args.owner]
        });
    }

    const artifacts: GQLResponseType[] = (await getGQLData({
        ids: null,
        tagFilters: tagFilters,
        uploader: args.uploader,
        cursor: args.cursor,
        reduxCursor: args.reduxCursor,
        cursorObject: CursorEnum.GQL
    })).filter((element: GQLResponseType) => {
        return getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none;
    })

    let cursorState: any;
    if (args.reduxCursor) {
        cursorState = store.getState().cursorsReducer.gql[args.reduxCursor];
    }

    let nextCursor: string | null = cursorState ? cursorState.next : null;
    let previousCursor: string | null = cursorState ? cursorState.previous : null;

    return ({
        nextCursor: nextCursor,
        previousCursor: previousCursor,
        contracts: artifacts
    });
}

export async function getArtifactsByIds(args: ArtifactArgsType): Promise<ArtifactResponseType> {
    let cursor: string | null = null;
    if (args.cursor !== CURSORS.p1 && args.cursor !== CURSORS.end && !checkGqlCursor(args.cursor)) {
        cursor = args.cursor;
    }

    const artifacts: GQLResponseType[] = (await getGQLData({
        ids: args.ids,
        tagFilters: null,
        uploader: args.uploader,
        cursor: cursor,
        reduxCursor: args.reduxCursor,
        cursorObject: CursorEnum.Search
    })).filter((element: GQLResponseType) => {
        return getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none;
    })

    let cursorState: any;
    if (args.reduxCursor) {
        cursorState = store.getState().cursorsReducer.search[args.reduxCursor];
    }

    let nextCursor: string | null = cursorState ? cursorState.next : null;
    let previousCursor: string | null = cursorState ? cursorState.previous : null;

    return ({
        nextCursor: nextCursor,
        previousCursor: previousCursor,
        contracts: artifacts
    });
}

export async function getArtifactsByUser(args: ArtifactArgsType) {
    const poolIds = await getPoolIds();

    const artifacts = await getArtifactsByPool({
        ids: poolIds,
        owner: args.owner,
        uploader: null,
        cursor: args.cursor,
        reduxCursor: args.reduxCursor
    });
    return artifacts;
}

export async function getArtifactsByCollections(args: ArtifactArgsType): Promise<ArtifactResponseType> {
    const collectionsReducer = store.getState().collectionsReducer;
    let collectionIds: string[];

    if (collectionsReducer.owner === args.owner) {
        collectionIds = collectionsReducer.ids;
    }
    else {
        if (args.owner) {
            collectionIds = await getCollectionIds(args.owner);
        }
        else {
            collectionIds = [];
        }
    }

    const artifacts: GQLResponseType[] = await getGQLData({
        ids: collectionIds,
        tagFilters: null,
        uploader: null,
        cursor: args.cursor,
        reduxCursor: args.reduxCursor,
        cursorObject: CursorEnum.GQL
    });

    let cursorState: any;
    if (args.reduxCursor) {
        cursorState = store.getState().cursorsReducer[args.reduxCursor];
    }

    let nextCursor: string | null = cursorState ? cursorState.next : null;
    let previousCursor: string | null = cursorState ? cursorState.previous : null;

    return ({
        nextCursor: nextCursor,
        previousCursor: previousCursor,
        contracts: artifacts.filter(
            (element: GQLResponseType) => getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none)
    });
}

export async function getCollectionIds(owner: string): Promise<string[]> {
    const collections: GQLResponseType[] = await getGQLData({
        ids: null,
        tagFilters: [
            { name: TAGS.keys.collectionSearch, values: [owner] }
        ],
        uploader: null,
        cursor: null,
        reduxCursor: null,
        cursorObject: null
    });

    if (collections.length > 0) {
        let recentDate = Number(getTagValue(collections[0].node.tags, TAGS.keys.dateCreated)!)

        for (let i = 0; i < collections.length; i++) {
            const date = Number(getTagValue(collections[i].node.tags, TAGS.keys.dateCreated)!);
            recentDate = Math.max(recentDate, date);
        }

        for (let i = 0; i < collections.length; i++) {
            if (recentDate === Number(getTagValue(collections[i].node.tags, TAGS.keys.dateCreated)!)) {
                return JSON.parse(getTagValue(collections[i].node.tags, TAGS.keys.collectionIds)!);
            }
        }

        return [];
    }
    else {
        return [];
    }
}

export async function setCollectionIds(owner: string, ids: string[]): Promise<CollectionResponseType> {
    let txRes = await arClient.arweavePost.createTransaction({ data: JSON.stringify(ids) }, "use_wallet");
    txRes.addTag(TAGS.keys.collectionSearch, owner);
    txRes.addTag(TAGS.keys.dateCreated, Date.now().toString());
    txRes.addTag(TAGS.keys.collectionIds, JSON.stringify(ids));

    const response = await global.window.arweaveWallet.dispatch(txRes);

    if (response.id) {
        store.dispatch(artifactActions.setCollection({
            owner: owner,
            ids: ids
        }));
    }

    return ({
        status: response.id ? 200 : 500,
        message: response.id ? LANGUAGE.bookmarksUpdated : LANGUAGE.errorOccurred
    })
}
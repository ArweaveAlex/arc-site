import { store } from "redux/store";
import * as artifactActions from "redux/artifacts/actions";
import { ArweaveClient } from "arweave-client";
import {
    ArtifactType,
    ArtifactArgsType,
    ArtifactResponseType,
    BookmarkResponseType,
    PoolType,
    GQLResponseType,
    TagFilterType
} from "types";
import { getGQLData } from "gql";
import { getTxEndpoint } from "endpoints";
import { getPoolById, getPoolIds } from "./pools";
import { getTagValue } from "utils";
import { LANGUAGE } from "language";
import { TAGS, STORAGE } from "config";

const arClient = new ArweaveClient();

export async function getArtifactById(artifactId: string): Promise<ArtifactType | null> {
    const artifact: GQLResponseType = (await getGQLData({
        ids: [artifactId],
        tagFilters: null,
        uploader: null,
        cursor: null,
        reduxCursor: null
    }))[0];

    let pool: PoolType | null = await getPoolById(getTagValue(artifact.node.tags, TAGS.keys.poolId));

    try {
        const response = await fetch(getTxEndpoint(artifactId));
        if (response.status === 200 && artifact) {
            try {
                return ({
                    artifactName: artifact ? getTagValue(artifact.node.tags, TAGS.keys.artifactName) : null,
                    artifactType: artifact ? getTagValue(artifact.node.tags, TAGS.keys.artifactType) as any : null,
                    owner: artifact ? getTagValue(artifact.node.tags, TAGS.keys.initialOwner) : null,
                    ansTitle: artifact ? getTagValue(artifact.node.tags, TAGS.keys.ansTitle) : null,
                    minted: artifact ? getTagValue(artifact.node.tags, TAGS.keys.dateCreated) : null,
                    keywords: artifact ? getTagValue(artifact.node.tags, TAGS.keys.keywords) : null,
                    mediaIds: artifact ? getTagValue(artifact.node.tags, TAGS.keys.mediaIds) : null,
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
        values: args.poolIds!
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
        reduxCursor: args.reduxCursor
    })).filter((element: GQLResponseType) => {
        return getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none;
    })

    let cursorState;
    if (args.reduxCursor) {
        cursorState = store.getState().cursorsReducer[args.reduxCursor];
    }

    let nextCursor: string | null = cursorState ? cursorState.next : null;
    let previousCursor: string | null = cursorState ? cursorState.previous : null;

    return ({
        nextCursor: nextCursor,
        previousCursor: previousCursor,
        contracts: artifacts
    })
}

export async function getArtifactsByUser(args: ArtifactArgsType) {
    const poolIds = await getPoolIds();

    const artifacts = await getArtifactsByPool({
        poolIds: poolIds,
        owner: args.owner,
        uploader: null,
        cursor: args.cursor,
        reduxCursor: args.reduxCursor
    });
    return artifacts;
}

export async function getArtifactsByBookmarks(args: ArtifactArgsType): Promise<ArtifactResponseType> {
    const bookmarksReducer = store.getState().bookmarksReducer;
    let bookmarkIds: string[];

    if (bookmarksReducer.owner === args.owner) {
        bookmarkIds = bookmarksReducer.ids;
    }
    else {
        if (args.owner) {
            bookmarkIds = await getBookmarks(args.owner);
        }
        else {
            bookmarkIds = [];
        }
    }
    
    const artifacts: GQLResponseType[] = await getGQLData({
        ids: bookmarkIds,
        tagFilters: null,
        uploader: null,
        cursor: null,
        reduxCursor: null
    });

    return ({
        nextCursor: args.cursor,
        previousCursor: args.cursor,
        contracts: artifacts.filter(
            (element: GQLResponseType) => getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none)
    })
}

export async function getBookmarks(owner: string): Promise<string[]> {
    const bookmarks: GQLResponseType[] = await getGQLData({
        ids: null,
        tagFilters: [
            { name: TAGS.keys.bookmarkSearch, values: [owner] }
        ],
        uploader: null,
        cursor: null,
        reduxCursor: null
    });

    if (bookmarks.length > 0) {
        let recentDate = Number(getTagValue(bookmarks[0].node.tags, TAGS.keys.dateCreated)!)

        for (let i = 0; i < bookmarks.length; i++) {
            const date = Number(getTagValue(bookmarks[i].node.tags, TAGS.keys.dateCreated)!);
            recentDate = Math.max(recentDate, date);
        }

        for (let i = 0; i < bookmarks.length; i++) {
            if (recentDate === Number(getTagValue(bookmarks[i].node.tags, TAGS.keys.dateCreated)!)) {
                return JSON.parse(getTagValue(bookmarks[i].node.tags, TAGS.keys.bookmarkIds)!);
            }
        }

        return [];
    }
    else {
        return [];
    }
}

export async function setBookmarks(owner: string, ids: string[]): Promise<BookmarkResponseType> {
    let txRes = await arClient.arweavePost.createTransaction({ data: JSON.stringify(ids) }, "use_wallet");
    txRes.addTag(TAGS.keys.bookmarkSearch, owner);
    txRes.addTag(TAGS.keys.dateCreated, Date.now().toString());
    txRes.addTag(TAGS.keys.bookmarkIds, JSON.stringify(ids));

    console.log(txRes)

    const response = await global.window.arweaveWallet.dispatch(txRes);

    if (response.id) {
        store.dispatch(artifactActions.setBookmarks({
            owner: owner,
            ids: ids
        }));
    }

    return ({
        status: response.id ? 200 : 500,
        message: response.id ? LANGUAGE.bookmarksUpdated : LANGUAGE.errorOccurred
    })
}
import { store } from "redux/store";
import * as actions from "redux/artifacts/actions";
import { ArweaveClient } from "arweave-client";
import {
    ArtifactType,
    ArtifactArgsType,
    ArtifactResponseType,
    BookmarkResponseType,
    CollectionType,
    GQLResponseType,
    TagFilterType
} from "types";
import { getDataByTags, getDataByTxIds } from "gql";
import { getTxEndpoint } from "endpoints";
import { getCollectionById, getCollectionIds } from "./collections";
import { getTagValue } from "utils";
import { LANGUAGE } from "language";
import { TAGS, STORAGE } from "config";

const arClient = new ArweaveClient();

export async function getArtifactById(artifactId: string): Promise<ArtifactType | null> {
    const artifact: GQLResponseType = (await getDataByTags([
        { name: TAGS.keys.uploaderTxId, values: [artifactId] }
    ]))[0];

    let collection: CollectionType | null = await getCollectionById(getTagValue(artifact.node.tags, TAGS.keys.collectionId));

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
                    poolName: collection ? collection.state.title : null,
                    collectionId: collection ? collection.id : null,
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

export async function getArtifactsByCollection(args: ArtifactArgsType): Promise<ArtifactResponseType> {
    let nextCursor: string | null = null;
    let previousCursor: string | null = null;

    let tagFilters: TagFilterType[] = [{
        name: TAGS.keys.collectionId,
        values: args.collectionIds
    }];

    if (args.owner) {
        tagFilters.push({
            name: TAGS.keys.initialOwner,
            values: [args.owner]
        });
    }

    const artifacts: GQLResponseType[] = await getDataByTags(tagFilters);

    return ({
        nextCursor: nextCursor,
        previousCursor: previousCursor,
        contracts: artifacts.filter(
            (element: GQLResponseType) => getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none)
    })
}

export async function getArtifactsByUser(userWallet: string, cursor: string | null) {
    const collectionIds = await getCollectionIds();
    const artifacts = await getArtifactsByCollection({ collectionIds: collectionIds, cursor: cursor, owner: userWallet });
    return artifacts;
}

export async function getArtifactsByBookmarks(owner: string, cursor: string | null): Promise<ArtifactResponseType> {
    const bookmarksReducer = store.getState().bookmarksReducer;
    let bookmarkIds: string[];

    if (bookmarksReducer.owner === owner) {
        bookmarkIds = bookmarksReducer.ids;
    }
    else {
        bookmarkIds = await getBookmarks(owner);
    }

    const artifacts: GQLResponseType[] = await getDataByTxIds(bookmarkIds);

    return ({
        nextCursor: cursor,
        previousCursor: cursor,
        contracts: artifacts.filter(
            (element: GQLResponseType) => getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none)
    })
}

export async function getBookmarks(owner: string): Promise<string[]> {
    const bookmarks: GQLResponseType[] = await getDataByTags([
        { name: TAGS.keys.bookmarkSearch, values: [owner] }
    ]);

    if (bookmarks.length > 0) {
        let recentDate = Number(getTagValue(bookmarks[0].node.tags, TAGS.keys.dateCreated)!)

        for (let i = 0; i < bookmarks.length; i++) {
            const date = Number(getTagValue(bookmarks[i].node.tags, TAGS.keys.dateCreated)!);
            recentDate = Math.max(recentDate, date)
        }

        for (let i = 0; i < bookmarks.length; i++) {
            if (recentDate === Number(getTagValue(bookmarks[i].node.tags, TAGS.keys.dateCreated)!)) {
                return JSON.parse(getTagValue(bookmarks[i].node.tags, TAGS.keys.bookmarkIds)!)
            }
        }

        return [];
    }
    else {
        return [];
    }
}

export async function setBookmarks(owner: string, ids: string[]): Promise<BookmarkResponseType> {
    let txRes = await arClient.arweave.createTransaction({ data: JSON.stringify(ids) }, "use_wallet");
    txRes.addTag(TAGS.keys.bookmarkSearch, owner);
    txRes.addTag(TAGS.keys.dateCreated, Date.now().toString());
    txRes.addTag(TAGS.keys.bookmarkIds, JSON.stringify(ids));

    try {
        await arClient.arweave.transactions.sign(txRes, "use_wallet");
    }
    catch (e) {
        console.log(e)
    }

    const response = await arClient.arweave.transactions.post(txRes);

    if (response.status === 200) {
        store.dispatch(actions.setBookmarks({
            owner: owner,
            ids: ids
        }));
    }

    return ({
        status: response.status,
        message: response.status === 200 ? LANGUAGE.bookmarksUpdated : LANGUAGE.errorOccurred
    })
}
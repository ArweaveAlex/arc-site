import { CursorEnum, getGQLData, getTagValue, STORAGE, TAGS } from 'arcframework';
import { ArweaveClientType } from 'permaweb-orderbook';

import { publishCollection } from './deploy';

export type MintClientInitArgs = {
	arClient: ArweaveClientType;
};

export type ProfileType = {
	handle: string | null;
	avatar: string | null;
	twitter: string | null;
	discord: string | null;
	walletAddress?: string;
};

export type CollectionType = {
	id: string;
	banner: string;
	thumbnail: string;
	name: string;
	title: string;
	description: string;
	type: string;
	creator: ProfileType;
	stamps?: { total: number; vouched: number };
};

export type CollectionsResponseType = {
	nextCursor: string | null;
	previousCursor: string | null;
	collections: CollectionType[];
};

export type MintClientType = {
	arClient: ArweaveClientType;
	init: (args: MintClientInitArgs) => MintClientType;
	publishCollection: (args: PublishCollectionArgs) => Promise<any>;
	getCollectionsByUser: (args: { cursor: string | null; walletAddress: string }) => Promise<CollectionsResponseType>;
};

export type PublishCollectionArgs = { collection: CollectionUploadType };

export type CollectionUploadType = {
	name: string;
	title: string;
	description: string;
	topics: string[];
	licenseTags: any;
	owners: any;
	type: string;
	code: string;
	creator: string;
	items: string[];
	banner: any;
	thumbnail: any;
	bannerMime?: string;
	thumbnailMime?: string;
};

const mintClient: MintClientType = {
	arClient: null,

	init: function (args: MintClientInitArgs) {
		this.arClient = args.arClient;
		return this;
	},

	publishCollection: async function (args: PublishCollectionArgs) {
		await this.arClient.bundlr.ready();
		const publish = publishCollection(this.arClient.bundlr);
		let id = await publish(args.collection);
		await new Promise((r) => setTimeout(r, 1000));
		await this.arClient.warpDefault.register(id, 'node2');
		return id;
	},

	getCollectionsByUser: async function (args: {
		cursor: string | null;
		walletAddress: string;
	}): Promise<CollectionsResponseType> {
		const gqlData = await getGQLData({
			ids: null,
			tagFilters: [
				{
					name: TAGS.keys.dataProtocol,
					values: [TAGS.values.collection],
				},
			],
			uploader: [args.walletAddress],
			cursor: args.cursor,
			reduxCursor: null,
			cursorObject: CursorEnum.GQL,
			useArweavePost: true,
		});
		const collections: CollectionType[] = [];

		for (let i = 0; i < gqlData.data.length; i++) {
			const node = gqlData.data[i].node;
			const name = getTagValue(node.tags, TAGS.keys.name);
			const title = getTagValue(node.tags, TAGS.keys.ansTitle);
			const description = getTagValue(node.tags, TAGS.keys.ansDescription);
			const type = getTagValue(node.tags, TAGS.keys.ansType);
			const banner = getTagValue(node.tags, TAGS.keys.banner);
			const thumbnail = getTagValue(node.tags, TAGS.keys.thumbnail);

			if ([name, title, description, type].includes(STORAGE.none)) continue;

			collections.push({
				id: node.id,
				banner: banner,
				thumbnail: thumbnail,
				name: name,
				title: title,
				description: description,
				type: type,
				creator: null,
			});
		}
		return {
			previousCursor: null,
			nextCursor: gqlData.nextCursor,
			collections: collections,
		};
	},
};

export { mintClient as MintClient };

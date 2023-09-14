import { ArweaveClientType } from 'permaweb-orderbook';

import { publishCollection } from './deploy';

export type MintClientInitArgs = {
	arClient: ArweaveClientType;
};

export type MintClientType = {
	arClient: ArweaveClientType;
	init: (args: MintClientInitArgs) => MintClientType;
	publishCollection: (args: PublishCollectionArgs) => Promise<any>;
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
};

export { mintClient as MintClient };

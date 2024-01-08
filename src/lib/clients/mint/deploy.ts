import { ArweaveWebIrys } from '@irys/sdk/build/esm/web/tokens/arweave';

import { ARTIFACT_CONTRACT, CONTENT_TYPES, FALLBACK_IMAGE, TAGS, UPLOAD_CONFIG } from 'arcframework';

import { DEFAULT_COLLECTION_THUMBNAIL } from 'helpers/config';

import { CollectionUploadType } from './index';

export function publishCollection(wallet: any) {
	return async (collection: CollectionUploadType) => {
		const irys = new ArweaveWebIrys({ url: UPLOAD_CONFIG.node2, wallet: { provider: wallet } });
		await irys.ready();

		let banner = null;
		let thumbnail = DEFAULT_COLLECTION_THUMBNAIL;

		const tags = [
			{ name: TAGS.keys.contentType, value: CONTENT_TYPES.json },
			{ name: TAGS.keys.name, value: collection.name },
			{ name: TAGS.keys.dataProtocol, value: TAGS.values.collection },
			{ name: TAGS.keys.appName, value: TAGS.values.appName },
			{ name: TAGS.keys.appVersion, value: TAGS.values.appVersion },
			{ name: TAGS.keys.contractSrc, value: ARTIFACT_CONTRACT.srcTradeable },
			{ name: TAGS.keys.contractManifest, value: TAGS.values.contractManifest },
			{
				name: TAGS.keys.initState,
				value: JSON.stringify({
					balances: collection.owners,
					name: collection.name,
					description: collection.description,
					ticker: TAGS.values.collectionTicker,
					claimable: [],
					creator: collection.creator,
				}),
			},
			{ name: TAGS.keys.ansTitle, value: collection.name },
			{ name: TAGS.keys.ansDescription, value: collection.description },
			{ name: TAGS.keys.ansType, value: TAGS.values.document },
			{ name: TAGS.keys.license, value: collection.licenseTags.License },
			{ name: TAGS.keys.banner, value: banner ? banner : FALLBACK_IMAGE },
			{ name: TAGS.keys.creator, value: collection.creator },
		];

		if (thumbnail) {
			tags.push({ name: TAGS.keys.thumbnail, value: thumbnail });
		}

		if (collection.code) {
			tags.push({ name: TAGS.keys.collectionCode, value: collection.code });
		}

		const data = JSON.stringify({ type: TAGS.values.collection, items: collection.items });

		const result = await irys.upload(data as any, { tags: tags } as any);

		return result.id;
	};
}

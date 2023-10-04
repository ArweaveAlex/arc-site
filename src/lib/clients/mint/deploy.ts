import { ARTIFACT_CONTRACT, CONTENT_TYPES, FALLBACK_IMAGE, TAGS } from 'arcframework';

import { CollectionUploadType } from './index';

export function publishCollection(bundlr: any) {
	return async (collection: CollectionUploadType) => {
		let banner = null;
		let thumbnail = null;

		if (collection.banner) {
			const tx = await bundlr.createTransaction(collection.banner, {
				tags: [{ name: TAGS.keys.contentType, value: collection.bannerMime }],
			});
			await tx.sign();
			tx.upload();
			banner = tx.id;
		}

		if (collection.thumbnail) {
			const tx = await bundlr.createTransaction(collection.thumbnail, {
				tags: [{ name: TAGS.keys.contentType, value: collection.thumbnailMime }],
			});
			await tx.sign();
			tx.upload();
			thumbnail = tx.id;
		}

		const tags = [
			{ name: TAGS.keys.contentType, value: CONTENT_TYPES.json },
			{ name: TAGS.keys.name, value: collection.name },
			{ name: TAGS.keys.dataProtocol, value: TAGS.values.collection },
			{ name: TAGS.keys.appName, value: TAGS.values.appName },
			{ name: TAGS.keys.appVersion, value: TAGS.values.appVersion },
			{ name: TAGS.keys.contractSrc, value: ARTIFACT_CONTRACT.src },
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

		const result = await bundlr.upload(JSON.stringify({ type: TAGS.values.collection, items: collection.items }), {
			tags,
		});

		return result.id;
	};
}

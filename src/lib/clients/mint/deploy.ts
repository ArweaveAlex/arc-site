import { CollectionUploadType } from './index';

const ATOMIC_TOKEN_SRC = 'Of9pi--Gj7hCTawhgxOwbuWnFI1h24TTgO5pw8ENJNQ';

export function publishCollection(bundlr: any) {
	return async (collection: CollectionUploadType) => {
		let banner = null;
		let thumbnail = null;

		if (collection.banner) {
			const tx = await bundlr.createTransaction(collection.banner, {
				tags: [{ name: 'Content-Type', value: collection.bannerMime }],
			});
			await tx.sign();
			tx.upload();
			banner = tx.id;
		}

		if (collection.thumbnail) {
			const tx = await bundlr.createTransaction(collection.thumbnail, {
				tags: [{ name: 'Content-Type', value: collection.thumbnailMime }],
			});
			await tx.sign();
			tx.upload();
			thumbnail = tx.id;
		}

		const tags = [
			{ name: 'Content-Type', value: 'application/json' },
			{ name: 'Name', value: collection.name },
			{ name: 'Data-Protocol', value: 'Collection-Test-1' },
			{ name: 'App-Name', value: 'SmartWeaveContract' },
			{ name: 'App-Version', value: '0.3.0' },
			{ name: 'Contract-Src', value: ATOMIC_TOKEN_SRC },
			{
				name: 'Contract-Manifest',
				value:
					'{"evaluationOptions":{"sourceType":"redstone-sequencer","allowBigInt":true,"internalWrites":true,"unsafeClient":"skip","useConstructor":true}}',
			},
			{
				name: 'Init-State',
				value: JSON.stringify({
					balances: collection.owners,
					name: collection.name,
					description: collection.description,
					ticker: 'ATOMIC',
					claimable: [],
					creator: collection.creator,
				}),
			},
			{ name: 'Title', value: collection.name },
			{ name: 'Description', value: collection.description },
			{ name: 'Type', value: 'Document' },
			{ name: 'License', value: collection.licenseTags.License },
			{ name: 'Banner', value: banner ? banner : '' },
			{ name: 'Thumbnail', value: thumbnail ? thumbnail : '' },
			{ name: 'Collection-Code', value: collection.code },
			{ name: 'Creator', value: collection.creator },
		];

		const result = await bundlr.upload(JSON.stringify({ type: 'Collection', items: collection.items }), { tags });

		return result.id;
	};
}

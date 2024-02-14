import { ArweaveWebIrys } from '@irys/sdk/build/esm/web/tokens/arweave';

import {
	CONTENT_TYPES,
	createContract,
	createContractTags,
	getAnsType,
	getArtifactType,
	getGQLData,
	getMimeType,
	logValue,
	PoolClient,
	RENDER_WITH_VALUE,
	TAGS,
} from 'arcframework';

import { UPLOAD_CONFIG } from 'helpers/config';
import { FileMetadataType, TagType } from 'helpers/types';
import { fileToBuffer } from 'helpers/utils';

export async function uploadFile(poolClient: PoolClient, data: FileMetadataType, uploader: any, wallet: any) {
	const irys = new ArweaveWebIrys({ url: UPLOAD_CONFIG.node2, wallet: { provider: wallet } });
	await irys.ready();

	let name = data.title && data.title.length ? data.title : data.file.name;
	let associationId = data.associationId ? data.associationId : null;

	const fileType = data.file.name.slice(data.file.name.lastIndexOf('.') + 1);
	let artifactType = getArtifactType(fileType);
	let ansType = getAnsType(artifactType);

	let fileTxId: string | null = null;
	let metadataTxId: string | null = null;

	try {
		const fileTags = [
			{ name: TAGS.keys.application, value: TAGS.values.application },
			{ name: TAGS.keys.contentType, value: getMimeType(data.file.name) },
		];
		const buffer = await fileToBuffer(data.file);
		const fileTxResponse = await uploader.uploadData(buffer as any, { tags: fileTags } as any);

		fileTxId = fileTxResponse.data.id;
	} catch (e: any) {
		throw new Error(e);
	}

	try {
		const metadataTxTags = [
			{ name: TAGS.keys.application, value: TAGS.values.application },
			{ name: TAGS.keys.contentType, value: CONTENT_TYPES.json },
		];
		const metadataTxResponse = await irys.upload(JSON.stringify(data.metadata) as any, { tags: metadataTxTags } as any);

		metadataTxId = metadataTxResponse.id;
	} catch (e: any) {
		throw new Error(e);
	}

	try {
		const tags: TagType[] = await createContractTags(poolClient, {
			index: { path: 'file.json' },
			paths: (assetId: string) => ({ 'file.json': { id: assetId } }),
			contentType: CONTENT_TYPES.json,
			artifactType: artifactType,
			name: name,
			description: name,
			type: ansType,
			additionalMediaPaths: [],
			profileImagePath: null,
			associationId: associationId,
			associationSequence: null,
			childAssets: null,
			renderWith: RENDER_WITH_VALUE,
			assetId: fileTxId,
			fileType: fileType,
		});

		const fileJson = {
			fileTxId: fileTxId,
			metadataTxId: metadataTxId,
		};

		const txResponse = await irys.upload(JSON.stringify(fileJson) as any, { tags } as any);

		await new Promise((r) => setTimeout(r, 2000));

		const assetId: string = txResponse.id;
		let fetchedAssetId: string;
		while (!fetchedAssetId) {
			await new Promise((r) => setTimeout(r, 2000));
			const gqlResponse = await getGQLData({
				ids: [assetId],
				tagFilters: null,
				uploaders: null,
				cursor: null,
				reduxCursor: null,
				cursorObject: null,
				useArweavePost: true,
			});

			if (gqlResponse && gqlResponse.data.length) {
				logValue(`Fetched Transaction`, gqlResponse.data[0].node.id, 0);
				fetchedAssetId = gqlResponse.data[0].node.id;
			} else {
				logValue(`Transaction Not Found`, assetId, 0);
			}
		}

		const contractId = await createContract(poolClient, { assetId: assetId });
		if (contractId) {
			logValue(`Deployed Contract`, contractId, 0);
			return contractId;
		} else {
			return null;
		}
	} catch (e: any) {
		throw new Error(e);
	}
}

import {
	CONTENT_TYPES,
	createAsset,
	getAnsType,
	getArtifactType,
	getMimeType,
	PoolClient,
	PoolConfigClient,
	RENDER_WITH_VALUES,
	TAGS,
} from 'arcframework';

import { POOL_TEST_MODE } from 'helpers/config';
import { FileMetadataType } from 'helpers/types';

export async function uploadFiles(poolId: string, files: FileMetadataType[]) {
	let poolConfigClient = new PoolConfigClient({ testMode: POOL_TEST_MODE });
	const poolConfig = await poolConfigClient.initFromContract({ poolId });
	poolConfig.walletKey = window.arweaveWallet;
	let poolClient = new PoolClient({ poolConfig });
	await poolClient.arClient.bundlr.ready();
	for (let i = 0; i < files.length; i++) {
		await uploadFile(poolClient, files[i]);
	}
}

async function uploadFile(poolClient: PoolClient, file: FileMetadataType) {
	let name = file.title && file.title.length ? file.title : file.file.name;
	let associationId = file.associationId ? file.associationId : null;

	const fileType = file.file.name.slice(file.file.name.lastIndexOf('.') + 1);
	let artifactType = getArtifactType(fileType);
	let ansType = getAnsType(artifactType);

	let fileTransactionId = await processFile(poolClient, file);

	let metadataTx = poolClient.arClient.bundlr.createTransaction(JSON.stringify(file.metadata), {
		tags: [
			{ name: TAGS.keys.application, value: TAGS.values.application },
			{ name: TAGS.keys.contentType, value: CONTENT_TYPES.json },
		],
	});
	await metadataTx.sign();
	const metadataTxId = metadataTx.id;

	await metadataTx.upload();

	let fileJson = {
		fileTxId: fileTransactionId,
		metadataTxId: metadataTxId,
	};

	return await createAsset(poolClient, {
		index: { path: 'file.json' },
		paths: (assetId: string) => ({ 'file.json': { id: assetId } }),
		content: fileJson,
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
		renderWith: RENDER_WITH_VALUES,
		assetId: fileTransactionId,
		fileType: fileType,
	});
}

async function processFile(poolClient: PoolClient, file: FileMetadataType) {
	const mimeType = getMimeType(file.file.name);
	const subTags = [
		{ name: TAGS.keys.application, value: TAGS.values.application },
		{ name: TAGS.keys.contentType, value: mimeType },
	];
	let actualFile = await toArrayBuffer(file.file);
	const tx = poolClient.arClient.bundlr.createTransaction(actualFile, { tags: subTags });
	await tx.sign();
	const id = tx.id;
	tx.upload();
	return id;
}

const toArrayBuffer = (file: any) =>
	new Promise((resolve, _reject) => {
		const fr = new FileReader();
		fr.readAsArrayBuffer(file);
		fr.addEventListener('loadend', (evt) => {
			resolve(evt.target.result);
		});
	});

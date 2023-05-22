import {
	CONTENT_TYPES,
	createAsset,
	getAlexType,
	getAnsType,
	getMimeType,
	initPoolConfigFromContract,
	PoolClient,
	RENDER_WITH_VALUES,
	TAGS,
} from 'arcframework';

import { FileMetadataType } from 'helpers/types';

export async function uploadFiles(poolId: string, files: FileMetadataType[]) {
	let poolConfig = await initPoolConfigFromContract(poolId);
	poolConfig.walletKey = window.arweaveWallet;
	let poolClient = new PoolClient({ poolConfig });
	await poolClient.arClient.bundlr.ready();
	for (let i = 0; i < files.length; i++) {
		await uploadFile(poolClient, files[i]);
	}
}

async function uploadFile(poolClient: PoolClient, file: FileMetadataType) {
	let name = file.file.name;
	const fileType = name.slice(name.lastIndexOf('.') + 1);
	let alexType = getAlexType(fileType);
	let ansType = getAnsType(alexType);

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
		artifactType: alexType,
		name: name,
		description: name,
		type: ansType,
		additionalMediaPaths: [],
		profileImagePath: null,
		associationId: null,
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
	console.log(actualFile);
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

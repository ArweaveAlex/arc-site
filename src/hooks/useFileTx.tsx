import React from 'react';

import { getTxEndpoint } from 'arcframework';

export function useFileTx(rawData: string | null) {
	const [jsonData, setJsonData] = React.useState<any>(null);
	const [fileUrl, setFileUrl] = React.useState<string | null>(null);
	const [metadata, setMetadata] = React.useState<any>(null);

	React.useEffect(() => {
		if (rawData) {
			setJsonData(JSON.parse(rawData));
		}
	}, [rawData]);

	React.useEffect(() => {
		(async function () {
			if (jsonData) {
				const fileResponse = await fetch(getTxEndpoint(jsonData.fileTxId));
				setFileUrl(fileResponse.url);
			}
		})();
	}, [jsonData]);

	React.useEffect(() => {
		(async function () {
			if (jsonData && jsonData.metadataTxId && jsonData.metadataTxId.length > 0) {
				const metadataResponse = await fetch(getTxEndpoint(jsonData.metadataTxId));
				if (metadataResponse.status === 200) {
					setMetadata(JSON.parse(await (await fetch(metadataResponse.url)).text()));
				} else {
					setMetadata({});
				}
			}
		})();
	}, [jsonData]);

	return {
		fileUrl: fileUrl,
		metadata: metadata,
	};
}

const Irys = require('@irys/sdk');

const { ArweaveClient } = require('arcframework');

const DEPLOY_FOLDER = './dist';
const DEPLOY_KEY = process.env.DEPLOY_KEY;
const ANT_CONTRACT = process.env.ANT_CONTRACT;

(async () => {
	const jwk = JSON.parse(Buffer.from(DEPLOY_KEY, 'base64').toString('utf-8'));

	const irys = new Irys({ url: 'https://node2.bundlr.network', token: 'arweave', key: jwk });

	const arClient = new ArweaveClient(jwk);
	const warpContract = arClient.warpArweaveGateway.contract(ANT_CONTRACT).connect(jwk);
	const contractState: any = (await warpContract.readState()).cachedValue.state;

	console.log(contractState);

	try {
		console.log(`Deploying ${DEPLOY_FOLDER} folder`);
		const txResult = await irys.uploadFolder(DEPLOY_FOLDER, {
			indexFile: 'index.html',
		});

		await new Promise((r) => setTimeout(r, 1000));

		await warpContract.writeInteraction(
			{
				function: 'setRecord',
				subDomain: '@',
				transactionId: txResult.id,
			},
			{ disableBundling: true }
		);

		console.log(`Deployed [${txResult.id}] to [${contractState.name}]`);
	} catch (e: any) {
		console.error(e);
	}
})();

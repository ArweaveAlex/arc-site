import Arweave from 'arweave';
import Bundlr from '@bundlr-network/client';
import { WarpFactory, defaultCacheOptions } from 'warp-contracts';

(async () => {
	const DEPLOY_FOLDER = './build';
	const BUNDLR_NODE = 'https://node2.bundlr.network';

	const arweave = Arweave.init({
		host: 'arweave.net',
		port: 443,
		protocol: 'https',
	});
	const jwk = JSON.parse(Buffer.from(process.env.ALEX_DEPLOY_KEY, 'base64').toString('utf-8'));

	const bundlr = new (Bundlr as any).default(BUNDLR_NODE, 'arweave', jwk);
	const warp = WarpFactory.custom(arweave, defaultCacheOptions, 'mainnet').useArweaveGateway().build();

	const contract = warp.contract(process.env.ALEX_ANT_CONTRACT).connect(jwk);

	const result = await bundlr.uploadFolder(DEPLOY_FOLDER, {
		indexFile: 'index.html',
	});

	await new Promise((r) => setTimeout(r, 1000));

	await contract.writeInteraction({
		function: 'setRecord',
		subDomain: '@',
		transactionId: result.id,
	});

	console.log(`[ ${result.id} ]`);
})();

import React from 'react';

import * as ArcFramework from 'arcframework';

import * as windowUtils from 'helpers/window';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { WalletBlock } from 'wallet/WalletBlock';

import { PoolsCreateForm } from './PoolsCreateForm';
import { PoolsCreateHeader } from './PoolsCreateHeader';

// TODO: remove testMode
export default function PoolsCreate() {
	const arProvider = useArweaveProvider();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	const [image, setImage] = React.useState<any>(null);
	const [title, setTitle] = React.useState<string>('');
	const [contributionPercentage, setContributionPercentage] = React.useState<number>(0);
	const [topics, setTopics] = React.useState<string[]>([]);
	const [description, setDescription] = React.useState<string>('');

	const [invalidTitle, setInvalidTitle] = React.useState<boolean>(false);

	const [poolCreateSuccess, setPoolCreateSuccess] = React.useState<boolean>(false);
	const [poolCreateError, setPoolCreateError] = React.useState<boolean>(false);

	React.useEffect(() => {
		windowUtils.scrollTo(0, 0);
	}, []);

	React.useEffect(() => {
		setTimeout(() => {
			if (!arProvider.walletAddress) {
				setShowWalletBlock(true);
			}
		}, 200);
	}, [arProvider.walletAddress]);

	const handleSave = async () => {
		setLoading(true);
		const existingPool = await ArcFramework.checkExistingPool(title);
		if (!existingPool) {
			try {
				let poolConfig = ArcFramework.initNewPoolConfig({ testMode: true });

				poolConfig.state.controller.contribPercent = contributionPercentage;
				poolConfig.state.title = title;
				poolConfig.state.description = description;
				poolConfig.state.briefDescription = description;
				poolConfig.state.image = image;
				poolConfig.state.ownerMaintained = false;

				poolConfig.state.owner.pubkey = arProvider.walletAddress;

				let controlWalletJwk = global.window.arweaveWallet;
				let signedControlWallet = new ArcFramework.ArweaveClient().warpPluginInjectedArweaveSigner(controlWalletJwk);
				await signedControlWallet.setPublicKey();

				let poolClient = new ArcFramework.PoolCreateClient({
					poolConfig,
					controlWalletJwk,
					signedControlWallet,
					controlWalletAddress: arProvider.walletAddress,
				});

				await poolClient.createPool();
				setPoolCreateSuccess(true);
			} catch (e: any) {
				setPoolCreateError(true);
			}
		} else {
			setInvalidTitle(true);
			console.log(`Pool Already Exists`);
		}
		setLoading(false);
	};

	const handleTitleChange = (newTitle: string) => {
		setTitle(newTitle);
		setInvalidTitle(false);
	};

	return arProvider.walletAddress ? (
		<div className={'view-wrapper max-cutoff'}>
			<PoolsCreateHeader />
			<PoolsCreateForm
				{...{ image, setImage }}
				title={title}
				setTitle={handleTitleChange}
				{...{ contributionPercentage, setContributionPercentage }}
				{...{ topics, setTopics }}
				{...{ description, setDescription }}
				handleSave={() => handleSave()}
				loading={loading}
				invalidTitle={invalidTitle}
				{...{ poolCreateSuccess, setPoolCreateSuccess }}
				{...{ poolCreateError, setPoolCreateError }}
			/>
		</div>
	) : (
		showWalletBlock && <WalletBlock />
	);
}

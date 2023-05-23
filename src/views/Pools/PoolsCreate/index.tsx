import React from 'react';
import { useDispatch } from 'react-redux';

import * as ArcFramework from 'arcframework';

import * as windowUtils from 'helpers/window';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import * as accountActions from 'state/account/actions';
import { WalletBlock } from 'wallet/WalletBlock';

import { PoolsCreateForm } from './PoolsCreateForm';
import { PoolsCreateHeader } from './PoolsCreateHeader';

// TODO: remove testMode
export default function PoolsCreate() {
	const dispatch = useDispatch();

	const arProvider = useArweaveProvider();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	const [image, setImage] = React.useState<any>(null);
	const [imageBuffer, setImageBuffer] = React.useState<any>(null);
	const [title, setTitle] = React.useState<string>('');
	const [contributionPercentage, setContributionPercentage] = React.useState<number>(0);
	const [topics, setTopics] = React.useState<string[]>([]);
	const [keywords, setKeywords] = React.useState<string[]>(['']);
	const [description, setDescription] = React.useState<string>('');

	const [invalidTitle, setInvalidTitle] = React.useState<boolean>(false);

	const [poolCreateSuccess, setPoolCreateSuccess] = React.useState<boolean>(false);
	const [createdPool, setCreatedPool] = React.useState<ArcFramework.PoolConfigType | null>(null);
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
				poolConfig.topics = topics;
				poolConfig.keywords = keywords;
				poolConfig.state.ownerMaintained = false;

				const mimeType = image ? image.split(',')[0].split(':')[1].split(';')[0] : null;

				poolConfig.state.owner.pubkey = arProvider.walletAddress;

				let controlWalletJwk = global.window.arweaveWallet;
				let signedControlWallet = new ArcFramework.ArweaveClient().warpPluginInjectedArweaveSigner(controlWalletJwk);
				await signedControlWallet.setPublicKey();

				let poolClient = new ArcFramework.PoolCreateClient({
					poolConfig,
					img: imageBuffer ? imageBuffer : null,
					imgFileType: mimeType,
					controlWalletJwk,
					signedControlWallet,
					controlWalletAddress: arProvider.walletAddress,
				});

				setCreatedPool(poolConfig);

				await poolClient.createPool();
				dispatch(accountActions.addAccountPool(fromPoolConfigType(poolConfig)));
				setPoolCreateSuccess(true);
			} catch (e: any) {
				console.log(e);
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

	const handleKeywordChange = (keyword: string, index: number) => {
		if (index >= 0 && index < keywords.length) {
			const newKeywords = [...keywords];
			newKeywords[index] = keyword;
			setKeywords(newKeywords);
		}
	};

	const addKeyword = () => {
		setKeywords((prevKeywords) => [...prevKeywords, '']);
	};

	const removeKeyword = (index: number) => {
		if (index >= 0 && index < keywords.length) {
			setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
		}
	};

	return arProvider.walletAddress ? (
		<div className={'view-wrapper max-cutoff'}>
			<PoolsCreateHeader />
			<PoolsCreateForm
				{...{ image, setImage }}
				{...{ imageBuffer, setImageBuffer }}
				title={title}
				setTitle={handleTitleChange}
				{...{ contributionPercentage, setContributionPercentage }}
				{...{ topics, setTopics }}
				keywords={keywords}
				setKeywords={handleKeywordChange}
				addKeyword={addKeyword}
				removeKeyword={removeKeyword}
				{...{ description, setDescription }}
				handleSave={() => handleSave()}
				loading={loading}
				invalidTitle={invalidTitle}
				{...{ poolCreateSuccess, setPoolCreateSuccess }}
				{...{ poolCreateError, setPoolCreateError }}
				createdPool={createdPool}
			/>
		</div>
	) : (
		showWalletBlock && <WalletBlock />
	);
}

function fromPoolConfigType(poolConfig: ArcFramework.PoolConfigType): ArcFramework.PoolType {
	return {
		id: poolConfig.contracts.pool.id,
		state: {
			title: poolConfig.state.title,
			image: poolConfig.state.image,
			briefDescription: poolConfig.state.briefDescription,
			description: poolConfig.state.description,
			owner: poolConfig.state.owner.pubkey,
			ownerInfo: poolConfig.state.owner.info,
			timestamp: poolConfig.state.timestamp,
			contributors: {},
			tokens: {},
			totalContributions: '0',
			totalSupply: '0',
			balance: '0',
		},
	};
}

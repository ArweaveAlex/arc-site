import React from 'react';

import * as windowUtils from 'helpers/window';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { WalletBlock } from 'wallet/WalletBlock';

import { PoolsCreateForm } from './PoolsCreateForm';
import { PoolsCreateHeader } from './PoolsCreateHeader';

export default function PoolsCreate() {
	const arProvider = useArweaveProvider();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	const [image, setImage] = React.useState<any>(null);
	const [title, setTitle] = React.useState<string>('');
	const [contributionPercentage, setContributionPercentage] = React.useState<number>(0);
	const [topics, setTopics] = React.useState<string[]>([]);
	const [description, setDescription] = React.useState<string>('');

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
		console.log({
			image: image,
			title: title,
			topics: topics,
			description: description,
		});
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	};

	return arProvider.walletAddress ? (
		<div className={'view-wrapper max-cutoff'}>
			<PoolsCreateHeader />
			<PoolsCreateForm
				{...{ image, setImage }}
				{...{ title, setTitle }}
				{...{ contributionPercentage, setContributionPercentage }}
				{...{ topics, setTopics }}
				{...{ description, setDescription }}
				handleSave={() => handleSave()}
				loading={loading}
			/>
		</div>
	) : (
		showWalletBlock && <WalletBlock />
	);
}

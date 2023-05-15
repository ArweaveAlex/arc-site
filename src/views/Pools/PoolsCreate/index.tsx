import React from 'react';

import * as windowUtils from 'helpers/window';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { WalletBlock } from 'wallet/WalletBlock';

import { PoolsCreateForm } from './PoolsCreateForm';
import { PoolsCreateHeader } from './PoolsCreateHeader';

export default function PoolsCreate() {
	const arProvider = useArweaveProvider();

	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	const [title, setTitle] = React.useState<string>('');
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

	function handleSave() {
		console.log({
			title: title,
			topics: topics,
			description: description,
		});
	}

	return arProvider.walletAddress ? (
		<div className={'view-wrapper max-cutoff'}>
			<PoolsCreateHeader />
			<PoolsCreateForm
				{...{ title, setTitle }}
				{...{ topics, setTopics }}
				{...{ description, setDescription }}
				handleSave={() => handleSave()}
			/>
		</div>
	) : (
		showWalletBlock && <WalletBlock />
	);
}

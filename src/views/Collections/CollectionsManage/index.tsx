import React from 'react';

import * as windowUtils from 'helpers/window';
import { useQuery } from 'hooks/useQuery';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { WalletBlock } from 'wallet/WalletBlock';
import { Query } from 'wrappers/Query';

import { CollectionsManageArtifacts } from './CollectionsManageArtifacts';
import { CollectionsManageForm } from './CollectionsManageForm';
import { CollectionsManageHeader } from './CollectionsManageHeader';
import * as S from './styles';

export default function CollectionsManage() {
	const query = useQuery();
	const owner = query.get('owner');

	const arProvider = useArweaveProvider();

	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	const [title, setTitle] = React.useState<string>('');
	const [topic, setTopic] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');

	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

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
			ids: selectedIds,
			title: title,
			topic: topic,
			description: description,
		});
	}

	function getData() {
		return (
			<S.Wrapper>
				<S.HeaderWrapper>
					<CollectionsManageHeader
						owner={owner}
						selectedIds={selectedIds}
						setSelectedIds={(ids: string[]) => setSelectedIds(ids)}
						title={title}
						topic={topic}
						description={description}
					/>
				</S.HeaderWrapper>
				<S.ContentWrapper>
					<S.ArtifactsWrapper>
						<CollectionsManageArtifacts
							owner={owner}
							selectedIds={selectedIds}
							setSelectedIds={(ids: string[]) => setSelectedIds(ids)}
						/>
					</S.ArtifactsWrapper>
					<S.FormWrapper>
						<CollectionsManageForm
							{...{ title, setTitle }}
							{...{ topic, setTopic }}
							{...{ description, setDescription }}
							selectedIds={selectedIds}
							handleSave={() => handleSave()}
						/>
					</S.FormWrapper>
				</S.ContentWrapper>
			</S.Wrapper>
		);
	}

	return arProvider.walletAddress ? (
		<Query value={'owner'} check={[arProvider.walletAddress]}>
			{getData()}
		</Query>
	) : (
		showWalletBlock && <WalletBlock />
	);
}

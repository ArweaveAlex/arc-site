import React from 'react';

// import {
// 	CollectionStateType,
// 	CollectionType,
// 	createCollection,
// 	getCollection,
// 	initCollection,
// 	saveCollection,
// } from 'arcframework';
// import { Loader } from 'components/atoms/Loader';
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
	const arProvider = useArweaveProvider();

	// const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);
	// const [contractId, setContractId] = React.useState<string>(null);
	// const [contract, setContract] = React.useState<CollectionType>(null);

	React.useEffect(() => {
		setTimeout(() => {
			if (!arProvider.walletAddress) {
				setShowWalletBlock(true);
			}
		}, 200);
	}, [arProvider.walletAddress]);

	// React.useEffect(() => {
	// 	let collectionContractId = query.get('contractId');
	// 	if (collectionContractId) {
	// 		setContractId(collectionContractId);
	// 		getCollection(collectionContractId).then((contract: CollectionType) => {
	// 			setContract(contract);

	// 			// setTitle(contract.state.title);
	// 			// setTopic(contract.state.topic);
	// 			// setDescription(contract.state.description);
	// 		});
	// 	}
	// }, []);

	// async function handleCreate() {
	// 	if (arProvider.walletAddress) {
	// 		setIsLoading(true);

	// 		let collectionInitState: CollectionStateType = initCollection();
	// 		// collectionInitState.title = title;
	// 		// collectionInitState.name = title;
	// 		// collectionInitState.topic = topic;
	// 		// collectionInitState.description = description;
	// 		collectionInitState.owner = arProvider.walletAddress;
	// 		// collectionInitState.ids = selectedIds;
	// 		collectionInitState.timestamp = Date.now().toString();

	// 		const collectionContract = await createCollection(collectionInitState);

	// 		setContractId(collectionContract.id);
	// 		setContract(collectionContract);
	// 		setIsLoading(false);

	// 		const currentUrl = window.location.href;
	// 		let newUrl = currentUrl + '&contractId=' + collectionContract.id;
	// 		window.history.replaceState(null, null, newUrl.toString());
	// 	}
	// }

	// async function handleSave() {
	// 	if (arProvider.walletAddress) {
	// 		setIsLoading(true);

	// 		let collectionState: CollectionStateType = contract.state;
	// 		// collectionState.title = title;
	// 		// collectionState.name = title;
	// 		// collectionState.description = description;
	// 		// collectionState.topic = topic;
	// 		// collectionState.ids = selectedIds;

	// 		let collectionSave: CollectionType = {
	// 			id: contractId,
	// 			state: collectionState,
	// 		};

	// 		await saveCollection(collectionSave);

	// 		setIsLoading(false);
	// 	}
	// }

	function getData() {
		return (
			<S.Wrapper>
				<S.HeaderWrapper>
					<CollectionsManageHeader />
				</S.HeaderWrapper>
				<S.ContentWrapper>
					<S.ArtifactsWrapper>
						<CollectionsManageArtifacts owner={query.get('owner')} />
					</S.ArtifactsWrapper>
					<S.FormWrapper>
						<CollectionsManageForm />
					</S.FormWrapper>
				</S.ContentWrapper>
			</S.Wrapper>
		);
	}

	// function getPage() {
	// 	if (isLoading) {
	// 		return <Loader sm />;
	// 	} else {
	// 		return (
	// 			<Query value={'owner'} check={[arProvider.walletAddress]}>
	// 				{getData()}
	// 			</Query>
	// 		);
	// 	}
	// }

	return arProvider.walletAddress ? (
		<Query value={'owner'} check={[arProvider.walletAddress]}>
			{getData()}
		</Query>
	) : (
		showWalletBlock && <WalletBlock />
	);
}

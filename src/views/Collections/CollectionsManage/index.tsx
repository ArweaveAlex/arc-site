import React from 'react';

import {
	CollectionStateType,
	CollectionType,
	createCollection,
	getCollection,
	initCollection,
	saveCollection,
} from 'arcframework';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Loader } from 'components/atoms/Loader';
import { TextArea } from 'components/atoms/TextArea';
import { LANGUAGE } from 'helpers/language';
import { useQuery } from 'hooks/useQuery';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { WalletBlock } from 'wallet/WalletBlock';
import { Query } from 'wrappers/Query';

import { CollectionsManageArtifacts } from './CollectionsManageArtifacts';
import { CollectionsManageHeader } from './CollectionsManageHeader';
import * as S from './styles';

export default function CollectionsManage() {
	const query = useQuery();
	const arProvider = useArweaveProvider();
	const [title, setTitle] = React.useState<string>('');
	const [topic, setTopic] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);
	const [contractId, setContractId] = React.useState<string>(null);
	const [contract, setContract] = React.useState<CollectionType>(null);

	React.useEffect(() => {
		setTimeout(() => {
			if (!arProvider.walletAddress) {
				setShowWalletBlock(true);
			}
		}, 200);
	}, [arProvider.walletAddress]);

	React.useEffect(() => {
		let collectionContractId = query.get('contractId');
		if (collectionContractId) {
			setContractId(collectionContractId);
			getCollection(collectionContractId).then((contract: CollectionType) => {
				setContract(contract);

				setTitle(contract.state.title);
				setTopic(contract.state.topic);
				setDescription(contract.state.description);
			});
		}
	}, []);

	function getInvalidTitle() {
		return { status: false, message: null };
		// return { status: true, message: LANGUAGE.collectionNameAlreadyExists };
	}

	async function handleCreate() {
		if (arProvider.walletAddress) {
			setIsLoading(true);

			let collectionInitState: CollectionStateType = initCollection();
			collectionInitState.title = title;
			collectionInitState.name = title;
			collectionInitState.topic = topic;
			collectionInitState.description = description;
			collectionInitState.owner = arProvider.walletAddress;
			// collectionInitState.ids = selectedIds;
			collectionInitState.timestamp = Date.now().toString();

			const collectionContract = await createCollection(collectionInitState);

			setContractId(collectionContract.id);
			setContract(collectionContract);
			setIsLoading(false);

			const currentUrl = window.location.href;
			let newUrl = currentUrl + '&contractId=' + collectionContract.id;
			window.history.replaceState(null, null, newUrl.toString());
		}
	}

	async function handleSave() {
		if (arProvider.walletAddress) {
			setIsLoading(true);

			let collectionState: CollectionStateType = contract.state;
			collectionState.title = title;
			collectionState.name = title;
			collectionState.description = description;
			collectionState.topic = topic;
			// collectionState.ids = selectedIds;

			let collectionSave: CollectionType = {
				id: contractId,
				state: collectionState,
			};

			await saveCollection(collectionSave);

			setIsLoading(false);
		}
	}

	function getSubmitDisabled() {
		// return !title || getInvalidTitle().status || !topic || !description || selectedIds.length <= 0;
		return !title || getInvalidTitle().status || !topic || !description;
	}

	function getButton() {
		let lang: string;
		let func: () => void;
		let disabled: boolean;

		if (contractId) {
			lang = LANGUAGE.save;
			func = () => handleSave();
			disabled = getSubmitDisabled();
		} else {
			lang = LANGUAGE.create;
			func = () => handleCreate();
			disabled = getSubmitDisabled();
		}

		return <Button type={'alt1'} label={lang} handlePress={func} disabled={disabled} noMinWidth />;
	}

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
						<S.FormContainer>
							<S.FormFixedContainer>
								<S.Form>
									<FormField
										label={LANGUAGE.title}
										value={title}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
										invalid={getInvalidTitle()}
										disabled={false}
										sm
									/>
									<FormField
										label={LANGUAGE.topic}
										value={topic}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
										invalid={{ status: false, message: null }}
										disabled={false}
										sm
									/>
									<TextArea
										label={LANGUAGE.description}
										value={description}
										onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
										invalid={{ status: false, message: null }}
										disabled={false}
									/>
									<S.SubmitContainer>{getButton()}</S.SubmitContainer>
								</S.Form>
							</S.FormFixedContainer>
						</S.FormContainer>
					</S.FormWrapper>
				</S.ContentWrapper>
			</S.Wrapper>
		);
	}

	function getPage() {
		if (isLoading) {
			return <Loader sm />;
		} else {
			return (
				<Query value={'owner'} check={[arProvider.walletAddress]}>
					{getData()}
				</Query>
			);
		}
	}

	return arProvider.walletAddress ? <>{getPage()}</> : showWalletBlock && <WalletBlock />;
}

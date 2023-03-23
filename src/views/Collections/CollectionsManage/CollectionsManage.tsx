import React from 'react';

import {
	ArtifactArgsType,
	ArtifactResponseType,
	CollectionStateType,
	CollectionType,
	CursorEnum,
	getArtifactsByBookmarks
} from 'arcframework';

import { createCollection, getCollection, initCollection, saveCollection } from 'collections/collections';
import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Loader } from 'components/atoms/Loader';
import { TextArea } from 'components/atoms/TextArea';
import { OwnerArtifacts } from 'global/Owner/OwnerArtifacts';
import { getArtifactsByUser } from 'gql';
import { URLS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { REDUX_TABLES } from 'helpers/redux';
import { useQuery } from 'hooks/useQuery';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { WalletBlock } from 'wallet/WalletBlock';
import { Query } from 'wrappers/Query';

import * as S from './styles';

// TODO: Cancel Action
// TODO: Cache Selected Ids
export default function CollectionsManage() {
	const query = useQuery();
	const arProvider = useArweaveProvider();
	const [title, setTitle] = React.useState<string>('');
	const [topic, setTopic] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');
	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);
	const [contractId, setContractId] = React.useState<string>(null);
	const [contract, setContract] = React.useState<CollectionType>(null);

	const [tableType, setTableType] = React.useState<{
		fn: (args: ArtifactArgsType) => Promise<ArtifactResponseType>;
		cursorType: string;
	}>({
		fn: getArtifactsByUser,
		cursorType: REDUX_TABLES.accountAll,
	});

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
				setSelectedIds(contract.state.ids);
				setTitle(contract.state.title);
				setTopic(contract.state.topic);
				setDescription(contract.state.description);
			});
		}
	}, []);

	function handleIdUpdate(id: string) {
		let idList = [];
		for (let i = 0; i < selectedIds.length; i++) {
			idList.push(selectedIds[i]);
		}
		const index = idList.indexOf(id);
		if (index > -1) {
			idList.splice(index, 1);
		} else {
			idList.push(id);
		}
		setSelectedIds(idList);
	}

	function getInvalidTitle() {
		return { status: false, message: null };
		// return { status: true, message: LANGUAGE.collectionNameAlreadyExists };
	}

	function getAccountTab(urls: any[], label: string) {
		for (let i = 0; i < urls.length; i++) {
			if (urls[i].label === label) {
				return urls[i];
			}
		}
		return urls[0];
	}

	const allAction = getAccountTab(URLS.account, LANGUAGE.account.all.title);
	const bookmarksAction = getAccountTab(URLS.account, LANGUAGE.account.bookmarks.title);

	function getAction() {
		return (
			<S.ActionContainer>
				<S.ActionButtonContainer>
					<Button
						type={'alt2'}
						label={allAction.label}
						handlePress={() =>
							setTableType({
								fn: getArtifactsByUser,
								cursorType: REDUX_TABLES.accountAll,
							})
						}
						active={tableType.cursorType === REDUX_TABLES.accountAll}
						icon={allAction.icon}
						iconLeftAlign
						disabled={false}
						noMinWidth
					/>
				</S.ActionButtonContainer>
				<S.ActionButtonContainer>
					<Button
						type={'alt2'}
						label={bookmarksAction.label}
						handlePress={() =>
							setTableType({
								fn: getArtifactsByBookmarks,
								cursorType: REDUX_TABLES.accountBookmarks,
							})
						}
						active={tableType.cursorType === REDUX_TABLES.accountBookmarks}
						icon={bookmarksAction.icon}
						iconLeftAlign
						disabled={false}
						noMinWidth
					/>
				</S.ActionButtonContainer>
			</S.ActionContainer>
		);
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
			collectionInitState.ids = selectedIds;
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
			collectionState.ids = selectedIds;

			let collectionSave: CollectionType = {
				id: contractId,
				state: collectionState,
			};

			await saveCollection(collectionSave);

			setIsLoading(false);
		}
	}

	function getSubmitDisabled() {
		return !title || getInvalidTitle().status || !topic || !description || selectedIds.length <= 0;
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
					<S.HeaderContent>
						<S.HeaderContentFixed>
							<S.Header1Wrapper>
								<S.Header1>{LANGUAGE.manageCollection}</S.Header1>
							</S.Header1Wrapper>
						</S.HeaderContentFixed>
					</S.HeaderContent>
				</S.HeaderWrapper>
				<S.ContentWrapper>
					<S.ArtifactsWrapper>
						<OwnerArtifacts
							owner={query.get('owner')}
							fetch={tableType.fn}
							reduxCursor={tableType.cursorType}
							showActions={true}
							showPoolIds={true}
							showSearch={false}
							bookmarksDisabled={false}
							selectCallback={(id: string) => handleIdUpdate(id)}
							selectedCallbackIds={selectedIds}
							disabledSelectedCallbackIds={null}
							cursorObject={{
								key: CursorEnum.Search,
								value: tableType.cursorType,
							}}
							usePreviewModal={true}
							action={getAction()}
						/>
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

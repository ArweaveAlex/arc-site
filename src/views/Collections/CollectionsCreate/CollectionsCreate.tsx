import React from 'react';

import { useQuery } from 'hooks/useQuery';
import { Query } from 'wrappers/Query';
import { WalletBlock } from 'wallet/WalletBlock';
import { OwnerArtifacts } from 'global/Owner/OwnerArtifacts';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { TextArea } from 'components/atoms/TextArea';

import { getArtifactsByBookmarks, getArtifactsByUser } from 'gql/artifacts';
import { REDUX_TABLES } from 'helpers/redux';
import { LANGUAGE } from 'helpers/language';
import { URLS } from 'helpers/config';
import { CollectionStateType, CursorEnum, ArtifactArgsType, ArtifactResponseType } from 'helpers/types';
import { createCollection } from 'collections/collections';
import * as S from './styles';
import { useArweaveProvider } from 'providers/ArweaveProvider';

// TODO: Cancel Action
// TODO: Cache Selected Ids
export default function CollectionsCreate() {
	const query = useQuery();
	const arProvider = useArweaveProvider();

	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);
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

	const [title, setTitle] = React.useState<string>('');
	const [topic, setTopic] = React.useState<string>('');
	const [description, setDescription] = React.useState<string>('');
	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

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

	function getSubmitDisabled() {
		return !title || getInvalidTitle().status || !topic || !description || selectedIds.length <= 0;
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

	async function handleSubmit() {
		if (arProvider.walletAddress) {
			const collectionState: CollectionStateType = {
				ids: selectedIds,
				title: title,
				topic: topic,
				description: description,
				timestamp: Date.now().toString(),
			};

			const collectionContractId = await createCollection(collectionState, topic, arProvider.walletAddress);
			console.log(collectionContractId);
		}
	}

	function getData() {
		return (
			<S.Wrapper>
				<S.HeaderWrapper>
					<S.HeaderContent>
						<S.HeaderContentFixed>
							<S.Header1Wrapper>
								<S.Header1>{LANGUAGE.createCollection}</S.Header1>
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
										onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
											setDescription(e.target.value)
										}
										invalid={{ status: false, message: null }}
										disabled={false}
									/>
									<S.SubmitContainer>
										<Button
											type={'alt1'}
											label={LANGUAGE.submit}
											handlePress={() => handleSubmit()}
											disabled={getSubmitDisabled()}
											noMinWidth
										/>
									</S.SubmitContainer>
								</S.Form>
							</S.FormFixedContainer>
						</S.FormContainer>
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

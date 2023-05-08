import React from 'react';

import { ArtifactArgsType, ArtifactResponseType, CursorEnum } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { OwnerArtifacts } from 'global/Owner/OwnerArtifacts';
import { getArtifactsByBookmarks, getArtifactsByUser } from 'gql';
import { URLS } from 'helpers/config';
import { language } from 'helpers/language';
import { REDUX_TABLES } from 'helpers/redux';

import * as S from './styles';
import { IProps } from './types';

export default function CollectionsManageArtifacts(props: IProps) {
	const [tableType, setTableType] = React.useState<{
		fn: (args: ArtifactArgsType) => Promise<ArtifactResponseType>;
		cursorType: string;
	}>({
		fn: getArtifactsByUser,
		cursorType: REDUX_TABLES.accountAll,
	});

	function handleIdUpdate(id: string) {
		let idList = [];
		for (let i = 0; i < props.selectedIds.length; i++) {
			idList.push(props.selectedIds[i]);
		}
		const index = idList.indexOf(id);
		if (index > -1) {
			idList.splice(index, 1);
		} else {
			idList.push(id);
		}
		props.setSelectedIds(idList);
	}

	function getAccountTab(urls: any[], label: string) {
		for (let i = 0; i < urls.length; i++) {
			if (urls[i].label === label) {
				return urls[i];
			}
		}
		return urls[0];
	}

	const allAction = getAccountTab(URLS.account, language.account.all.title);
	const bookmarksAction = getAccountTab(URLS.account, language.account.bookmarks.title);

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

	return (
		<OwnerArtifacts
			owner={props.owner}
			fetch={tableType.fn}
			reduxCursor={tableType.cursorType}
			showActions={true}
			showPoolIds={true}
			showSearch={false}
			bookmarksDisabled={false}
			selectCallback={(id: string) => handleIdUpdate(id)}
			selectedCallbackIds={props.selectedIds}
			disabledSelectedCallbackIds={null}
			cursorObject={{
				key: CursorEnum.Search,
				value: tableType.cursorType,
			}}
			usePreviewModal={true}
			action={getAction()}
		/>
	);
}

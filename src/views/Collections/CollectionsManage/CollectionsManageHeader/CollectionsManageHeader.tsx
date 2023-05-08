import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CursorEnum } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { Modal } from 'components/molecules/Modal';
import { ArtifactsCollection } from 'global/ArtifactsCollection';
import { OwnerArtifacts } from 'global/Owner/OwnerArtifacts';
import { getArtifactsByIds } from 'gql';
import { language } from 'helpers/language';
import { REDUX_TABLES } from 'helpers/redux';

import * as S from './styles';
import { IAProps, IProps } from './types';

function HeaderAction(props: IAProps) {
	return (
		<Modal header={props.header} handleClose={() => props.handleClose()} useMax>
			<S.ModalContainer>{props.component}</S.ModalContainer>
		</Modal>
	);
}

export default function CollectionsManageHeader(props: IProps) {
	const navigate = useNavigate();

	const [showPreview, setShowPreview] = React.useState<boolean>(false);
	const [showEdit, setShowEdit] = React.useState<boolean>(false);

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

	return (
		<>
			{showPreview && (
				<HeaderAction
					component={
						<ArtifactsCollection
							selectedIds={props.selectedIds}
							title={props.title}
							topic={props.topic}
							description={props.description}
						/>
					}
					header={language.previewCollection}
					handleClose={() => setShowPreview(false)}
				/>
			)}
			{showEdit && (
				<HeaderAction
					component={
						<OwnerArtifacts
							owner={props.owner}
							fetch={getArtifactsByIds}
							ids={props.selectedIds}
							reduxCursor={null}
							showActions={true}
							showPoolIds={true}
							showSearch={false}
							bookmarksDisabled={false}
							selectCallback={(id: string) => handleIdUpdate(id)}
							selectedCallbackIds={props.selectedIds}
							disabledSelectedCallbackIds={null}
							cursorObject={{
								key: CursorEnum.Search,
								value: REDUX_TABLES.accountAll,
							}}
							usePreviewModal={true}
							action={null}
						/>
					}
					header={language.editSelectedArtifacts}
					handleClose={() => setShowEdit(false)}
				/>
			)}
			<S.HeaderContent>
				<S.HeaderContentFixed>
					<S.Header>
						<S.Header1>{language.createCollection}</S.Header1>
						<S.Actions>
							<S.Action>
								<Button
									type={'alt1'}
									label={language.previewCollection}
									handlePress={() => setShowPreview(!showPreview)}
									noMinWidth
									disabled={props.selectedIds.length <= 0}
								/>
							</S.Action>
							<S.Action>
								<Button
									type={'alt1'}
									label={language.editSelectedArtifacts}
									handlePress={() => setShowEdit(!showEdit)}
									noMinWidth
									disabled={props.selectedIds.length <= 0}
								/>
							</S.Action>
							<S.Action>
								<Button
									type={'success'}
									label={language.publish}
									handlePress={() => console.log('Publish')}
									noMinWidth
									disabled={true}
								/>
							</S.Action>
							<S.Action>
								<Button type={'warning'} label={language.exit} handlePress={() => navigate(-1)} noMinWidth />
							</S.Action>
						</S.Actions>
					</S.Header>
				</S.HeaderContentFixed>
			</S.HeaderContent>
		</>
	);
}

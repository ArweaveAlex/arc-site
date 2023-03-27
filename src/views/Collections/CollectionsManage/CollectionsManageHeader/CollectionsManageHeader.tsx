import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ArtifactDetailType, getArtifactById } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { Carousel } from 'components/molecules/Carousel';
import { Modal } from 'components/molecules/Modal';
import { DOM } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { StepType } from 'helpers/types';
import { ArtifactViewSingle } from 'views/Artifact/ArtifactSingle/ArtifactViewSingle';

import * as S from './styles';
import { IProps } from './types';

function CollectionPreview(props: { selectedIds: string[]; handleClose: () => void }) {
	const [currentId, setCurrentId] = React.useState<string | null>(null);
	const [currentData, setCurrentData] = React.useState<ArtifactDetailType | null>(null);

	React.useEffect(() => {
		if (props.selectedIds && props.selectedIds.length > 0) {
			setCurrentId(props.selectedIds[0]);
		}
	}, [props.selectedIds]);

	React.useEffect(() => {
		(async function () {
			if (currentId) {
				setCurrentData(await getArtifactById(currentId));
			}
		})();
	}, [currentId]);

	function handleUpdate(action: StepType) {
		const currentIndex = props.selectedIds.indexOf(currentId);
		setTimeout(() => {
			setCurrentData(null);
		}, 200);
		setCurrentId(action === 'prev' ? props.selectedIds[currentIndex - 1] : props.selectedIds[currentIndex + 1]);
	}

	function getArtifactList() {
		return props.selectedIds.map((id: string) => {
			return (
				<S.ArtifactPreviewContainer id={DOM.preview} key={id}>
					<ArtifactViewSingle data={currentData} />
				</S.ArtifactPreviewContainer>
			);
		});
	}

	return (
		<Modal header={LANGUAGE.previewCollection} handleClose={() => props.handleClose()} useMax>
			<S.ModalContainer>
				<S.C2 column={false}>
					<S.C2Header>
						<p>{LANGUAGE.collectionDetails}</p>
					</S.C2Header>
					<S.C2Body column={false}>
						<S.ContentLine>
							<S.InfoData>
								<span>Title</span>
								<S.BodyData>Example Title</S.BodyData>
							</S.InfoData>
						</S.ContentLine>
						<S.ContentLine>
							<S.InfoData>
								<span>Topic</span>
								<S.BodyData>Example Topic</S.BodyData>
							</S.InfoData>
						</S.ContentLine>
						<S.ContentLine>
							<S.InfoData>
								<span>Description</span>
								<S.BodyData>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper posuere sapien, nec bibendum
									justo elementum eu. Suspendisse euismod urna a nisi pharetra, ac dignissim metus molestie.
								</S.BodyData>
							</S.InfoData>
						</S.ContentLine>
					</S.C2Body>
					<S.InfoData>
						<p>Artifact Count: {props.selectedIds.length}</p>
					</S.InfoData>
				</S.C2>
				<S.CarouselContainer>
					<Carousel
						title={LANGUAGE.artifacts}
						data={getArtifactList()}
						callback={{ fn: (action: StepType) => handleUpdate(action), disabled: false }}
					/>
				</S.CarouselContainer>
			</S.ModalContainer>
		</Modal>
	);
}

// TODO: Create / Edit verbiage
// TODO: Back / Exit clicked warning
export default function CollectionsManageHeader(props: IProps) {
	const navigate = useNavigate();

	const [showPreview, setShowPreview] = React.useState<boolean>(true);

	function handlePreviewCollection() {
		setShowPreview(!showPreview);
	}

	// TODO: ArtifactsTable get artifacts by ids with remove option
	function handleEditArtifacts() {
		console.log(props.selectedIds);
	}

	function handleExit() {
		navigate(-1);
	}

	return (
		<>
			{showPreview && <CollectionPreview selectedIds={props.selectedIds} handleClose={() => setShowPreview(false)} />}
			<S.HeaderContent>
				<S.HeaderContentFixed>
					<S.Header>
						<S.Header1>{LANGUAGE.createCollection}</S.Header1>
						<S.Actions>
							<S.Action>
								<Button
									type={'primary'}
									label={LANGUAGE.previewCollection}
									handlePress={() => handlePreviewCollection()}
									noMinWidth
									disabled={props.selectedIds.length <= 0}
								/>
							</S.Action>
							<S.Action>
								<Button
									type={'primary'}
									label={LANGUAGE.editSelectedArtifacts}
									handlePress={() => handleEditArtifacts()}
									noMinWidth
									disabled={props.selectedIds.length <= 0}
								/>
							</S.Action>
							<S.Action>
								<Button type={'warning'} label={LANGUAGE.exit} handlePress={() => handleExit()} noMinWidth />
							</S.Action>
						</S.Actions>
					</S.Header>
				</S.HeaderContentFixed>
			</S.HeaderContent>
		</>
	);
}

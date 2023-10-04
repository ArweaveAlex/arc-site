import React from 'react';

import { ArtifactDetailType, getArtifactById } from 'arcframework';

import { Carousel } from 'components/molecules/Carousel';
import { DOM } from 'helpers/config';
import { language } from 'helpers/language';
import { StepType } from 'helpers/types';
import { ArtifactRendererSingle } from 'views/Artifact/ArtifactSingle/ArtifactRendererSingle';

import * as S from './styles';
import { IProps } from './types';

export default function ArtifactsCollection(props: IProps) {
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
					<ArtifactRendererSingle data={currentData} />
				</S.ArtifactPreviewContainer>
			);
		});
	}

	return (
		<S.Wrapper>
			<S.C2 column={false}>
				<S.C2Header>
					<p>{language.collectionDetails}</p>
				</S.C2Header>
				<S.C2Body column={false}>
					<S.ContentLine>
						<S.InfoData>
							<span>{language.title}</span>
							<S.BodyData>{props.title ? props.title : `-`}</S.BodyData>
						</S.InfoData>
					</S.ContentLine>
					<S.ContentLine>
						<S.InfoData>
							<span>{language.topic}</span>
							<S.BodyData>{props.topic ? props.topic : `-`}</S.BodyData>
						</S.InfoData>
					</S.ContentLine>
					<S.ContentLine>
						<S.InfoData>
							<span>{language.description}</span>
							<S.BodyData>{props.description ? props.description : `-`}</S.BodyData>
						</S.InfoData>
					</S.ContentLine>
				</S.C2Body>
				<S.InfoData>
					<p>{`${language.artifactCount}: ${props.selectedIds.length}`}</p>
				</S.InfoData>
			</S.C2>
			<S.CarouselContainer>
				<Carousel
					title={language.artifacts}
					data={getArtifactList()}
					callback={{ fn: (action: StepType) => handleUpdate(action), disabled: false }}
				/>
			</S.CarouselContainer>
		</S.Wrapper>
	);
}

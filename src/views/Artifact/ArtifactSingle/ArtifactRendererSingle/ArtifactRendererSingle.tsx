import { ArtifactEnum, TAGS } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { ARTIFACT_TYPES } from 'helpers/config';

import { ArtifactDetailSingle } from '../ArtifactDetailSingle';
import { IProps } from '../types';

import { ArtifactAudioSingle } from './ArtifactAudioSingle';
import { ArtifactDocumentSingle } from './ArtifactDocumentSingle';
import { ArtifactEbookSingle } from './ArtifactEbookSingle';
import { ArtifactImageSingle } from './ArtifactImageSingle';
import { ArtifactMessagingSingle } from './ArtifactMessagingSingle';
import { ArtifactNostrSingle } from './ArtifactNostrSingle';
import { ArtifactRedditSingle } from './ArtifactRedditSingle';
import { ArtifactVideoSingle } from './ArtifactVideoSingle';
import { ArtifactWebpageSingle } from './ArtifactWebpageSingle';
import * as S from './styles';

export default function ArtifactViewSingle(props: IProps) {
	function getArtifactType() {
		if (props.data) {
			let artifactType = ARTIFACT_TYPES[props.data.artifactType];
			if (artifactType) {
				return artifactType;
			} else {
				return ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
			}
		} else {
			return null;
		}
	}

	function getArtifact() {
		if (props.data) {
			switch (props.data.artifactType) {
				case ArtifactEnum.Image:
					return <ArtifactImageSingle data={props.data} />;
				case ArtifactEnum.Messaging:
					return <ArtifactMessagingSingle data={props.data} />;
				case ArtifactEnum.Nostr:
					return <ArtifactNostrSingle data={props.data} />;
				case ArtifactEnum.Reddit:
					return <ArtifactRedditSingle data={props.data} />;
				case ArtifactEnum.Webpage:
					return <ArtifactWebpageSingle data={props.data} />;
				case ArtifactEnum.Ebook:
					return <ArtifactEbookSingle data={props.data} />;
				case ArtifactEnum.Document:
					return <ArtifactDocumentSingle data={props.data} />;
				case ArtifactEnum.Audio:
					return <ArtifactAudioSingle data={props.data} />;
				case ArtifactEnum.Video:
					return <ArtifactVideoSingle data={props.data} />;
				default:
					return <ArtifactDetailSingle data={props.data} type={getArtifactType()} />;
			}
		} else {
			return (
				<div className={'wrapper-600'}>
					<Loader />
				</div>
			);
		}
	}

	return <S.Wrapper>{getArtifact()}</S.Wrapper>;
}

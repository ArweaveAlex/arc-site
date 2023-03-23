import { ArtifactEnum } from 'arcframework';

import { Loader } from 'components/atoms/Loader';

import { IProps } from '../types';

import { ArtifactImageSingle } from './ArtifactImageSingle';
import { ArtifactMessagingSingle } from './ArtifactMessagingSingle';
import { ArtifactNostrSingle } from './ArtifactNostrSingle';
import { ArtifactRedditSingle } from './ArtifactRedditSingle';
import { ArtifactWebpageSingle } from './ArtifactWebpageSingle';
import * as S from './styles';

export default function ArtifactViewSingle(props: IProps) {
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
				default:
					return null;
			}
		} else {
			return (
				<S.LoadingContainer>
					<Loader sm />
				</S.LoadingContainer>
			);
		}
	}

	return <S.Wrapper>{getArtifact()}</S.Wrapper>;
}

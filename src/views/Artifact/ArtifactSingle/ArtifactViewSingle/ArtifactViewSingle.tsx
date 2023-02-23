import { ArtifactMessagingSingle } from './ArtifactMessagingSingle';
import { ArtifactNostrSingle } from './ArtifactNostrSingle';
import { ArtifactWebpageSingle } from './ArtifactWebpageSingle';
import { ArtifactRedditSingle } from './ArtifactRedditSingle';

import { Loader } from 'components/atoms/Loader';

import { ArtifactEnum } from 'helpers/types';
import { IProps } from '../types';
import * as S from './styles';

export default function ArtifactViewSingle(props: IProps) {
	function getArtifact() {
		if (props.data) {
			switch (props.data.artifactType) {
				case ArtifactEnum.Messaging:
					return <ArtifactMessagingSingle data={props.data} />;
				case ArtifactEnum.Nostr:
					return <ArtifactNostrSingle data={props.data} />;
				case ArtifactEnum.Webpage:
					return <ArtifactWebpageSingle data={props.data} />;
				case ArtifactEnum.Reddit:
					return <ArtifactRedditSingle data={props.data} />;
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

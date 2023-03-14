import { ArtifactEnum } from 'helpers/types';
import { useQuery } from 'hooks/useQuery';
import { Query } from 'wrappers/Query';

import { IProps } from '../types';

import { ArtifactMessagingList } from './ArtifactMessagingList';
import { ArtifactNostrList } from './ArtifactNostrList';
import * as S from './styles';

export default function ArtifactViewList(props: IProps) {
	const query = useQuery();

	function getArtifactList() {
		switch (query.get('type')) {
			case ArtifactEnum.Messaging:
				return (
					<ArtifactMessagingList
						data={props.data}
						loading={props.loading}
						updateSequence={props.updateSequence}
						updateDisabled={props.updateDisabled}
					/>
				);
			case ArtifactEnum.Nostr:
				return (
					<ArtifactNostrList
						data={props.data}
						loading={props.loading}
						updateSequence={props.updateSequence}
						updateDisabled={props.updateDisabled}
					/>
				);
			default:
				return null;
		}
	}

	return (
		<Query value={'type'} check={[ArtifactEnum.Messaging, ArtifactEnum.Nostr]}>
			<S.Wrapper>{getArtifactList()}</S.Wrapper>
		</Query>
	);
}

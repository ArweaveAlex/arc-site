import { ArtifactEnum } from 'arcframework';

import { useQuery } from 'hooks/useQuery';
import { Query } from 'wrappers/Query';

import { IProps } from '../types';

import { ArtifactImageList } from './ArtifactImageList';
import { ArtifactMessagingList } from './ArtifactMessagingList';
import { ArtifactNostrList } from './ArtifactNostrList';
import * as S from './styles';

export default function ArtifactViewList(props: IProps) {
	const query = useQuery();
	let List: any = null;

	function getArtifactList() {
		switch (query.get('type')) {
			case ArtifactEnum.Image:
				List = ArtifactImageList;
				return;
			case ArtifactEnum.Messaging:
				List = ArtifactMessagingList;
				return;
			case ArtifactEnum.Nostr:
				List = ArtifactNostrList;
				return;
			default:
				return;
		}
	}

	getArtifactList();

	return (
		<Query value={'type'} check={[ArtifactEnum.Image, ArtifactEnum.Messaging, ArtifactEnum.Nostr]}>
			<S.Wrapper>
				<List
					data={props.data}
					loading={props.loading}
					updateSequence={props.updateSequence}
					updateDisabled={props.updateDisabled}
				/>
			</S.Wrapper>
		</Query>
	);
}

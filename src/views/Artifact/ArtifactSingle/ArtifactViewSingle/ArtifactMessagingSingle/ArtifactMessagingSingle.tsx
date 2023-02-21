import React from 'react';

import { MessagingListItem } from 'global/MessagingListItem';

import { Loader } from 'components/atoms/Loader';

import { IProps } from '../../types';
import * as S from './styles';
import { ArtifactEnum } from 'helpers/types';
import { NostrListItem } from 'global/NostrListItem';

export default function ArtifactMessagingSingle(props: IProps) {

	function getDetailData() {
		if (!props.data) {
			return <Loader sm />;
		} else {
			switch (props.data.artifactType) {
	            case ArtifactEnum.Messaging:
	                return (
	                    <MessagingListItem data={props.data} isListItem={false} active={true} showArtifactLink={true} showOwnerLink={true} />
	                )
				case ArtifactEnum.Nostr:
					return (
						<NostrListItem data={props.data} isListItem={false} active={true} showArtifactLink={true} showOwnerLink={true} />
					)
	            default:
	                return null
	        }
		}
	}

	return (
		<S.Wrapper>
			<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}

import { Loader } from 'components/atoms/Loader';
import { MessagingListItem } from 'global/MessagingListItem';

import { IProps } from '../../types';

import * as S from './styles';

export default function ArtifactMessagingSingle(props: IProps) {
	function getDetailData() {
		if (!props.data) {
			return <Loader sm />;
		} else {
			return (
				<MessagingListItem
					data={props.data}
					isListItem={false}
					active={false}
					showArtifactLink={false}
					showOwnerLink={false}
				/>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}

import { NostrListItem } from 'global/NostrListItem';

import { Loader } from 'components/atoms/Loader';

import { IProps } from '../../types';
import * as S from './styles';

export default function ArtifactNostrSingle(props: IProps) {

	function getDetailData() {
		if (!props.data) {
			return <Loader sm />;
		} else {
			return (
				<NostrListItem data={props.data} isListItem={false} active={true} showArtifactLink={true} showOwnerLink={true} />
			)
		}
	}

	return (
		<S.Wrapper>
			<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}

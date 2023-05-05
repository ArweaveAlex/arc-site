import { Loader } from 'components/atoms/Loader';
import { NostrListItem } from 'global/NostrListItem';

import { IProps } from '../../types';

import * as S from './styles';

export default function ArtifactNostrSingle(props: IProps) {
	function getDetailData() {
		if (!props.data) {
			return <Loader sm />;
		} else {
			return (
				<NostrListItem
					data={props.data}
					isListItem={false}
					active={true}
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

import { Loader } from 'components/atoms/Loader';
import { ImageListItem } from 'global/ImageListItem';

import { IProps } from '../../types';

import * as S from './styles';

export default function ArtifactImageSingle(props: IProps) {
	function getDetailData() {
		if (!props.data) {
			return <Loader />;
		} else {
			return (
				<ImageListItem
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

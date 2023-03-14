import React from 'react';
import parse from 'html-react-parser';

import { Loader } from 'components/atoms/Loader';

import { IProps } from '../../types';

import * as S from './styles';

export default function ArtifactWebpageSingle(props: IProps) {
	const [data, setData] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setData(new DOMParser().parseFromString(props.data.rawData, 'text/html').body.innerHTML);
		}
	}, [props.data]);

	return data ? (
		<S.Wrapper>
			<S.Container>{parse(data)}</S.Container>
		</S.Wrapper>
	) : (
		<S.LoadingContainer>
			<Loader sm />
		</S.LoadingContainer>
	);
}

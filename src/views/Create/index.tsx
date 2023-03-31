import React from 'react';

import * as windowUtils from 'helpers/window';

import * as S from './styles';

export default function Create() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	return (
		<S.Wrapper>
			<p>Create</p>
		</S.Wrapper>
	);
}

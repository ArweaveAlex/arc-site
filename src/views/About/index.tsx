import React from 'react';

import * as windowUtils from 'helpers/window';

import * as S from './styles';

export default function About() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	return (
		<S.Wrapper>
			<p>About</p>
		</S.Wrapper>
	);
}

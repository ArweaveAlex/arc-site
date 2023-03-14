import React from 'react';

import * as windowUtils from 'helpers/window';

import { LandingHeader } from './LandingHeader';
import { LandingInfo } from './LandingInfo';
import { LandingPools } from './LandingPools';
import { LandingSteps } from './LandingSteps';
import * as S from './styles';

export default function Landing() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	return (
		<S.Wrapper>
			<LandingHeader />
			<LandingPools />
			<LandingInfo />
			<LandingSteps />
		</S.Wrapper>
	);
}

import React from 'react';

import { LandingHeader } from './LandingHeader';
import { LandingPools } from './LandingPools';
import { LandingInfo } from './LandingInfo';
import { LandingSteps } from './LandingSteps';

import * as windowUtils from 'helpers/window';

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

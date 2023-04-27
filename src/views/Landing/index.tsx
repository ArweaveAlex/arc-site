import React from 'react';

import * as windowUtils from 'helpers/window';

import { LandingHeader } from './LandingHeader';
import { LandingInfo } from './LandingInfo';
import { LandingPools } from './LandingPools';

export default function Landing() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	return (
		<div>
			<LandingHeader />
			<LandingPools />
			<LandingInfo />
		</div>
	);
}

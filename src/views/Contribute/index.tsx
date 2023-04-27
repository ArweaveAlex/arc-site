import React from 'react';

import * as windowUtils from 'helpers/window';

import { ContributeDetail } from './ContributeDetail';
import { ContributeHeader } from './ContributeHeader';

export default function Contribute() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	return (
		<>
			<ContributeHeader />
			<ContributeDetail />
		</>
	);
}

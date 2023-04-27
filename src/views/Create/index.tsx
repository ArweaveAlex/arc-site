import React from 'react';

import * as windowUtils from 'helpers/window';

import { CreateHeader } from './CreateHeader';

export default function Create() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	return (
		<>
			<CreateHeader />
		</>
	);
}

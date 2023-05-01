import React from 'react';

import * as windowUtils from 'helpers/window';

import { DocsDetail } from './DocsDetail';

export default function Docs() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	return (
		<>
			<DocsDetail />
		</>
	);
}

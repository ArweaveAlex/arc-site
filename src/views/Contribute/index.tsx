import React from 'react';

import { DOM } from 'helpers/config';
import { language } from 'helpers/language';
import * as windowUtils from 'helpers/window';
import { Subheader } from 'navigation/subheader';

import { ContributeDetail } from './ContributeDetail';
import { ContributeHeader } from './ContributeHeader';

export default function Contribute() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	const subnavigation = [
		{ id: DOM.contribute.header, display: language.contributeView.subnav.header },
		{ id: DOM.contribute.howItWorks, display: language.contributeView.subnav.howItWorks },
	];

	return (
		<>
			<Subheader nodes={subnavigation} />
			<div className={'id-ref-140'} id={DOM.contribute.header}>
				<ContributeHeader />
			</div>
			<div className={'id-ref-140'} id={DOM.contribute.howItWorks}>
				<ContributeDetail />
			</div>
		</>
	);
}

import React from 'react';

import { DOM } from 'helpers/config';
import { language } from 'helpers/language';
import * as windowUtils from 'helpers/window';
import { Subheader } from 'navigation/subheader';

import { CreateHeader } from './CreateHeader';
import { CreateSteps } from './CreateSteps';

export default function Create() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	const subnavigation = [
		{ id: DOM.create.header, display: language.createView.subnav.header },
		{ id: DOM.create.howItWorks, display: language.createView.subnav.howItWorks },
	];

	return (
		<>
			<Subheader nodes={subnavigation} />
			<div className={'id-ref-140'} id={DOM.create.header}>
				<CreateHeader />
			</div>
			<div className={'id-ref-140'} id={DOM.create.howItWorks}>
				<CreateSteps />
			</div>
		</>
	);
}

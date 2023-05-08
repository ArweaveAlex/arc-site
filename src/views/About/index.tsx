import React from 'react';

import { DOM } from 'helpers/config';
import { language } from 'helpers/language';
import * as windowUtils from 'helpers/window';
import { Subheader } from 'navigation/subheader';

import { AboutDetail } from './AboutDetail';
import { AboutHeader } from './AboutHeader';
import { AboutInfo } from './AboutInfo';
import { AboutSteps } from './AboutSteps';

export default function About() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	const subnavigation = [
		{ id: DOM.about.header, display: language.aboutView.subnav.header },
		{ id: DOM.about.decentralization, display: language.aboutView.subnav.decentralization },
		{ id: DOM.about.howItWorks, display: language.aboutView.subnav.howItWorks },
	];

	return (
		<>
			<Subheader nodes={subnavigation} />
			<div className={'id-ref-140'} id={DOM.about.header}>
				<AboutHeader />
				<AboutDetail />
			</div>
			<div className={'id-ref-140'} id={DOM.about.decentralization}>
				<AboutInfo />
			</div>
			<div className={'id-ref-140'} id={DOM.about.howItWorks}>
				<AboutSteps />
			</div>
		</>
	);
}

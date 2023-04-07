import React from 'react';

import { DOM } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import * as windowUtils from 'helpers/window';
import { Subheader } from 'navigation/subheader';

import { AboutDetail } from './AboutDetail';
import { AboutHeader } from './AboutHeader';
import { AboutInfo } from './AboutInfo';
import { AboutSteps } from './AboutSteps';
import * as S from './styles';

export default function About() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	const subnavigation = [
		{ id: DOM.about.header, display: LANGUAGE.aboutView.subnav.header },
		{ id: DOM.about.decentralization, display: LANGUAGE.aboutView.subnav.decentralization },
		{ id: DOM.about.howItWorks, display: LANGUAGE.aboutView.subnav.howItWorks },
	];

	return (
		<S.Wrapper>
			<Subheader nodes={subnavigation} />
			<S.IDRef id={DOM.about.header}>
				<AboutHeader />
				<AboutDetail />
			</S.IDRef>
			<S.IDRef id={DOM.about.decentralization}>
				<AboutInfo />
			</S.IDRef>
			<S.IDRef id={DOM.about.howItWorks}>
				<AboutSteps />
			</S.IDRef>
		</S.Wrapper>
	);
}

import React from 'react';

import { DOM } from 'helpers/config';
import { language } from 'helpers/language';
import * as windowUtils from 'helpers/window';
import { Subheader } from 'navigation/subheader';

import { TradeDetail } from './TradeDetail';
import { TradeHeader } from './TradeHeader';

export default function Trade() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	const subnavigation = [
		{ id: DOM.trade.header, display: language.tradeView.subnav.header },
		{ id: DOM.trade.howItWorks, display: language.tradeView.subnav.howItWorks },
	];

	return (
		<>
			<Subheader nodes={subnavigation} />
			<div className={'id-ref-140'} id={DOM.trade.header}>
				<TradeHeader />
			</div>
			<div className={'id-ref-140'} id={DOM.trade.howItWorks}>
				<TradeDetail />
			</div>
		</>
	);
}

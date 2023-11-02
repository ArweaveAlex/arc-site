import React from 'react';

import { DOM } from 'helpers/config';
import { language } from 'helpers/language';
import * as windowUtils from 'helpers/window';
import { Subheader } from 'navigation/subheader';

import { StorageDetail } from './StorageDetail';
import { StorageHeader } from './StorageHeader';

export default function Storage() {
	React.useEffect(() => {
		windowUtils.scrollTo(0, 0, 'smooth');
	}, []);

	const subnavigation = [
		{ id: DOM.storage.header, display: language.storageView.subnav.header },
		{ id: DOM.storage.howItWorks, display: language.storageView.subnav.howItWorks },
	];

	return (
		<>
			<Subheader nodes={subnavigation} />
			<div className={'id-ref-140'} id={DOM.storage.header}>
				<StorageHeader />
			</div>
			<div className={'id-ref-140'} id={DOM.storage.howItWorks}>
				<StorageDetail />
			</div>
		</>
	);
}

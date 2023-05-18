import React from 'react';

import { PoolAdditionalPropsType, PoolClient } from 'arcframework';

import { PoolTilesList } from 'global/PoolTilesList';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { useArweaveProvider } from 'providers/ArweaveProvider';

export default function AccountContributions() {
	const arProvider = useArweaveProvider();
	const poolClient = new PoolClient();

	const [data, setData] = React.useState<PoolAdditionalPropsType[]>(null);

	React.useEffect(() => {
		if (arProvider.walletAddress) {
			(async function () {
				setData(await poolClient.getUserContributions(arProvider.walletAddress));
			})();
		}
	}, [arProvider.walletAddress]);

	return (
		<PoolTilesList
			header={language.contributions}
			emptyDataMessage={language.noContributions}
			data={data}
			redirect={urls.pool}
		/>
	);
}

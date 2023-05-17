import React from 'react';

import * as ArcFramework from 'arcframework';

import { PoolTilesList } from 'global/PoolTilesList';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { useArweaveProvider } from 'providers/ArweaveProvider';

export default function AccountPools() {
	const arProvider = useArweaveProvider();

	const [data, setData] = React.useState<ArcFramework.PoolType[] | null>(null);

	React.useEffect(() => {
		if (arProvider.walletAddress) {
			(async function () {
				setData(await ArcFramework.getPoolsByOwner(arProvider.walletAddress));
			})();
		}
	}, [arProvider.walletAddress]);

	return (
		<PoolTilesList
			header={language.pools.header1}
			emptyDataMessage={language.noPools}
			data={data}
			redirect={(id: string) => urls.poolManageMine(id)}
		/>
	);
}

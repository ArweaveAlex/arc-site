import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { ReduxAccountPoolsUpdate } from 'store/account/ReduxAccountPoolsUpdate';

import * as ArcFramework from 'arcframework';

import { ButtonLink } from 'components/atoms/ButtonLink';
import { PoolTilesList } from 'components/organisms/PoolTilesList';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { useArweaveProvider } from 'providers/ArweaveProvider';

export default function AccountPools() {
	const accountReducer = useSelector((state: RootState) => state.accountReducer);

	const arProvider = useArweaveProvider();

	const [data, setData] = React.useState<ArcFramework.PoolType[] | null>(null);

	React.useEffect(() => {
		(async function () {
			if (accountReducer.pools.data && accountReducer.pools.data.length > 0 && arProvider.walletAddress) {
				if (arProvider.walletAddress === accountReducer.pools.data[0].state.owner) {
					setData(accountReducer.pools.data);
				} else {
					if (arProvider.walletAddress) {
						setData(await ArcFramework.getPoolsByOwner(arProvider.walletAddress));
					}
				}
			} else {
				if (arProvider.walletAddress) {
					setData(await ArcFramework.getPoolsByOwner(arProvider.walletAddress));
				}
			}
		})();
	}, [accountReducer.pools.data]);

	function getAction() {
		return <ButtonLink type={'alt1'} label={language.createPool} href={urls.poolsCreate} noMinWidth />;
	}

	return arProvider.walletAddress ? (
		<ReduxAccountPoolsUpdate id={arProvider.walletAddress}>
			<PoolTilesList
				header={language.pools.header1}
				emptyDataMessage={language.noPools}
				data={data}
				redirect={(id: string) => urls.poolManageMine(id)}
				action={getAction()}
			/>
		</ReduxAccountPoolsUpdate>
	) : null;
}

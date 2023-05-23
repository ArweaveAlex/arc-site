import React from 'react';
import { useSelector } from 'react-redux';

import * as ArcFramework from 'arcframework';

import { ButtonLink } from 'components/atoms/ButtonLink';
import { PoolTilesList } from 'global/PoolTilesList';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { ReduxAccountPoolsUpdate } from 'state/account/ReduxAccountPoolsUpdate';
import { RootState } from 'state/store';

export default function AccountPools() {
	const accountReducer = useSelector((state: RootState) => state.accountReducer);

	const arProvider = useArweaveProvider();

	const [data, setData] = React.useState<ArcFramework.PoolType[] | null>(null);

	React.useEffect(() => {
		if (accountReducer.pools.data) {
			setData(accountReducer.pools.data);
		}
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

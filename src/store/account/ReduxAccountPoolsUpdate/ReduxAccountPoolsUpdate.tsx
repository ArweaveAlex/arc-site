import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as ArcFramework from 'arcframework';

import { RootState } from 'store';
import * as accountActions from 'store/account/actions';

export default function ReduxAccountPoolsUpdate(props: { id: string; children: React.ReactNode }) {
	const dispatch = useDispatch();
	const accountReducer = useSelector((state: RootState) => state.accountReducer);

	const [sessionUpdated, setSessionUpdated] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			if (!accountReducer.pools.data || !sessionUpdated) {
				let pools: ArcFramework.PoolType[];
				try {
					pools = await ArcFramework.getPoolsByOwner(props.id);
					if (
						!accountReducer.pools.data ||
						(accountReducer.pools.data && accountReducer.pools.data.length < pools.length)
					) {
						dispatch(accountActions.setAccountPools({ pools: { data: pools } }));
					}
				} catch (e: any) {
					console.error(e);
				}
				setSessionUpdated(true);
			}
		})();
	}, [sessionUpdated, accountReducer.pools.data, dispatch]);

	return <>{props.children}</>;
}

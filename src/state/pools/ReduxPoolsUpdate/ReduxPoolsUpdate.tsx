import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIndexPools, getPools, PoolIndexType, PoolType } from 'arcframework';

import * as poolActions from 'state/pools/actions';
import { RootState } from 'state/store';

export default function ReduxPoolsUpdate(props: { children: React.ReactNode }) {
	const dispatch = useDispatch();
	const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

	const [sessionUpdated, setSessionUpdated] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			if (!poolsReducer.data || !sessionUpdated) {
				let pools: PoolIndexType[] | PoolType[];
				try {
					pools = await getIndexPools();
				} catch (e: any) {
					pools = await getPools();
				}

				dispatch(poolActions.setPools({ data: pools }));
				setSessionUpdated(true);
			}
		})();
	}, [sessionUpdated, poolsReducer.data, dispatch]);

	return <>{props.children}</>;
}

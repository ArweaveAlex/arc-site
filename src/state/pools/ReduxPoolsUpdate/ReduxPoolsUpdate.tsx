import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPools } from 'gql/pools';
import * as poolActions from 'state/pools/actions';
import { RootState } from 'state/store';

export default function ReduxPoolsUpdate(props: { children: React.ReactNode }) {
	const dispatch = useDispatch();
	const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

	const [sessionUpdated, setSessionUpdated] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			if (!poolsReducer.data || !sessionUpdated) {
				dispatch(poolActions.setPools({ data: await getPools() }));
				setSessionUpdated(true);
			}
		})();
	}, [sessionUpdated, poolsReducer.data, dispatch]);

	return <>{props.children}</>;
}

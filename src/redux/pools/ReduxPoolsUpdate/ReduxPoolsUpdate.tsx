import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as poolActions from "redux/pools/actions";
import { RootState } from "redux/store";
import { getPools } from "gql/pools";

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

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { initSearch, TableIdType  } from 'arcframework';

import * as searchActions from 'state/search/actions';
import { RootState } from 'state/store';

export default function ReduxSearchIndexUpdate(props: {
	id: TableIdType;
	indexIds: string[] | null;
	reduxCursor: string;
	children: React.ReactNode;
}) {
	const dispatch = useDispatch();
	const searchIndecesReducer = useSelector((state: RootState) => state.searchIndecesReducer);

	const [sessionUpdated, setSessionUpdated] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			if ((!searchIndecesReducer[props.reduxCursor] || !sessionUpdated) && props.indexIds) {
				dispatch(
					searchActions.setSearchIndeces({
						[props.reduxCursor]: {
							value: await initSearch(props.indexIds),
							id: props.id,
						},
					})
				);
				setSessionUpdated(true);
			}
		})();
	}, [sessionUpdated, searchIndecesReducer, dispatch, props.id, props.indexIds, props.reduxCursor]);

	return <>{props.children}</>;
}

import React from 'react';
import { useSelector } from 'react-redux';

import { PoolType } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { PoolsGrid } from 'global/PoolsGrid';
import { POOL_FILTERS } from 'helpers/config';
import { ReduxPoolsUpdate } from 'state/pools/ReduxPoolsUpdate';
import { RootState } from 'state/store';

import { PoolsHeader } from './PoolsHeader';

// TODO: Layout / Header
export default function Pools() {
	const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

	const [data, setData] = React.useState<PoolType[] | null>(null);
	const [currentFilter, setCurrentFilter] = React.useState<any>(POOL_FILTERS[0]);

	React.useEffect(() => {
		if (poolsReducer.data) {
			setData(poolsReducer.data);
		}
	}, [poolsReducer.data]);

	function getPoolFilter(option: string) {
		for (let i = 0; i < POOL_FILTERS.length; i++) {
			if (POOL_FILTERS[i].title === option) {
				return POOL_FILTERS[i];
			}
		}
	}

	function getData() {
		if (data) {
			return (
				<div className={'view-wrapper max-cutoff'}>
					<PoolsHeader />
					<PoolsGrid
						data={currentFilter.fn(data!, null)}
						title={currentFilter.title}
						setCurrentFilter={(option: string) => setCurrentFilter(getPoolFilter(option))}
					/>
				</div>
			);
		} else {
			return <Loader />;
		}
	}

	return <ReduxPoolsUpdate>{getData()}</ReduxPoolsUpdate>;
}

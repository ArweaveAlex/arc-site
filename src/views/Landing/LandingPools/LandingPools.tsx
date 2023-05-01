import React from 'react';
import { useSelector } from 'react-redux';

import { PoolType } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { PoolsGrid } from 'global/PoolsGrid';
import { POOL_FILTERS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { ReduxPoolsUpdate } from 'state/pools/ReduxPoolsUpdate';
import { RootState } from 'state/store';

import * as S from './styles';

const FETCH_COUNT = 9;

export default function LandingPools() {
	const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

	const [data, setData] = React.useState<PoolType[] | null>(null);
	const [count, setCount] = React.useState<number | null>(FETCH_COUNT);
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
					<S.Wrapper>
						<PoolsGrid
							data={currentFilter.fn(data!, count)}
							title={currentFilter.title}
							setCurrentFilter={(option: string) => setCurrentFilter(getPoolFilter(option))}
						/>
						{data && data.length > count && (
							<S.Action>
								<Button
									type={'primary'}
									label={LANGUAGE.exploreMore}
									handlePress={() => setCount(count + FETCH_COUNT)}
									height={52.5}
									width={275}
								/>
							</S.Action>
						)}
					</S.Wrapper>
				</div>
			);
		} else {
			return <Loader />;
		}
	}

	return <ReduxPoolsUpdate>{getData()}</ReduxPoolsUpdate>;
}

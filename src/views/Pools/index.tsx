import { PoolsGrid } from 'components/organisms/PoolsGrid';
import { DEFAULT_POOL_FETCH_COUNT } from 'helpers/config';

import { PoolsHeader } from './PoolsHeader';

export default function Pools() {
	return (
		<div className={'view-wrapper max-cutoff'}>
			<PoolsHeader />
			<PoolsGrid fetchCount={DEFAULT_POOL_FETCH_COUNT} />
		</div>
	);
}

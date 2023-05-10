import { PoolsGrid } from 'global/PoolsGrid';

import { PoolsHeader } from './PoolsHeader';

export default function Pools() {
	return (
		<div className={'view-wrapper max-cutoff'}>
			<PoolsHeader />
			<PoolsGrid fetchCount={null} />
		</div>
	);
}

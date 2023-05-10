import { PoolsGrid } from 'global/PoolsGrid';
import { DEFAULT_POOL_FETCH_COUNT } from 'helpers/config';

import * as S from './styles';

export default function LandingPools() {
	return (
		<div className={'view-wrapper max-cutoff'}>
			<S.Wrapper>
				<PoolsGrid fetchCount={DEFAULT_POOL_FETCH_COUNT} />
			</S.Wrapper>
		</div>
	);
}

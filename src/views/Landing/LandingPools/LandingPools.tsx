import { PoolsGrid } from 'components/organisms/PoolsGrid';
import { DEFAULT_POOL_FETCH_COUNT } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';

export default function LandingPools() {
	return (
		<div className={'view-wrapper max-cutoff'}>
			<S.Wrapper>
				<h2>{language.pools.header1}</h2>
				<PoolsGrid fetchCount={DEFAULT_POOL_FETCH_COUNT} />
			</S.Wrapper>
		</div>
	);
}

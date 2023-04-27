import { SocialShare } from 'global/SocialShare';
import { LANGUAGE } from 'helpers/language';

import * as S from './styles';

export default function PoolsHeader() {
	return (
		<S.HeaderWrapper className={'header-wrapper'}>
			<S.HeaderContent>
				<h2>{LANGUAGE.pools.header1}</h2>
				<SocialShare type={'primary'} href={window.location.href} title={LANGUAGE.sharePools} />
			</S.HeaderContent>
		</S.HeaderWrapper>
	);
}

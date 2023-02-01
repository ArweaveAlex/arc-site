import { SocialShare } from 'global/SocialShare';

import { LANGUAGE } from 'helpers/language';
import * as S from './styles';

export default function PoolsHeader() {
	return (
		<S.Wrapper>
			<S.HeaderWrapper>
				<S.HeaderContent>
					<S.Header1>{LANGUAGE.pools.header1}</S.Header1>
					<SocialShare type={'primary'} href={window.location.href} title={LANGUAGE.sharePools} />
				</S.HeaderContent>
			</S.HeaderWrapper>
		</S.Wrapper>
	);
}

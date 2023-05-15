import { language } from 'helpers/language';

import * as S from './styles';

export default function PoolsHeader() {
	return (
		<S.HeaderWrapper className={'header-wrapper'}>
			<S.HeaderContent>
				<h2>{language.createPool}</h2>
			</S.HeaderContent>
		</S.HeaderWrapper>
	);
}

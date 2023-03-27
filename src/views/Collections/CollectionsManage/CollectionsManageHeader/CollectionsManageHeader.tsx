import { LANGUAGE } from 'helpers/language';

import * as S from './styles';

// TODO: Create / Edit verbiage
export default function CollectionsManageHeader() {
	return (
		<S.HeaderContent>
			<S.HeaderContentFixed>
				<S.Header1Wrapper>
					<S.Header1>{LANGUAGE.manageCollection}</S.Header1>
				</S.Header1Wrapper>
			</S.HeaderContentFixed>
		</S.HeaderContent>
	);
}

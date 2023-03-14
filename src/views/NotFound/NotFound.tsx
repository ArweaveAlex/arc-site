import { LANGUAGE } from 'helpers/language';

import * as S from './styles';

export default function NotFound() {
	return (
		<S.Wrapper>
			<S.Content>
				<S.Header>404</S.Header>
				<S.Divider />
				<S.Message>{LANGUAGE.pageNotFound}</S.Message>
			</S.Content>
		</S.Wrapper>
	);
}

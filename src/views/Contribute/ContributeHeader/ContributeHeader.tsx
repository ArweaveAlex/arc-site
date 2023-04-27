import parse from 'html-react-parser';

import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';

import * as S from './styles';

export default function AboutHeader() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Content>
					<h1>{LANGUAGE.contributeView.header1}</h1>
					<S.Subheader1>{parse(LANGUAGE.contributeView.subHeader1)}</S.Subheader1>
					<S.Logo>
						<img src={ASSETS.contributeHeaderLogo} />
					</S.Logo>
					<S.Subheader2>{parse(LANGUAGE.contributeView.subHeader2)}</S.Subheader2>
				</S.Content>
			</S.Container>
		</S.Wrapper>
	);
}

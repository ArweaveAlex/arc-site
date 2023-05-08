import parse from 'html-react-parser';

import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';

export default function AboutHeader() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Content>
					<h1>{language.contributeView.header1}</h1>
					<S.Subheader1>{parse(language.contributeView.subHeader1)}</S.Subheader1>
					<S.Logo>
						<img src={ASSETS.contributeHeaderLogo} />
					</S.Logo>
					<S.Subheader2>{parse(language.contributeView.subHeader2)}</S.Subheader2>
				</S.Content>
			</S.Container>
		</S.Wrapper>
	);
}

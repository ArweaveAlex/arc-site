import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';

export default function AboutHeader() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Content>
					<h1>{language.createView.header1}</h1>
					<S.Subheader1>{parse(language.createView.subHeader1)}</S.Subheader1>
					<S.Logo>
						<ReactSVG src={ASSETS.createHeaderLogo} />
					</S.Logo>
					<S.Subheader2>{parse(language.createView.subHeader2)}</S.Subheader2>
				</S.Content>
			</S.Container>
		</S.Wrapper>
	);
}

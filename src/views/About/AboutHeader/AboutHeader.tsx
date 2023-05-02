import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';

import * as S from './styles';

export default function AboutHeader() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Content>
					<h1>{LANGUAGE.aboutView.header1}</h1>
					<h1>{LANGUAGE.aboutView.header2}</h1>
					<S.Subheader1>{parse(LANGUAGE.aboutView.subHeader1)}</S.Subheader1>
					<S.Logo>
						<ReactSVG src={ASSETS.aboutHeaderLogo} />
					</S.Logo>
					<S.Subheader2>{LANGUAGE.aboutView.subHeader2}</S.Subheader2>
				</S.Content>
			</S.Container>
		</S.Wrapper>
	);
}
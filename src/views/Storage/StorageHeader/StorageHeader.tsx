import parse from 'html-react-parser';

import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';

export default function StorageHeader() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Content>
					<h1>{language.storageView.header1}</h1>
					<S.Subheader1>{parse(language.storageView.subHeader1)}</S.Subheader1>
					<S.Logo>
						<img src={ASSETS.createHeaderLogo} />
					</S.Logo>
					<S.Subheader2>{parse(language.storageView.subHeader2)}</S.Subheader2>
				</S.Content>
			</S.Container>
		</S.Wrapper>
	);
}

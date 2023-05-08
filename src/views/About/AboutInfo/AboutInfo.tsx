import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';

export default function AboutInfo() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Content>
					<S.HeaderWrapper>
						<h2 className={'h2-alt-1'}>{language.aboutView.infoHeader1}</h2>
					</S.HeaderWrapper>
					<S.SectionsWrapper>
						<S.Section>
							<S.Asset>
								<ReactSVG src={ASSETS.aboutInfoLogo1} />
							</S.Asset>
							<S.Description>
								<p>{parse(language.aboutView.infoDescription1)}</p>
							</S.Description>
						</S.Section>
						<S.Section>
							<S.Asset>
								<ReactSVG src={ASSETS.aboutInfoLogo2} />
							</S.Asset>
							<S.Description>
								<p>{parse(language.aboutView.infoDescription2)}</p>
							</S.Description>
						</S.Section>
					</S.SectionsWrapper>
				</S.Content>
			</S.Container>
		</S.Wrapper>
	);
}

import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';

import * as S from './styles';

export default function AboutInfo() {
	return (
		<S.Wrapper>
			<S.Container>
				<S.Content>
					<S.Header>{LANGUAGE.aboutView.infoHeader1}</S.Header>
					<S.SectionsWrapper>
						<S.Section>
							<S.Asset>
								<ReactSVG src={ASSETS.aboutInfoLogo1} />
							</S.Asset>
							<S.Description>
								<p>{parse(LANGUAGE.aboutView.infoDescription1)}</p>
							</S.Description>
						</S.Section>
						<S.Section>
							<S.Asset>
								<ReactSVG src={ASSETS.aboutInfoLogo2} />
							</S.Asset>
							<S.Description>
								<p>{parse(LANGUAGE.aboutView.infoDescription2)}</p>
							</S.Description>
						</S.Section>
					</S.SectionsWrapper>
				</S.Content>
			</S.Container>
		</S.Wrapper>
	);
}

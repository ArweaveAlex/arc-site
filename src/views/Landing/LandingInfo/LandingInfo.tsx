import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { ButtonLink } from 'components/atoms/ButtonLink';
import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import * as urls from 'helpers/urls';

import * as S from './styles';

export default function LandingInfo() {
	return (
		<>
			<S.Wrapper>
				<S.Container className={'view-wrapper max-cutoff'}>
					<S.HeaderWrapper>
						<h2 className={'h2-alt-1'}>{LANGUAGE.landingView.infoHeader1}</h2>
						<p>{LANGUAGE.landingView.infoSubheader1}</p>
					</S.HeaderWrapper>
					<S.SectionsWrapper>
						<S.Section>
							<S.Description>
								<p>{parse(LANGUAGE.landingView.infoDescription1)}</p>
							</S.Description>
							<S.Asset>
								<ReactSVG src={ASSETS.aboutInfoLogo1} />
							</S.Asset>
						</S.Section>
						<S.Action>
							<ButtonLink
								type={'alt2'}
								label={LANGUAGE.landingView.infoAction1}
								href={urls.contribute}
								height={52.5}
								width={275}
							/>
						</S.Action>
					</S.SectionsWrapper>
				</S.Container>
			</S.Wrapper>
			<S.WrapperAlt>
				<S.Container className={'view-wrapper max-cutoff'}>
					<S.HeaderWrapperAlt1>
						<h2>{LANGUAGE.landingView.infoHeader2}</h2>
						<p>{LANGUAGE.landingView.infoSubheader2}</p>
					</S.HeaderWrapperAlt1>
					<S.SectionsWrapper>
						<S.SectionAlt>
							<S.Asset>
								<ReactSVG src={ASSETS.aboutInfoLogo2} />
							</S.Asset>
							<S.Description>
								<p>{parse(LANGUAGE.landingView.infoDescription2)}</p>
							</S.Description>
						</S.SectionAlt>
						<S.Action>
							<ButtonLink
								type={'primary'}
								label={LANGUAGE.landingView.infoAction2}
								href={urls.create}
								height={52.5}
								width={275}
							/>
						</S.Action>
					</S.SectionsWrapper>
				</S.Container>
			</S.WrapperAlt>
		</>
	);
}

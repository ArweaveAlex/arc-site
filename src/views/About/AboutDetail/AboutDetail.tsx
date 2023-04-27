import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { Button } from 'components/atoms/Button';
import { ARTIFACT_TYPES_DISPLAY } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { OPERATOR_REDIRECT } from 'helpers/paths';

import * as S from './styles';

// TODO: CTA to /create
export default function AboutDetail() {
	return (
		<>
			<S.Wrapper>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.Header>{LANGUAGE.aboutView.detail.section1.header}</S.Header>
							<S.Description>{parse(LANGUAGE.aboutView.detail.section1.description)}</S.Description>
							<S.Footer>{parse(LANGUAGE.aboutView.detail.section1.footer)}</S.Footer>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.Wrapper>
			<S.WrapperAlt1>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.Header>{LANGUAGE.aboutView.detail.section2.header}</S.Header>
							<S.Description>{parse(LANGUAGE.aboutView.detail.section2.description)}</S.Description>
							<S.Footer>{parse(LANGUAGE.aboutView.detail.section2.footer)}</S.Footer>
							<S.Action>
								<Button
									type={'primary'}
									label={LANGUAGE.aboutView.detail.action}
									handlePress={() => window.open(OPERATOR_REDIRECT, '_blank')}
									height={52.5}
									width={275}
								/>
							</S.Action>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.WrapperAlt1>
			<S.WrapperAlt2>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.HeaderAlt>{LANGUAGE.aboutView.detail.section3.header}</S.HeaderAlt>
							<S.DescriptionAlt>{parse(LANGUAGE.aboutView.detail.section3.description)}</S.DescriptionAlt>
							<S.FooterAlt>{parse(LANGUAGE.aboutView.detail.section3.footer)}</S.FooterAlt>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.WrapperAlt2>
			<S.ATWrapper>
				<S.ATHeader>{LANGUAGE.aboutView.detail.artifactTypes}</S.ATHeader>
				<S.ATListContainer>
					<S.ATList>
						{ARTIFACT_TYPES_DISPLAY.archives.map((type: any, index: number) => {
							return (
								<S.ATContainer key={index}>
									<ReactSVG src={type.icon} />
									<p>{type.display}</p>
								</S.ATContainer>
							);
						})}
					</S.ATList>
					<S.ATList>
						{ARTIFACT_TYPES_DISPLAY.platforms.map((type: any, index: number) => {
							return (
								<S.ATContainer key={index}>
									<ReactSVG src={type.icon} />
									<p>{type.display}</p>
								</S.ATContainer>
							);
						})}
					</S.ATList>
				</S.ATListContainer>
			</S.ATWrapper>
		</>
	);
}

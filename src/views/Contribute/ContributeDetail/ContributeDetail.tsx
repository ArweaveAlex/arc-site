import parse from 'html-react-parser';

import { Button } from 'components/atoms/Button';
import { ButtonLink } from 'components/atoms/ButtonLink';
import { language } from 'helpers/language';
import { WALLET_INFO_REDIRECT } from 'helpers/paths';
import * as urls from 'helpers/urls';

import * as S from './styles';

export default function AboutDetail() {
	return (
		<>
			<S.WrapperAlt2>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.HeaderAlt>{language.contributeView.detail.section1.header}</S.HeaderAlt>
							<S.DescriptionAlt>{parse(language.contributeView.detail.section1.description)}</S.DescriptionAlt>
							<S.FooterAlt>{parse(language.contributeView.detail.section1.footer)}</S.FooterAlt>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.WrapperAlt2>
			<S.WrapperAlt1>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.Header>{language.contributeView.detail.section2.header}</S.Header>
							<S.Description>{parse(language.contributeView.detail.section2.description1)}</S.Description>
							<S.Action>
								<Button
									type={'primary'}
									label={language.contributeView.detail.action}
									handlePress={() => window.open(WALLET_INFO_REDIRECT, '_blank')}
									height={52.5}
									width={275}
								/>
							</S.Action>
							<S.Description>{parse(language.contributeView.detail.section2.description2)}</S.Description>
							<S.Description>{parse(language.contributeView.detail.section2.description3)}</S.Description>
							<S.Description>{parse(language.contributeView.detail.section2.description4)}</S.Description>
							<S.Action>
								<ButtonLink
									type={'primary'}
									label={language.visitDocs}
									href={`${urls.docs}contributing`}
									height={52.5}
									width={275}
								/>
							</S.Action>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.WrapperAlt1>
			<S.WrapperAlt3>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.Header>{language.contributeView.detail.section3.header}</S.Header>
							<S.Description>{parse(language.contributeView.detail.section3.description)}</S.Description>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.WrapperAlt3>
		</>
	);
}

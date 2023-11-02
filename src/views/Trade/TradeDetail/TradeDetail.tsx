import parse from 'html-react-parser';

import { language } from 'helpers/language';

import * as S from './styles';

export default function TradeDetail() {
	return (
		<>
			<S.WrapperAlt2>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.HeaderAlt>{language.tradeView.detail.section1.header}</S.HeaderAlt>
							<S.DescriptionAlt>{parse(language.tradeView.detail.section1.description)}</S.DescriptionAlt>
							<S.FooterAlt>{parse(language.tradeView.detail.section1.footer)}</S.FooterAlt>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.WrapperAlt2>
			<S.WrapperAlt1>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.Header>{language.tradeView.detail.section2.header}</S.Header>
							<S.SWrapper>
								<S.Description>{language.tradeView.detail.section2.subheader1}</S.Description>
								<S.Step>{parse(language.tradeView.detail.section2.description1)}</S.Step>
								<S.Step>{parse(language.tradeView.detail.section2.description2)}</S.Step>
								<S.Step>{parse(language.tradeView.detail.section2.description3)}</S.Step>
								<S.Step>{parse(language.tradeView.detail.section2.description4)}</S.Step>
							</S.SWrapper>
						</S.Section>
						<S.Section>
							<S.SWrapper>
								<S.Description>{language.tradeView.detail.section2.subheader2}</S.Description>
								<S.Step>{parse(language.tradeView.detail.section2.collectionDescription1)}</S.Step>
								<S.Step>{parse(language.tradeView.detail.section2.collectionDescription2)}</S.Step>
								<S.Step>{parse(language.tradeView.detail.section2.collectionDescription3)}</S.Step>
								<S.Step>{parse(language.tradeView.detail.section2.collectionDescription4)}</S.Step>
								<S.Step>{parse(language.tradeView.detail.section2.collectionDescription5)}</S.Step>
								<S.Step>{parse(language.tradeView.detail.section2.collectionDescription6)}</S.Step>
							</S.SWrapper>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.WrapperAlt1>
			<S.WrapperAlt3>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.Header>{language.tradeView.detail.section3.header}</S.Header>
							<S.Description>{parse(language.tradeView.detail.section3.description)}</S.Description>
							<S.Footer>{parse(language.tradeView.detail.section3.footer)}</S.Footer>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.WrapperAlt3>
		</>
	);
}

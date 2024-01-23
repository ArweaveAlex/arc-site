import parse from 'html-react-parser';

import { language } from 'helpers/language';

import * as S from './styles';

export default function StorageDetail() {
	return (
		<>
			<S.WrapperAlt2>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.HeaderAlt>{language.storageView.detail.section1.header}</S.HeaderAlt>
							<S.DescriptionAlt>{parse(language.storageView.detail.section1.description)}</S.DescriptionAlt>
							<S.FooterAlt>{parse(language.storageView.detail.section1.footer)}</S.FooterAlt>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.WrapperAlt2>
			<S.WrapperAlt1>
				<S.Container>
					<S.Content>
						<S.Section>
							<S.Header>{language.storageView.detail.section2.header}</S.Header>
							<S.Description>{parse(language.storageView.detail.section2.description1)}</S.Description>
							<S.Description>{parse(language.storageView.detail.section2.description2)}</S.Description>
							<S.Description>{parse(language.storageView.detail.section2.description3)}</S.Description>
							<S.Description>{parse(language.storageView.detail.section2.list1)}</S.Description>
							<S.Description>{parse(language.storageView.detail.section2.list2)}</S.Description>
							<S.Description>{parse(language.storageView.detail.section2.list3)}</S.Description>
							<S.Description>{parse(language.storageView.detail.section2.list4)}</S.Description>
							<S.Description>{parse(language.storageView.detail.section2.list5)}</S.Description>
							<S.Description>{parse(language.storageView.detail.section2.list6)}</S.Description>
							<S.Description>{parse(language.storageView.detail.section2.footer)}</S.Description>
						</S.Section>
					</S.Content>
				</S.Container>
			</S.WrapperAlt1>
		</>
	);
}

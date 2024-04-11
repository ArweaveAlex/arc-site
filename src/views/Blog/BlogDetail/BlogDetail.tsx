import { language } from 'helpers/language';

import { BlogTemplate } from './BlogTemplate';
import * as S from './styles';

export default function BlogDetail() {
	return (
		<div className={'view-wrapper max-cutoff'}>
			<S.Wrapper>
				<S.HeaderWrapper>
					<S.HeaderContent>
						<h2>{language.blog}</h2>
					</S.HeaderContent>
				</S.HeaderWrapper>
				<S.BodyWrapper>
					<BlogTemplate />
				</S.BodyWrapper>
			</S.Wrapper>
		</div>
	);
}

import { BlogTemplate } from './BlogTemplate';
import * as S from './styles';

export default function BlogDetail() {
	return (
		<div className={'view-wrapper max-cutoff'}>
			<S.Wrapper>
				<S.BodyWrapper>
					<BlogTemplate />
				</S.BodyWrapper>
			</S.Wrapper>
		</div>
	);
}

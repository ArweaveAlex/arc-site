import { DocTemplate } from './DocTemplate';
import { Navigation } from './Navigation';
import * as S from './styles';

export default function DocsDetail() {
	return (
		<div className={'view-wrapper max-cutoff'}>
			<S.Wrapper>
				<S.HeaderWrapper>
					<S.HeaderContent>
						<h2>Docs</h2>
					</S.HeaderContent>
				</S.HeaderWrapper>
				<S.BodyWrapper>
					<Navigation />
					<DocTemplate />
				</S.BodyWrapper>
			</S.Wrapper>
		</div>
	);
}

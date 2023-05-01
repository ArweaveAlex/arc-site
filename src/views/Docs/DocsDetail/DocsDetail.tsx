import { DocTemplate } from './DocTemplate';
import { Navigation } from './Navigation';
import * as S from './styles';

export default function DocsDetail() {
	return (
		<div className={'view-wrapper max-cutoff'}>
			<S.Wrapper>
				<Navigation />
				<DocTemplate />
			</S.Wrapper>
		</div>
	);
}

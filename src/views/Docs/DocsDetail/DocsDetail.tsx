import { DocTemplate } from './DocTemplate';
import { Navigation } from './Navigation';
import * as S from './styles';

// TODO: mining-artifacts - add header explaining mining and options
// TODO: mining-artifacts - add file upload instructions

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

import { PoolContributors } from './PoolContributors';
import { PoolRecentlyMinted } from './PoolRecentlyMinted';
import * as S from './styles';
import { IProps } from './types';

export default function PoolStatistics(props: IProps) {
	return (
		<S.Wrapper>
			<PoolContributors data={props.headerData} />
			<PoolRecentlyMinted data={props.artifacts} />
		</S.Wrapper>
	);
}

import { OwnerCollectionsList } from './OwnerCollectionsList';

import { IProps } from './types';
import * as S from './styles';

const data = [
	{
		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
		state: {
			title: 'Collection 1',
			description:
				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
			timestamp: '1669746422730',
		},
	},
	{
		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
		state: {
			title: 'Collection 2',
			description:
				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
			timestamp: '1669746422730',
		},
	},
	{
		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
		state: {
			title: 'Collection 3',
			description:
				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
			timestamp: '1669746422730',
		},
	},
	{
		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
		state: {
			title: 'Collection 4',
			description:
				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
			timestamp: '1669746422730',
		},
	},
	{
		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
		state: {
			title: 'Collection 5',
			description:
				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
			timestamp: '1669746422730',
		},
	},
	{
		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
		state: {
			title: 'Collection 6',
			description:
				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
			timestamp: '1669746422730',
		},
	},
];

export default function OwnerCollections(props: IProps) {
	return (
		<S.Wrapper>
			<OwnerCollectionsList owner={props.owner} data={data} showCreateCollections={props.showCreateCollections} />
		</S.Wrapper>
	);
}

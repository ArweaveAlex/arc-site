import React from 'react';

import { CollectionType, getCollectionsByOwner } from 'arcframework';

import { useArweaveProvider } from 'providers/ArweaveProvider';

import { OwnerCollectionsList } from './OwnerCollectionsList';
import * as S from './styles';
import { IProps } from './types';
<<<<<<< HEAD

// const data = [
// 	{
// 		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
// 		state: {
// 			ids: ["PsNTVxx6LauegIamlK4ju92-noWpFxc8fTTmtiEHuAU"],
// 			title: 'Collection 1',
// 			description:
// 				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
// 			timestamp: '1669746422730',
// 		},
// 	},
// 	{
// 		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
// 		state: {
// 			ids: ["PsNTVxx6LauegIamlK4ju92-noWpFxc8fTTmtiEHuAU"],
// 			title: 'Collection 2',
// 			description:
// 				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
// 			timestamp: '1669746422730',
// 		},
// 	},
// 	{
// 		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
// 		state: {
// 			ids: ["PsNTVxx6LauegIamlK4ju92-noWpFxc8fTTmtiEHuAU"],
// 			title: 'Collection 3',
// 			description:
// 				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
// 			timestamp: '1669746422730',
// 		},
// 	},
// 	{
// 		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
// 		state: {
// 			ids: ["PsNTVxx6LauegIamlK4ju92-noWpFxc8fTTmtiEHuAU"],
// 			title: 'Collection 4',
// 			description:
// 				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
// 			timestamp: '1669746422730',
// 		},
// 	},
// 	{
// 		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
// 		state: {
// 			ids: ["PsNTVxx6LauegIamlK4ju92-noWpFxc8fTTmtiEHuAU"],
// 			title: 'Collection 5',
// 			description:
// 				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
// 			timestamp: '1669746422730',
// 		},
// 	},
// 	{
// 		id: 'EOzlo58lX5_oQw27u9WN4GLmV0dtpgjFE_dhhFCgFEU',
// 		state: {
// 			ids: ["PsNTVxx6LauegIamlK4ju92-noWpFxc8fTTmtiEHuAU"],
// 			title: 'Collection 6',
// 			description:
// 				"The Chinese government has enforced a policy of 'COVID Zero' -- ensuring that COVID-19 does not spread in any parts of the population. As outbreaks have arisen in the population, this has led to strict lockdowns and social unrest.",
// 			timestamp: '1669746422730',
// 		},
// 	},
// ];

const data = [];
=======
>>>>>>> dev

export default function OwnerCollections(props: IProps) {
	const [ownerCollections, setOwnerCollections] = React.useState<CollectionType[]>([]);
	const arProvider = useArweaveProvider();

	React.useEffect(() => {
		if (arProvider.walletAddress) {
			getCollectionsByOwner(arProvider.walletAddress).then((collectionsByOwner: CollectionType[]) => {
				if (collectionsByOwner.length > 0) {
					setOwnerCollections(collectionsByOwner);
				}
			});
		}
	}, [arProvider.walletAddress]);

	return (
		<S.Wrapper>
			<OwnerCollectionsList
				owner={props.owner}
				data={ownerCollections}
				showCreateCollections={props.showCreateCollections}
			/>
		</S.Wrapper>
	);
}

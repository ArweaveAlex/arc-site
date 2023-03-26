import React from 'react';

import { CollectionType, getCollectionsByOwner } from 'arcframework';

import { useArweaveProvider } from 'providers/ArweaveProvider';

import { OwnerCollectionsList } from './OwnerCollectionsList';
import * as S from './styles';
import { IProps } from './types';

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

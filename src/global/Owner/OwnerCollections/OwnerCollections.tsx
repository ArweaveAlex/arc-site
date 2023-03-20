import { OwnerCollectionsList } from './OwnerCollectionsList';

import { IProps } from './types';
import * as S from './styles';
import React from 'react';
import { CollectionType } from 'helpers/types';

import { getCollectionsByOwner } from 'collections/collections';
import { useArweaveProvider } from 'providers/ArweaveProvider';

export default function OwnerCollections(props: IProps) {
	const [ownerCollections, setOwnerCollections] = React.useState<CollectionType[]>([]);
	const arProvider = useArweaveProvider();

	React.useEffect(() => {
		if(arProvider.walletAddress){
			getCollectionsByOwner(arProvider.walletAddress).then((collectionsByOwner: CollectionType[]) => {
				if(collectionsByOwner.length > 0) {
					setOwnerCollections(collectionsByOwner);
				}
			});
		}
	}, [arProvider.walletAddress]);

	return (
		<S.Wrapper>
			<OwnerCollectionsList owner={props.owner} data={ownerCollections} showCreateCollections={props.showCreateCollections} />
		</S.Wrapper>
	);
}

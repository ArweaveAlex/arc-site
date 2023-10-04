import React from 'react';

import { CollectionsResponseType, CollectionType } from 'lib/clients/mint';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useMintProvider } from 'providers/MintProvider';

import { OwnerCollectionsList } from './OwnerCollectionsList';
import * as S from './styles';
import { IProps } from './types';

export default function OwnerCollections(props: IProps) {
	const arProvider = useArweaveProvider();
	const mintProvider = useMintProvider();

	const [ownerCollections, setOwnerCollections] = React.useState<CollectionType[] | null>(null);

	React.useEffect(() => {
		if (arProvider.walletAddress && mintProvider.mintClient) {
			mintProvider.mintClient
				.getCollectionsByUser({
					walletAddress: arProvider.walletAddress,
					cursor: null,
				})
				.then((collectionsByUser: CollectionsResponseType) => {
					if (collectionsByUser) {
						setOwnerCollections(collectionsByUser.collections);
					}
				});
		}
	}, [arProvider.walletAddress, mintProvider.mintClient]);

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

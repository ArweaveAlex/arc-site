import React from 'react';

import { getCollectionsByOwner } from 'arcframework';
import { CollectionsResponseType } from 'permaweb-orderbook';

import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useMintProvider } from 'providers/MintProvider';

import { CollectionType } from '../../../lib/clients/mint';

import { OwnerCollectionsList } from './OwnerCollectionsList';
import * as S from './styles';
import { IProps } from './types';

export default function OwnerCollections(props: IProps) {
	const [ownerCollections, setOwnerCollections] = React.useState<CollectionType[]>([]);
	const arProvider = useArweaveProvider();
	const mintProvider = useMintProvider();

	React.useEffect(() => {
		// TODO: unify CollectionType from arcframework and from this mint client
		// probably replace the one in arcframework
		// TODO: add a timestamp to the collection coming out of the client
		if (arProvider.walletAddress && mintProvider.mintClient) {
			mintProvider.mintClient
				.getCollectionsByUser({
					walletAddress: arProvider.walletAddress,
					cursor: null,
				})
				.then((collectionsByUser: CollectionsResponseType) => {
					if (collectionsByUser.collections && collectionsByUser.collections.length > 0) {
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

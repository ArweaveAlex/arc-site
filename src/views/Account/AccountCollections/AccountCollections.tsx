import { OwnerCollections } from 'global/Owner/OwnerCollections';

import { useArweaveProvider } from 'providers/ArweaveProvider';

// TODO - Create collections from empty list
export default function AccountCollections() {
	const arProvider = useArweaveProvider();

	return arProvider.walletAddress ? (
		<OwnerCollections owner={arProvider.walletAddress} showCreateCollections={true} />
	) : null;
}

import { OwnerCollections } from 'components/organisms/Owner/OwnerCollections';
import { useArweaveProvider } from 'providers/ArweaveProvider';

export default function AccountCollections() {
	const arProvider = useArweaveProvider();

	return arProvider.walletAddress ? (
		<OwnerCollections owner={arProvider.walletAddress} showCreateCollections={true} />
	) : null;
}

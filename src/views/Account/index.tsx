import React from 'react';

import { OwnerAccount } from 'global/Owner/OwnerAccount';
import { URLS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { WalletBlock } from 'wallet/WalletBlock';

export default function Account() {
	const arProvider = useArweaveProvider();

	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	React.useEffect(() => {
		setTimeout(() => {
			if (!arProvider.walletAddress) {
				setShowWalletBlock(true);
			}
		}, 200);
	}, [arProvider.walletAddress]);

	return arProvider.walletAddress ? (
		<OwnerAccount walletAddress={arProvider.walletAddress} header={LANGUAGE.account.header1} tabs={URLS.account} />
	) : (
		showWalletBlock && <WalletBlock />
	);
}

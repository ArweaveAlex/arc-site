import React from 'react';

import { OwnerAccount } from 'components/organisms/Owner/OwnerAccount';
import { URLS } from 'helpers/config';
import { language } from 'helpers/language';
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
		<div className={'view-wrapper max-cutoff'}>
			<OwnerAccount walletAddress={arProvider.walletAddress} header={language.account.header1} tabs={URLS.account} />
		</div>
	) : (
		showWalletBlock && <WalletBlock />
	);
}

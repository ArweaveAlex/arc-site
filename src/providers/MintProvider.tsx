import React from 'react';

import { MintClient, MintClientType } from 'lib/clients/mint/index';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useOrderBookProvider } from 'providers/OrderBookProvider';

interface MintContextState {
	mintClient: MintClientType | null;
	setUpdate: (update: boolean) => void;
}

interface MintProviderProps {
	children: React.ReactNode;
}

const DEFAULT_CONTEXT = {
	mintClient: null,
	setUpdate(_update: boolean) {},
};

const MintContext = React.createContext<MintContextState>(DEFAULT_CONTEXT);

export function useMintProvider(): MintContextState {
	return React.useContext(MintContext);
}

export function MintProvider(props: MintProviderProps) {
	const arProvider = useArweaveProvider();
	const orProvider = useOrderBookProvider();

	const [mintClient, setMintClient] = React.useState<MintClientType | null>(null);
	const [update, setUpdate] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (orProvider.orderBook) {
			setMintClient(
				MintClient.init({
					arClient: orProvider.orderBook.env.arClient,
				})
			);
		}
	}, [arProvider.wallet, arProvider.walletAddress, update, orProvider.orderBook]);

	return (
		<MintContext.Provider
			value={{
				mintClient,
				setUpdate: setUpdate,
			}}
		>
			{props.children}
		</MintContext.Provider>
	);
}

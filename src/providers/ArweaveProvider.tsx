import React from 'react';
import { ArweaveWebWallet } from 'arweave-wallet-connector';

import { getBalanceEndpoint, getProfile, ProfileType } from 'arcframework';

import { Modal } from 'components/molecules/Modal';
import { AR_WALLETS, ASSETS, WALLET_PERMISSIONS } from 'helpers/config';
import { language } from 'helpers/language';
import { WalletEnum } from 'helpers/types';

import * as S from './styles';

interface ArweaveContextState {
	wallets: { type: WalletEnum; logo: string }[];
	wallet: any;
	walletAddress: string | null;
	walletType: WalletEnum | null;
	availableBalance: number | null;
	handleConnect: any;
	handleDisconnect: () => void;
	walletModalVisible: boolean;
	setWalletModalVisible: (open: boolean) => void;
	arProfile: any;
}

interface ArweaveProviderProps {
	children: React.ReactNode;
}

const DEFAULT_CONTEXT = {
	wallets: [],
	wallet: null,
	walletAddress: null,
	walletType: null,
	availableBalance: null,
	handleConnect() {
		console.error(`No Connector Found`);
	},
	handleDisconnect() {
		console.error(`No Connection Found`);
	},
	walletModalVisible: false,
	setWalletModalVisible(_open: boolean) {
		console.error(`Make sure to render ArweaveProvider as an ancestor of the component that uses ARContext.Provider`);
	},
	arProfile: null,
};

const ARContext = React.createContext<ArweaveContextState>(DEFAULT_CONTEXT);

export function useArweaveProvider(): ArweaveContextState {
	return React.useContext(ARContext);
}

function WalletList(props: { handleConnect: any }) {
	return (
		<S.WalletListContainer>
			{AR_WALLETS.map((wallet: any, index: number) => (
				<S.WalletListItem key={index} onClick={() => props.handleConnect(wallet.type)}>
					<img src={`${wallet.logo}`} alt={''} />
					<span>{wallet.type.charAt(0).toUpperCase() + wallet.type.slice(1)}</span>
				</S.WalletListItem>
			))}
		</S.WalletListContainer>
	);
}

export function ArweaveProvider(props: ArweaveProviderProps) {
	const wallets = AR_WALLETS;

	const [wallet, setWallet] = React.useState<any>(null);
	const [walletType, setWalletType] = React.useState<WalletEnum | null>(null);
	const [walletModalVisible, setWalletModalVisible] = React.useState<boolean>(false);
	const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
	const [availableBalance, setAvailableBalance] = React.useState<number | null>(null);
	const [arProfile, setArProfile] = React.useState<ProfileType | null>(null);

	async function handleArConnect() {
		if (!walletAddress) {
			if (window.arweaveWallet) {
				try {
					await global.window?.arweaveWallet?.connect(WALLET_PERMISSIONS as any);
					setWalletAddress(await global.window.arweaveWallet.getActiveAddress());
					setWallet(window.arweaveWallet);
					setWalletType(WalletEnum.arConnect);
					setWalletModalVisible(false);
				} catch (e: any) {
					alert(e);
				}
			} else {
				alert(language.connectorNotFound);
			}
		}
	}

	async function handleArweaveApp() {
		const wallet = new ArweaveWebWallet({
			name: language.appName,
			logo: ASSETS.logoAlt,
		});
		wallet.setUrl(WalletEnum.arweaveApp);
		await wallet.connect();
		wallet.on('disconnect', () => {
			handleDisconnect();
		});
		setWallet(wallet);
		setWalletType(WalletEnum.arweaveApp);
	}

	async function handleConnect(walletType: WalletEnum.arConnect | WalletEnum.arweaveApp) {
		let walletObj: any = null;
		switch (walletType) {
			case WalletEnum.arConnect:
				handleArConnect();
				break;
			case WalletEnum.arweaveApp:
				handleArweaveApp();
				break;
			default:
				if (window.arweaveWallet || walletType === WalletEnum.arConnect) {
					handleArConnect();
					break;
				} else {
					handleArweaveApp();
					break;
				}
		}
		setWalletModalVisible(false);
		return walletObj;
	}

	async function handleDisconnect() {
		// @ts-ignore
		await global.window?.arweaveWallet?.disconnect();
		setWalletAddress(null);
	}

	const getUserBalance = async (wallet: string) => {
		const rawBalance = await fetch(getBalanceEndpoint(wallet));
		const jsonBalance = await rawBalance.json();
		return jsonBalance / 1e12;
	};

	React.useEffect(() => {
		async function handleWallet() {
			let walletAddress: string | null = null;
			try {
				// @ts-ignore
				walletAddress = await global.window.arweaveWallet.getActiveAddress();
			} catch {}
			if (walletAddress) {
				setWalletAddress(walletAddress as any);
				setAvailableBalance(await getUserBalance(walletAddress));
			}
		}

		handleWallet();

		window.addEventListener('arweaveWalletLoaded', handleWallet);

		return () => {
			window.removeEventListener('arweaveWalletLoaded', handleWallet);
		};
	});

	React.useEffect(() => {
		(async function () {
			if (walletAddress) {
				const profile = await getProfile(walletAddress);
				if (profile) {
					setArProfile(profile);
				}
			}
		})();
	}, [walletAddress]);

	return (
		<>
			{walletModalVisible && (
				<Modal header={language.connectWallet} handleClose={() => setWalletModalVisible(false)}>
					<WalletList handleConnect={handleConnect} />
				</Modal>
			)}
			<ARContext.Provider
				value={{
					wallet,
					walletAddress,
					walletType,
					availableBalance,
					handleConnect,
					handleDisconnect,
					wallets,
					walletModalVisible,
					setWalletModalVisible,
					arProfile,
				}}
			>
				{props.children}
			</ARContext.Provider>
		</>
	);
}

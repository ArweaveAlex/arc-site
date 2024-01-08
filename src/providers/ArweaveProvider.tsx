import React from 'react';
import { randomBytes } from 'crypto-browserify';

import Arweave from 'arweave';
import { bufferTob64Url } from 'arweave/node/lib/utils.js';
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { ArconnectSigner } from 'arbundles';

import { getBalanceEndpoint } from 'arcframework';

import { Modal } from 'components/molecules/Modal';
import { getCurrentProfile } from 'gql';
import { API_CONFIG, AR_WALLETS, ASSETS, GATEWAYS, WALLET_PERMISSIONS } from 'helpers/config';
import { getTurboBalanceEndpoint } from 'helpers/endpoints';
import { language } from 'helpers/language';
import { ProfileType, WalletEnum } from 'helpers/types';
import { getARAmountFromWinc } from 'helpers/utils';

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
	profile: any;
	turboBalance: number | string | null;
	getTurboBalance: () => void;
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
	profile: null,
	turboBalance: null,
	getTurboBalance() {},
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
	const [turboBalance, setTurboBalance] = React.useState<number | string | null>(null);
	const [profile, setProfile] = React.useState<ProfileType | null>(null);

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
		await global.window?.arweaveWallet?.disconnect();
		setWallet(null);
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
				walletAddress = await global.window.arweaveWallet.getActiveAddress();

				if (walletType !== WalletEnum.arweaveApp) {
					setWalletType(WalletEnum.arConnect);
					setWallet(window.arweaveWallet);
				}
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
	}, [walletType]);

	React.useEffect(() => {
		(async function () {
			if (wallet && walletAddress) {
				try {
					setProfile(await getCurrentProfile({ address: walletAddress }));
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [wallet, walletAddress, walletType]);

	async function getTurboBalance() {
		if (wallet) {
			try {
				setTurboBalance(`${language.loading}...`);
				const arweave = Arweave.init({
					host: GATEWAYS.arweave,
					protocol: API_CONFIG.protocol,
					port: API_CONFIG.port,
					timeout: API_CONFIG.timeout,
					logging: API_CONFIG.logging,
				});

				const publicKey = await wallet.getActivePublicKey();
				const nonce = randomBytes(16).toString('hex');
				const buffer = Buffer.from(nonce);

				const signer = new ArconnectSigner(wallet, arweave as any);
				const signature = await signer.sign(buffer);
				const b64UrlSignature = bufferTob64Url(Buffer.from(signature));

				const result = await fetch(getTurboBalanceEndpoint(), {
					headers: {
						'x-nonce': nonce,
						'x-public-key': publicKey,
						'x-signature': b64UrlSignature,
					},
				});

				if (result.ok) {
					setTurboBalance(getARAmountFromWinc(Number((await result.json()).winc)));
				} else {
					setTurboBalance(0);
				}
			} catch (e: any) {
				console.error(e);
				setTurboBalance(null);
			}
		}
	}

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
					profile,
					turboBalance,
					getTurboBalance,
				}}
			>
				{props.children}
			</ARContext.Provider>
		</>
	);
}

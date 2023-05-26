export interface IProps {
	txId: string;
	walletAddress: string | null;
	showWalletConnect: boolean;
	warp: any;
	arweave: any;
	handleStampCallback: () => void;
}

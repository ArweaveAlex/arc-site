export interface IProps {
	txId: string;
	walletAddress: string | null;
	setWalletModalVisible: (open: boolean) => void;
	showWalletConnect: boolean;
	warp: any;
	handleStampCallback: () => void;
}

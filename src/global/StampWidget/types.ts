export interface IProps {
  txId: string;
  walletAddress: string | null;
  setWalletModalVisible: (open: boolean) => void;
  warp: any;
  handleStampCallback: () => void;
  showWalletConnect: boolean;
}

export interface ContractInfoResponseProps {
  txId: string;
  bundlerTxId: string;
  srcTxId: string;
  src: string;
  srcBinary: null;
  initState: InitState;
  owner: string;
  pstTicker: string;
  pstName: string;
  srcWasmLang: null;
  contractTx: Tx;
  srcTx: Tx;
}

export interface Tx {
  id: string;
  data: null;
  tags: Tag[];
  owner: string;
  format: number;
  reward: string;
  target: string;
  last_tx: string;
  quantity: string;
  data_root: string;
  data_size: string;
  signature: string;
}

export interface Tag {
  name: string;
  value: string;
}

export interface InitState {
  name: string;
  title: string;
  ticker: string;
  balances: number;
  lockTime: number;
  createdAt: number;
  maxSupply: number;
  contentType: string;
  description: string;
  transferable: boolean;
  lastTransferTimestamp: null;
}
export function getBalanceEndpoint(wallet: string) {
    return `https://arweave.net/wallet/${wallet}/balance`;
}

export function getViewblockEndpoint(txId: string) {
    return `https://v2.viewblock.io/arweave/tx/${txId}`;
}

export function getTxEndpoint(txId: string) {
    return `https://arweave.net/${txId}`;
}

export function getRedstoneSrcTxEndpoint(contractId: string, page: any){
    return `https://gateway.redstone.finance/gateway/contracts-by-source?id=${contractId}&limit=15&page=${page}`;
}

export function getRedstoneDescEndpoint(src: string) {
    return `https://gateway.redstone.finance/gateway/contracts-by-source?id=${src}&page=1&sort=desc&limit=5`;
}
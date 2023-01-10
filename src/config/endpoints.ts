export function getBalanceEndpoint(wallet: string) {
    return `https://arweave.net/wallet/${wallet}/balance`;
}

export function getViewblockEndpoint(txId: string) {
    return `https://v2.viewblock.io/arweave/tx/${txId}`;
}

export function getTxEndpoint(txId: string) {
    return `https://arweave.net/${txId}`;
}

export function getRedstoneSrcTxEndpoint(contractId: string){
    return `https://gateway.redstone.finance/gateway/contracts-by-source?id=${contractId}&limit=15&page=1`;
}

export function getRedstoneDescEndpoint(nftSrc: string) {
    return `https://gateway.redstone.finance/gateway/contracts-by-source?id=${nftSrc}&page=1&sort=desc&limit=5`;
}
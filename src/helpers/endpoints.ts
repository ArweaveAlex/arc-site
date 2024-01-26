const arweaveEndpoint = 'https://arweave.net';

const turboEndpoint = 'https://payment.ardrive.io/v1';

export function getTxEndpoint(txId: string) {
	return `${arweaveEndpoint}/${txId}`;
}

export function getBalancesEndpoint(walletAddress: string) {
	return `https://dre-u.warp.cc/balances?walletAddress=${walletAddress}&indexes=ucm&limit=1000`;
}

export function getTurboBalanceEndpoint() {
	return `${turboEndpoint}/balance`;
}

export function getTurboPriceWincEndpoint(currency: string, amount: number) {
	return `${turboEndpoint}/price/${currency}/${amount * 100}`;
}

export function getTurboCheckoutEndpoint(walletAddress: string, currency: string, amount: number) {
	return `${turboEndpoint}/top-up/payment-intent/${walletAddress}/${currency}/${amount * 100}`;
}

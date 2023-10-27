export function getBalancesEndpoint(walletAddress: string) {
	return `https://dre-u.warp.cc/balances?walletAddress=${walletAddress}&indexes=ucm&limit=1000`;
}

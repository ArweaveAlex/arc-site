import { API_URI } from "./config";

export function getBalanceEndpoint(wallet: string) {
    return `${API_URI}/api/balance/${wallet}`;
}
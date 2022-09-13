export function formatAddress(address: string) {
    return address.substring(0, 5) + "..." + address.substring(36, address.length - 1);
}
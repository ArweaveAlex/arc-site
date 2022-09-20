export function formatAddress(address: string, wrap: boolean) {
    const formattedAddress = address.substring(0, 5) + "..." + address.substring(36, address.length - 1);
    return wrap ? `(${formattedAddress})` : formattedAddress;
}

export function formatDate(date: string) {
    return date;
}
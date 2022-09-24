export function formatAddress(address: string | null, wrap: boolean) {
    if (!address) {
        return "";
    }
    const formattedAddress = address.substring(0, 5) + "..." + address.substring(36, address.length - 1);
    return wrap ? `(${formattedAddress})` : formattedAddress;
}

export function formatDate(date: string) {
    return date;
}

export function formatTitle(string: string) {
    const result = string.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
}
import { DateType } from "./types";

export function formatAddress(address: string | null, wrap: boolean) {
    if (!address) {
        return "";
    }
    const formattedAddress = address.substring(0, 5) + "..." + address.substring(36, address.length - 1);
    return wrap ? `(${formattedAddress})` : formattedAddress;
}

export function formatDate(dateArg: string | null, dateType: DateType) {
    if (!dateArg) {
        return "";
    }

    let date: Date | null = null;

    switch (dateType) {
        case "iso":
            date = new Date(dateArg);
            break;
        case "ts": 
            date = new Date(Number(dateArg));
            break;
        default:
            date = new Date(dateArg);
            break;
    }

    return `${date.toLocaleString('default', { month: 'long' })} 
            ${date.getDate()}, ${date.getUTCFullYear()} @ 
            ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
}

export function formatTitle(string: string) {
    const result = string.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
}

export function getTagValue(list: { name: string, value: string }[], name: string): string | null {
    for (let i = 0; i < list.length; i++) {
        if (list[i]) {
            if (list[i]!.name === name) {
                return list[i]!.value
            }
        }
    }

    return null;
}

export function getTxUrl(tx: string) {
    return `https://arweave.net/${tx}`;
}
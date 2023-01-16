import { STORAGE, SEARCH } from "helpers/config";
import { DateType, KeyValueType } from "helpers/types";

export function getHashUrl(url: string) {
    return `${url}/#`;
}

export function formatArtifactType(artifactType: string) {
    return artifactType.substring(5);
}

export function formatAddress(address: string | null, wrap: boolean) {
    if (!address) {
        return "";
    }
    const formattedAddress = address.substring(0, 5) + "..." + address.substring(36, address.length - 1);
    return wrap ? `(${formattedAddress})` : formattedAddress;
}

export function formatDataSize(size: string) {
    return `${size} KB`;
}

export function formatCount(count: string): string {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatTime(time: number): string {
    return time < 10 ? `0${time.toString()}` : time.toString();
}

function getHours(hours: number) {
    if (hours > 12) return hours - 12;
    else return hours;
}

export function formatDate(dateArg: string | null, dateType: DateType) {
    if (!dateArg) {
        return STORAGE.none;
    }

    let date: Date | null = null;

    switch (dateType) {
        case "iso":
            date = new Date(dateArg);
            break;
        case "epoch":
            date = new Date(Number(dateArg));
            break;
        default:
            date = new Date(dateArg);
            break;
    }

    return `${date.toLocaleString("default", { month: "long" })} 
            ${date.getDate()}, ${date.getUTCFullYear()} @ 
            ${formatTime(getHours(date.getHours()))}:${formatTime(date.getMinutes())}:${formatTime(date.getSeconds())}`;
}

export function formatTitle(string: string) {
    const result = string.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
}

export function getTagValue(list: KeyValueType[], name: string): string {
    for (let i = 0; i < list.length; i++) {
        if (list[i]) {
            if (list[i]!.name === name) {
                return list[i]!.value as string;
            }
        }
    }
    return STORAGE.none;
}

export function getJSONStorage(key: string) {
    return JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem(key))));
}

export function checkNullValues(obj: any) {
    for (const key in obj) {
        if (obj[key] === null) {
            return true;
        }
    }
    return false;
}

export function unquoteJsonKeys(json: Object): string {
    return JSON.stringify(json).replace(/"([^"]+)":/g, '$1:')
}

export function stripSearch(s: string) {
    return s.replaceAll(' ','')
        .replaceAll('\t','')
        .replaceAll('\r','')
        .replaceAll('\n','')
        .replaceAll(SEARCH.idTerm,'')
        .replaceAll(SEARCH.ownerTerm,'')
        .toLowerCase();
}

export function splitArray(array: any[], size: number) {
    const splitResult = [];
    const arrayCopy = [...array];
    for (let i = 0; i < arrayCopy.length; i += size) {
        const chunk = arrayCopy.slice(i, i + size);
        splitResult.push(chunk);
    }
    return splitResult;
}

export function checkGqlCursor(string: string): boolean {
    /* All Search Cursors contain '-'
        GQL Cursors contain letters, numbers or '=' */
    if (/[A-Za-z0-9]/.test(string) || /[=]/.test(string)) {
        return true;
    } 
    else {
        return false;
    }
}

export function getMessageText(data: any) {
    if (data && (data.text || data.full_text)) {
        let finalStr = "";
        const tweetText = data.text ? data.text : data.full_text;
        let count = 0;
        for (let i = 0; i < tweetText.length; i++) {
            if (tweetText[i] === " ") {
                if (tweetText.substring(count, i).includes("@")) {
                    finalStr += `<span>${tweetText.substring(count, i)}</span>`;
                }
                else {
                    finalStr += tweetText.substring(count, i);
                }
                count = i;
            }
        }
        return finalStr;
    }
    else {
        return STORAGE.none;
    }
}

export function getUsername(data: any) {
    if (data && data.user) {
        if (data.user.username) return `@${data.user.username}`;
        else if (data.user.screen_name) return `@${data.user.screen_name}`;
        else return STORAGE.none;
    }
    else {
        return STORAGE.none;
    }
}
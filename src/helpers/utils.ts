import { STORAGE, SEARCH, TAGS } from 'helpers/config';
import { DateType, KeyValueType } from 'helpers/types';

export function getHashUrl(url: string) {
	return `${url}/#`;
}

export function formatArtifactType(artifactType: string) {
	return artifactType.includes('Alex') ? artifactType.substring(5) : artifactType;
}

export function formatAddress(address: string | null, wrap: boolean) {
	if (!address) {
		return '';
	}
	const formattedAddress = address.substring(0, 5) + '...' + address.substring(36, address.length - 1);
	return wrap ? `(${formattedAddress})` : formattedAddress;
}

export function formatDataSize(size: string) {
	return `${size} KB`;
}

export function formatCount(count: string): string {
	return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatTime(time: number): string {
	return time < 10 ? `0${time.toString()}` : time.toString();
}

function getHours(hours: number) {
	if (hours > 12) return hours - 12;
	else return hours;
}

function getHourFormat(hours: number) {
	if (hours >= 12 && hours <= 23) {
		return `PM`;
	} else {
		return `AM`;
	}
}

export function formatDate(dateArg: string | number | null, dateType: DateType) {
	if (!dateArg) {
		return STORAGE.none;
	}

	let date: Date | null = null;

	switch (dateType) {
		case 'iso':
			date = new Date(dateArg);
			break;
		case 'epoch':
			date = new Date(Number(dateArg));
			break;
		default:
			date = new Date(dateArg);
			break;
	}

	return `${date.toLocaleString('default', {
		month: 'long',
	})} ${date.getDate()}, ${date.getUTCFullYear()} @ ${getHours(date.getHours())}:${formatTime(
		date.getMinutes()
	)}:${formatTime(date.getSeconds())} ${getHourFormat(date.getHours())}`;
}

export function formatTitle(string: string) {
	const result = string.replace(/([A-Z])/g, ' $1');
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
	return JSON.stringify(json).replace(/"([^"]+)":/g, '$1:');
}

export function stripSearch(s: string) {
	return s
		.replaceAll(' ', '')
		.replaceAll('\t', '')
		.replaceAll('\r', '')
		.replaceAll('\n', '')
		.replaceAll(SEARCH.idTerm, '')
		.replaceAll(SEARCH.ownerTerm, '')
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
	if (/[-]/.test(string)) {
		return false;
	} else if (/[A-Za-z0-9]/.test(string) || /[=]/.test(string)) {
		return true;
	} else {
		return true;
	}
}

export function formatMessagingText(text: string) {
	let finalStr = '';
	let count = 0;
	for (let i = 0; i < text.length; i++) {
		if (text[i] === ' ') {
			if (text.substring(count, i).includes('@')) {
				finalStr += `<span>${text.substring(count, i)}</span>`;
			} else {
				finalStr += text.substring(count, i);
			}
			count = i;
		}
	}
	if (count < text.length) {
		finalStr += text.substring(count, text.length);
	}
	return removeUrls(finalStr);
}

export function formatMessagingData(data: any) {
	if (data && (data.text || data.full_text)) {
		const tweetText = data.text ? data.text : data.full_text;
		return formatMessagingText(tweetText);
	} else {
		return STORAGE.none;
	}
}

export function addUrls(text: string) {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	return text.replace(urlRegex, function (url) {
		return `<a href=${url} target={"_blank"}>${url}</a>`;
	});
}

export function removeUrls(text: string) {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	return text.replace(urlRegex, '');
}

export function getUsername(data: any) {
	if (data && data.user) {
		if (data.user.username) return `@${data.user.username}`;
		else if (data.user.screen_name) return `@${data.user.screen_name}`;
		else return STORAGE.none;
	} else {
		return STORAGE.none;
	}
}

export function checkMedia(tags: KeyValueType[]) {
	return (
		getTagValue(tags, TAGS.keys.mediaIds) !== '{}' &&
		getTagValue(tags, TAGS.keys.mediaIds) !== '[]' &&
		getTagValue(tags, TAGS.keys.mediaIds) !== STORAGE.none &&
		getTagValue(tags, TAGS.keys.mediaIds) !== '' &&
		getTagValue(tags, TAGS.keys.mediaIds) !== `{"":""}`
	);
}

export function checkAssociation(tags: KeyValueType[]) {
	return (
		getTagValue(tags, TAGS.keys.associationId) !== '' && getTagValue(tags, TAGS.keys.associationId) !== STORAGE.none
	);
}

export async function traverseCommentTree(callBackFields: string[], obj: any, callBack: any) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (callBackFields.includes(key)) {
				await callBack(obj);
			} else if (typeof obj[key] === 'object' && obj[key] !== null) {
				await traverseCommentTree(callBackFields, obj[key], callBack);
			}
		}
	}
}

export function sortCommentTree(data: any[]) {
	const reversedData = [...data].reverse();
	const bodyListData = reversedData.map((element) => element.body);
	let groupedData: any[] = [];
	const finalData: any[] = [];

	for (let i = 0; i < reversedData.length; i++) {
		if (reversedData[i].depth === 0) {
			let j = bodyListData.indexOf(reversedData[i].body);
			let commentTraversed = false;
			const subList: any[] = [];
			subList.push(reversedData[j]);
			j++;
			while (!commentTraversed) {
				if (reversedData[j]) {
					if (reversedData[j].depth === 0) {
						commentTraversed = true;
					} else {
						subList.push(reversedData[j]);
					}
					j++;
				} else {
					commentTraversed = true;
				}
			}
			groupedData.push(subList);
		}
	}
	groupedData = groupedData.reverse();
	for (let i = 0; i < groupedData.length; i++) {
		finalData.push(groupedData[i]);
	}
	return finalData;
}

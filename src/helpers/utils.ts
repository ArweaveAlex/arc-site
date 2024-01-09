import Arweave from 'arweave';

import { STORAGE } from './config';
import { DateType } from './types';

export function checkAddress(address: string | null) {
	if (!address) return false;
	return /^[a-z0-9_-]{43}$/i.test(address);
}

export function formatArtifactType(artifactType: string) {
	const result = artifactType.includes('Alex') ? artifactType.substring(5) : artifactType;
	return result.replace(/-/g, ' ');
}

export function getARAmountFromWinc(amount: number) {
	const arweave = Arweave.init({});
	return Math.floor(+arweave.ar.winstonToAr(amount.toString()) * 1e6) / 1e6;
}

export function getTurboBalance(amount: number | string | null) {
	return amount !== null ? (typeof amount === 'string' ? amount : formatTurboAmount(amount)) : '**** Credits';
}

export function formatTurboAmount(amount: number) {
	return `${amount.toFixed(4)} Credits`;
}

export function getTagValue(list: { [key: string]: any }[], name: string): string {
	for (let i = 0; i < list.length; i++) {
		if (list[i]) {
			if (list[i]!.name === name) {
				return list[i]!.value as string;
			}
		}
	}
	return STORAGE.none;
}

export async function fileToBuffer(file: any) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = function (e: any) {
			const buffer = new Buffer(e.target.result);
			resolve(buffer);
		};
		reader.onerror = function (e: any) {
			reject(e);
		};
		reader.readAsArrayBuffer(file);
	});
}

export function formatUSDAmount(amount: number) {
	return `$ ${!amount || isNaN(amount) ? 0 : Number(amount).toFixed(2)}`;
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
	})} ${date.getDate()}, ${date.getUTCFullYear()} · ${getHours(date.getHours())}:${formatTime(
		date.getMinutes()
	)}:${formatTime(date.getSeconds())} ${getHourFormat(date.getHours())}`;
}

export function getRelativeDate(timestamp: number) {
	const currentDate = new Date();
	const inputDate = new Date(timestamp);

	const timeDifference: number = currentDate.getTime() - inputDate.getTime();
	const secondsDifference = Math.floor(timeDifference / 1000);
	const minutesDifference = Math.floor(secondsDifference / 60);
	const hoursDifference = Math.floor(minutesDifference / 60);
	const daysDifference = Math.floor(hoursDifference / 24);
	const monthsDifference = Math.floor(daysDifference / 30.44); // Average days in a month
	const yearsDifference = Math.floor(monthsDifference / 12);

	if (yearsDifference > 0) {
		return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''} ago`;
	} else if (monthsDifference > 0) {
		return `${monthsDifference} month${monthsDifference > 1 ? 's' : ''} ago`;
	} else if (daysDifference > 0) {
		return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
	} else if (hoursDifference > 0) {
		return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
	} else if (minutesDifference > 0) {
		return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
	} else {
		return `${secondsDifference} second${secondsDifference !== 1 ? 's' : ''} ago`;
	}
}

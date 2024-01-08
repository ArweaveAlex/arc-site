import Arweave from 'arweave';

import { STORAGE } from './config';

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

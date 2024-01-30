import { ArtifactDetailType, ArweaveClient, getArtifact, getTagValue, SequenceType, TAGS } from 'arcframework';

import { getGQLData, getGQLResponseObject } from 'gql';
import { GATEWAYS, STORAGE } from 'helpers/config';
import { getBalancesEndpoint } from 'helpers/endpoints';
import { language } from 'helpers/language';
import {
	AGQLResponseType,
	AssociationDetailType,
	BalanceType,
	GQLArgsType,
	NotificationResponseType,
	TagFilterType,
	UserArtifactsArgsType,
	UserBalancesType,
} from 'helpers/types';

export async function getArtifactsByIds(args: GQLArgsType): Promise<AGQLResponseType> {
	const gqlResponse: AGQLResponseType = await getGQLData({
		gateway: args.gateway ? args.gateway : GATEWAYS.arweave,
		ids: args.ids,
		tagFilters: args.tagFilters,
		owners: args.owners,
		cursor: args.cursor,
		reduxCursor: args.reduxCursor,
		cursorObjectKey: args.cursorObjectKey,
	});

	return getGQLResponseObject(args, gqlResponse);
}

export async function getArtifactsByPool(args: GQLArgsType): Promise<AGQLResponseType> {
	let tagFilters: TagFilterType[] = [{ name: TAGS.keys.poolId, values: args.ids }];

	if (args.tagFilters) {
		tagFilters.push(...args.tagFilters);
	}

	const gqlResponse: AGQLResponseType = await getGQLData({
		gateway: args.gateway,
		ids: null,
		tagFilters: tagFilters,
		owners: args.owners,
		cursor: args.cursor,
		reduxCursor: args.reduxCursor,
		cursorObjectKey: args.cursorObjectKey,
	});

	return gqlResponse;
}

export async function getArtifactIdsByUser(args: UserArtifactsArgsType): Promise<string[]> {
	try {
		const result: any = await fetch(getBalancesEndpoint(args.walletAddress));
		if (result.status === 200) {
			const balances = ((await result.json()) as UserBalancesType).balances;

			const assetIds = balances
				.filter((balance: BalanceType) => {
					return balance.balance && parseInt(balance.balance) > 0;
				})
				.filter((balance: BalanceType) => {
					return balance.token_name && balance.token_name.includes('Artifact -');
				})
				.map((balance: BalanceType) => {
					return balance.contract_tx_id;
				});

			return assetIds;
		}
	} catch (e: any) {
		console.error(e);
	}
	return [];
}

export async function getArtifactsByAssociation(
	associationId: string,
	sequence: SequenceType
): Promise<AssociationDetailType | null> {
	const artifacts: ArtifactDetailType[] = [];
	const range = Array.from({ length: sequence.end - sequence.start + 1 }, (_, i) => (i + sequence.start).toString());

	if (associationId) {
		const fullThread: AGQLResponseType = await getGQLData({
			gateway: GATEWAYS.arweave,
			ids: null,
			tagFilters: [
				{
					name: TAGS.keys.associationId,
					values: [associationId],
				},
			],
			owners: null,
			cursor: null,
			reduxCursor: null,
			cursorObjectKey: null,
		});

		const gqlArtifacts: AGQLResponseType = await getGQLData({
			gateway: GATEWAYS.arweave,
			ids: null,
			tagFilters: [
				{
					name: TAGS.keys.associationId,
					values: [associationId],
				},
				{
					name: TAGS.keys.associationSequence,
					values: range,
				},
			],
			owners: null,
			cursor: null,
			reduxCursor: null,
			cursorObjectKey: null,
		});

		if (gqlArtifacts.data && gqlArtifacts.data.length) {
			const filteredArtifacts: any[] = [];
			for (let i = 0; i < gqlArtifacts.data.length; i++) {
				const associationSequence = getTagValue(gqlArtifacts.data[i].node.tags, TAGS.keys.associationSequence);

				if (associationSequence && associationSequence !== STORAGE.none) {
					if (!filteredArtifacts.includes(associationSequence)) {
						filteredArtifacts.push(gqlArtifacts.data[i]);
					}
					if (filteredArtifacts.length === range.length) {
						break;
					}
				} else {
					filteredArtifacts.push(gqlArtifacts.data[i]);
				}
			}

			for (let i = 0; i < filteredArtifacts.length; i++) {
				const artifact = await getArtifact(gqlArtifacts.data[i]);
				if (artifact) {
					artifacts.push(artifact);
				}
			}
		}

		return {
			artifacts: artifacts,
			length: fullThread.data.length,
		};
	} else {
		return null;
	}
}

export async function getArtifactIdsByBookmarks(args: UserArtifactsArgsType): Promise<string[]> {
	const gqlResponse: AGQLResponseType = await getGQLData({
		gateway: GATEWAYS.arweave,
		ids: null,
		tagFilters: [{ name: TAGS.keys.bookmarkSearch, values: [args.walletAddress] }],
		owners: [args.walletAddress],
		cursor: null,
		reduxCursor: null,
		cursorObjectKey: null,
	});

	if (gqlResponse.data.length > 0) {
		let recentDate = Number(getTagValue(gqlResponse.data[0].node.tags, TAGS.keys.dateCreated)!);

		for (let i = 0; i < gqlResponse.data.length; i++) {
			const date = Number(getTagValue(gqlResponse.data[i].node.tags, TAGS.keys.dateCreated)!);
			recentDate = Math.max(recentDate, date);
		}

		for (let i = 0; i < gqlResponse.data.length; i++) {
			if (recentDate === Number(getTagValue(gqlResponse.data[i].node.tags, TAGS.keys.dateCreated)!)) {
				return JSON.parse(getTagValue(gqlResponse.data[i].node.tags, TAGS.keys.bookmarkIds)!);
			}
		}

		return [];
	} else {
		return [];
	}
}

export async function getBookmarkIds(owner: string): Promise<string[]> {
	const gqlData: AGQLResponseType = await getGQLData({
		gateway: GATEWAYS.arweave,
		ids: null,
		tagFilters: [{ name: TAGS.keys.bookmarkSearch, values: [owner] }],
		owners: null,
		cursor: null,
		reduxCursor: null,
		cursorObjectKey: null,
	});

	if (gqlData.data.length > 0) {
		let recentDate = Number(getTagValue(gqlData.data[0].node.tags, TAGS.keys.dateCreated)!);

		for (let i = 0; i < gqlData.data.length; i++) {
			const date = Number(getTagValue(gqlData.data[i].node.tags, TAGS.keys.dateCreated)!);
			recentDate = Math.max(recentDate, date);
		}

		for (let i = 0; i < gqlData.data.length; i++) {
			if (recentDate === Number(getTagValue(gqlData.data[i].node.tags, TAGS.keys.dateCreated)!)) {
				return JSON.parse(getTagValue(gqlData.data[i].node.tags, TAGS.keys.bookmarkIds)!);
			}
		}

		return [];
	} else {
		return [];
	}
}

export async function setBookmarkIds(owner: string, ids: string[]): Promise<NotificationResponseType> {
	const arClient = new ArweaveClient();
	let txRes = await arClient.arweavePost.createTransaction({ data: JSON.stringify(ids) }, 'use_wallet');

	txRes.addTag(TAGS.keys.bookmarkSearch, owner);
	txRes.addTag(TAGS.keys.dateCreated, Date.now().toString());
	txRes.addTag(TAGS.keys.bookmarkIds, JSON.stringify(ids));

	const response = await global.window.arweaveWallet.dispatch(txRes);

	return {
		status: response.id ? true : false,
		message: response.id ? language.bookmarksUpdated : language.errorOccurred,
	};
}

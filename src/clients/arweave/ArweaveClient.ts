import { Buffer } from 'buffer';
import Arweave from 'arweave';
// @ts-ignore
import { WarpFactory, defaultCacheOptions } from 'warp-contracts/web';
import { DeployPlugin } from 'warp-contracts-plugin-deploy';

import { store } from 'state/store';
import * as poolActions from 'state/pools/actions';
import { getGQLData } from 'gql';
import { getPools } from 'gql/pools';
import { getArtifactsByUser } from 'gql/artifacts';

import { PoolType, ContributionType, ContributionResultType, GQLResponseType } from 'helpers/types';
import { LANGUAGE } from 'helpers/language';
import { TAGS } from 'helpers/config';
import { getTagValue } from 'helpers/utils';

const GET_ENDPOINT = 'arweave-search.goldsky.com';
const POST_ENDPOINT = 'arweave.net';

const PORT = 443;
const PROTOCOL = 'https';
const TIMEOUT = 40000;
const LOGGING = false;

export default class ArweaveClient {
	arweaveGet: any = Arweave.init({
		host: GET_ENDPOINT,
		port: PORT,
		protocol: PROTOCOL,
		timeout: TIMEOUT,
		logging: LOGGING,
	});

	arweavePost: any = Arweave.init({
		host: POST_ENDPOINT,
		port: PORT,
		protocol: PROTOCOL,
		timeout: TIMEOUT,
		logging: LOGGING,
	});

	warp = WarpFactory.forMainnet({ ...defaultCacheOptions, inMemory: true }).use(new DeployPlugin());

	async getUserContributions(userWallet: string) {
		const poolsReducer = store.getState().poolsReducer;
		let pools: PoolType[] = [];

		if (poolsReducer.data) {
			pools = poolsReducer.data;
		} else {
			const fetchedPools = await getPools();
			pools = fetchedPools;
			store.dispatch(poolActions.setPools({ data: fetchedPools }));
		}

		if (pools.length > 0) {
			const lastContributions: any = await this.calcLastContributions(userWallet, pools);
			return pools
				.filter((pool: any) => {
					if (pool.state.contributors.hasOwnProperty(userWallet)) {
						return true;
					}
					return false;
				})
				.map((pool: any) => {
					let poolElement = pool;
					poolElement.totalContributed = this.calcARDonated(userWallet, pool);
					poolElement.lastContribution = lastContributions[pool.id];
					poolElement.receivingPercent = this.calcReceivingPercent(userWallet, pool);
					return poolElement;
				});
		} else {
			return pools;
		}
	}

	calcARDonated(userWallet: string, pool: PoolType) {
		let calc = parseFloat(this.calcContributions(pool.state.contributors[userWallet])) / 1000000000000;
		let tokens = calc.toFixed(calc.toString().length);
		return tokens;
	}

	calcReceivingPercent(userWallet: string, pool: PoolType) {
		if (pool) {
			let calc =
				(parseFloat(this.calcContributions(pool.state.contributors[userWallet])) /
					parseFloat(pool.state.totalContributions)) *
				100;
			let tokens = calc.toFixed(4);
			return tokens;
		} else {
			return 0;
		}
	}

	async calcLastContributions(userWallet: string, pools: PoolType[]) {
		const artifacts = await getArtifactsByUser({
			ids: null,
			owner: userWallet,
			uploader: null,
			cursor: null,
			reduxCursor: null,
		});
		let contributionMap: any = {};

		for (let i = 0; i < pools.length; i++) {
			let lastDate: number = 0;
			for (let j = 0; j < artifacts.contracts.length; j++) {
				const date = parseInt(getTagValue(artifacts.contracts[j].node.tags, TAGS.keys.dateCreated));
				if (date > lastDate) {
					lastDate = date;
					contributionMap[pools[i].id] = date;
				}
			}
		}

		return contributionMap;
	}

	getReceivingPercent(
		userWallet: string,
		contributors: any,
		totalContributions: string,
		activeAmount: number
	): string {
		if (userWallet && contributors && totalContributions) {
			let amount: number = 0;
			if (!isNaN(activeAmount)) {
				amount = activeAmount * 1e6;
			}

			if (contributors[userWallet]) {
				amount = parseFloat(contributors[userWallet] + (!isNaN(activeAmount) ? activeAmount : 0));
			}

			let calc: number = amount;
			if (parseFloat(totalContributions) > 0) {
				calc = (amount / parseFloat(totalContributions)) * 100;
			}
			let tokens = calc.toFixed(4);
			if (isNaN(calc)) return '0';
			return calc >= 100 ? '100' : tokens;
		} else {
			return '0';
		}
	}

	calcContributions(contributions: string | ContributionType[]): string {
		let amount: number = 0;
		if (typeof contributions === 'object') {
			for (let i = 0; i < contributions.length; i++) {
				amount += Number(contributions[i].qty);
			}
		} else {
			amount = Number(contributions);
		}
		return amount.toString();
	}

	getARAmount(amount: string): number {
		return Math.floor(+this.arweavePost.ar.winstonToAr(amount) * 1e6) / 1e6;
	}

	async handlePoolContribute(
		poolId: string,
		amount: number,
		availableBalance: number
	): Promise<ContributionResultType> {
		if (!availableBalance) {
			return { status: false, message: LANGUAGE.walletNotConnected };
		}
		if (amount > availableBalance) {
			return {
				status: false,
				message: LANGUAGE.pool.contribute.notEnoughFunds,
			};
		}
		try {
			const arweaveContract: GQLResponseType = (
				await getGQLData({
					ids: null,
					tagFilters: [{ name: TAGS.keys.uploaderTxId, values: [poolId] }],
					uploader: null,
					cursor: null,
					reduxCursor: null,
					cursorObject: null,
				})
			)[0];
			const fetchId = arweaveContract ? arweaveContract.node.id : poolId;
			const { data: contractData }: { data: any } = await this.arweavePost.api.get(`/${fetchId}`);

			let owner = contractData.owner;
			if (arweaveContract) {
				owner = JSON.parse(Buffer.from(contractData.data, 'base64').toString('utf-8')).owner;
			}
			if (!owner) {
				return { status: false, message: LANGUAGE.pool.contribute.failed };
			}
			const warpContract = this.warp.contract(poolId).connect('use_wallet').setEvaluationOptions({
				waitForConfirmation: false,
			});
			const result = await warpContract.writeInteraction(
				{ function: 'contribute' },
				{
					disableBundling: true,
					transfer: {
						target: owner,
						winstonQty: this.arweavePost.ar.arToWinston(amount.toString()),
					},
				}
			);
			if (!result) {
				return { status: false, message: LANGUAGE.pool.contribute.failed };
			}

			return { status: true, message: LANGUAGE.pool.contribute.success };
		} catch (error: any) {
			console.error(error);
			return { status: false, message: LANGUAGE.pool.contribute.failed };
		}
	}
}

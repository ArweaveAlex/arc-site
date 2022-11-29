import Arweave from "arweave";
import { SmartWeaveNodeFactory } from "redstone-smartweave";

import { getArtifactsByUser } from "gql/artifacts";
import { getCollections } from "gql/collections";
import { getDataByTags } from "gql";
import { Buffer } from 'buffer';

import { ContributionResultType, GQLResponseType } from "types";
import { LANGUAGE } from "language";
import { TAGS } from "config";

export default class ArweaveClient {
    arweave: any = Arweave.init({
        host: "arweave.net",
        port: 443,
        protocol: "https",
        timeout: 40000,
        logging: false,
    });

    smartweave = SmartWeaveNodeFactory.memCached(this.arweave as any);

    calcARDonated(userWallet: string, pool: any) {
        let calc = pool.state.contributors[userWallet] / 1000000000000;
        let tokens = (calc).toFixed(calc.toString().length);
        return tokens;
    }

    calcReceivingPercent(userWallet: string, pool: any) {
        if (pool) {
            let calc = (pool.state.contributors[userWallet] / parseFloat(pool.state.totalContributions)) * 100;
            let tokens = (calc).toFixed(4);
            return tokens;
        }
        else {
            return 0;
        }
    }

    async calcLastContributions(userWallet: string, collections: any[]) {
        let contributions = await getArtifactsByUser(userWallet, null);
        let conMap: any = {};

        for (let i = 0; i < collections.length; i++) {
            let lastDate = 0;
            for (let j = 0; j < contributions.contracts.length; j++) {
                for (let k = 0; k < contributions.contracts[j].node.tags.length; k++) {
                    const tag: any = contributions.contracts[j].node.tags[k];
                    if (tag.name === TAGS.keys.dateCreated) {
                        let v = parseInt(tag.value);
                        if (v > lastDate) {
                            lastDate = v;
                            conMap[collections[i].id] = v;
                        }
                    }
                }
            }
        }

        return conMap;
    }

    async getUserContributions(userWallet: string) {
        let collections = await getCollections();
        let lastContributions: any = await this.calcLastContributions(userWallet, collections);
        return collections.filter((collection: any) => {
            if (collection.state.contributors.hasOwnProperty(userWallet)) {
                return true;
            }
            return false;
        }).map((collection: any) => {
            let collectionElement = collection;
            collectionElement.totalContributed = this.calcARDonated(userWallet, collection);
            collectionElement.lastContribution = lastContributions[collection.id];
            collectionElement.receivingPercent = this.calcReceivingPercent(userWallet, collection);
            return collectionElement;
        });
    }

    getReceivingPercent(userWallet: string, contributors: any, totalContributions: string, activeAmount: number): string {
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
            let tokens = (calc).toFixed(4);
            return calc >= 100 ? "100" : tokens;
        }
        else {
            return "0";
        }
    }

    getARAmount(amount: string): number {
        return Math.floor(+this.arweave.ar.winstonToAr(amount) * 1e6) / 1e6
    }

    async handlePoolContribute(collectionId: string, amount: number, availableBalance: number): Promise<ContributionResultType> {
        if (!availableBalance) {
            return { status: false, message: LANGUAGE.walletNotConnected };
        }

        if (amount > availableBalance) {
            return { status: false, message: LANGUAGE.collection.contribute.notEnoughFunds };
        }

        try {
            const arweaveContract: GQLResponseType = (await getDataByTags([
                { name: TAGS.keys.uploaderTxId, values: [collectionId] }
            ]))[0];

            const fetchId = arweaveContract ? arweaveContract.node.id : collectionId;

            const { data: contractData }: { data: any; } = await this.arweave.api.get(`/${fetchId}`);

            let owner = contractData.owner;

            if(arweaveContract) {
                owner = JSON.parse(Buffer.from(contractData.data, 'base64').toString("utf-8")).owner;
            }

            if (!owner) {
                return { status: false, message: LANGUAGE.collection.contribute.failed };
            }

            const smartweaveContract = this.smartweave.contract(collectionId).connect("use_wallet").setEvaluationOptions({
                waitForConfirmation: false,
            });

            const result = await smartweaveContract.writeInteraction<any>(
                { function: "contribute" }, [], {
                target: owner,
                winstonQty: this.arweave.ar.arToWinston(amount.toString())
            });

            if (!result) {
                return { status: false, message: LANGUAGE.collection.contribute.failed };
            }

            return { status: true, message: LANGUAGE.collection.contribute.success };

        }
        catch (error: any) {
            console.error(error)
            return { status: false, message: LANGUAGE.collection.contribute.failed };
        }
    }
}
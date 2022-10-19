import React from "react";
import * as gql from "gql-query-builder";
import Arweave from "arweave";
import { SmartWeaveNodeFactory } from "redstone-smartweave";

import { ContributionResultType } from "@/types";
import { getBalanceEndpoint } from "@/endpoints";
import { LANGUAGE } from "@/language";
import { formatDate } from "@/util";

const AR_WALLETS = [
    { name: "arconnect", logo: "arconnect-wallet-logo.png" }
]

const PERMISSIONS = [
    "ACCESS_ADDRESS",
    "ACCESS_ALL_ADDRESSES",
    "SIGN_TRANSACTION",
    "ACCESS_PUBLIC_KEY"
]

interface ARContextState {
    wallets: { name: string, logo: string }[];
    walletAddress: string | null;
    availableBalance: number | null;
    handleConnect: () => void;
    handleDisconnect: () => void;
    walletModalVisible: boolean;
    setWalletModalVisible: (open: boolean) => void;
    handlePoolContribute: (poolId: string, amount: number) => Promise<ContributionResultType>;
    getARAmount: (amount: string) => number;
    getAllArtefactsByPool: (poolId: string) => any;
    getAllPools: () => any;
    getPoolById: (poolId: string) => any;
    getUserArtefacts: (userWallet: string) => any;
    getUserContributions: (userWallet: string) => any;
    getUserFavorites: (userWallet: string) => any;
    toggleUserFavorite: (artefactId: string) => any;
}

interface ARProviderProps {
    children: React.ReactNode;
}

const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 40000,
    logging: false,
});

const smartweave = SmartWeaveNodeFactory.memCached(arweave as any);

// const POOL_IDS: string[] = ["6AwT3c-PCJGyUC0od5MLnsokPzyXtGYGzCy7K9vTppQ", "tVw9PU3ysGdimjcbX7QCQPnZXXOt8oai3AbDW85Z_KA"];
const POOL_IDS: string[] = ["t6AAwEvvR-dbp_1FrSfJQsruLraJCobKl9qsJh9yb2M"]

const DEFAULT_CONTEXT = {
    wallets: [],
    walletAddress: null,
    availableBalance: null,
    handleConnect() {
        console.error(`No Connector Found`);
    },
    handleDisconnect() {
        console.error(`No Connection Found`);
    },
    setWalletModalVisible(_open: boolean) {
        console.error('Make sure to render ARProvider as an ancestor of the component that uses ARContext.Provider');
    },
    walletModalVisible: false,
    async handlePoolContribute(poolId: string, amount: number): Promise<ContributionResultType> {
        console.log(`Contribute to ${poolId} - amount: ${amount}`);
        return await { status: false, message: null }
    },
    getARAmount(amount: string): number {
        console.error(`Get ${amount} AR Amount`);
        return 0
    },
    async getAllArtefactsByPool(poolId: string): Promise<any> {
        console.log(`Get All Artefacts for ${poolId}`);
        return null;
    },
    async getAllPools() {
        return null;
    },
    async getPoolById(poolId: string) {
        console.log(`Get Pool ${poolId}`);
        return null
    },
    async getUserArtefacts(_userWallet: string) {
        return null;
    },
    async getUserContributions(_userWallet: string) {
        return null;
    },
    async getUserFavorites(_userWallet: string) {
        return null;
    },
    async toggleUserFavorite(_artefactId: string) {
        return null
    }
}

const ARContext = React.createContext<ARContextState>(DEFAULT_CONTEXT);

export interface ContractDataProps {
    title: string;
    useOfProceeds: string;
    link: string;
    owner: string;
    contributors: unknown;
    tokens: unknown;
    totalContributions: string;
    totalSupply: string;
}

export function useARProvder(): ARContextState {
    return React.useContext(ARContext);
}

export function ARProvider(props: ARProviderProps) {
    const wallets = AR_WALLETS;

    const [walletModalVisible, setWalletModalVisible] = React.useState<boolean>(false);
    const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
    const [availableBalance, setAvailableBalance] = React.useState<number | null>(null);

    async function connect() {
        await global.window?.arweaveWallet?.connect(PERMISSIONS as any).then(() => {
            setWalletModalVisible(false)
        }).catch(() => {
            alert(LANGUAGE.connectionError);
        })
    }

    async function handleConnect() {
        connect();
    }

    async function handleDisconnect() {
        await global.window?.arweaveWallet?.disconnect();
        setWalletAddress(null);
    }

    const getUserBalance = async (wallet: string) => {
        const rawBalance = await fetch(getBalanceEndpoint(wallet));
        const jsonBalance = await rawBalance.json();
        return jsonBalance / 1e12;
    };

    async function handlePoolContribute(poolId: string, amount: number): Promise<ContributionResultType> {
        if (!availableBalance) {
            return { status: false, message: LANGUAGE.walletNotConnected };
        }

        if (amount > availableBalance) {
            return { status: false, message: LANGUAGE.collection.contribute.notEnoughFunds };
        }

        try {

            const { data: contractData }: { data: ContractDataProps; } = await arweave.api.get(`/${poolId}`);

            if (!contractData.owner) {
                return { status: false, message: LANGUAGE.collection.contribute.failed };
            }

            const contract = smartweave.contract(poolId).connect("use_wallet").setEvaluationOptions({
                waitForConfirmation: false,
            });

            const result = await contract.writeInteraction<any>(
                { function: "contribute" }, [], {
                target: contractData.owner,
                winstonQty: arweave.ar.arToWinston(amount.toString())
            });

            if (!result) {
                return { status: false, message: LANGUAGE.collection.contribute.failed };
            }

            return { status: true, message: LANGUAGE.collection.contribute.success };

        }
        catch (error: any) {
            return { status: false, message: error };
        }
    }

    function getARAmount(amount: string): number {
        return Math.floor(+arweave.ar.winstonToAr(amount) * 1e5) / 1e5
    }

    async function getAllArtefactsByPool(poolId: string) {
        const query = gql.query({
            operation: "transactions",
            variables: {
                tags: {
                    value: {
                        name: "Pool-Id",
                        values: [poolId]
                    },
                    type: "[TagFilter!]"
                },
                first: 1000
            },
            fields: [
                {
                    edges: [
                        {
                            node: [
                                "id",
                                {
                                    "tags": [
                                        "name",
                                        "value"
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        return (await arweave.api.post("/graphql", query)).data.data.transactions.edges;
    }

    async function getAllPools() {
        const TS = "2022-10-13T00:41:52.395+00:00"

        const blockweavePools: any = [];

        for (let i = 0; i < POOL_IDS.length; i++) {
            const contract = smartweave.contract(POOL_IDS[i]!);
            blockweavePools.push({ id: POOL_IDS[i], state: (await contract.readState()).state, ts: TS });
        }

        return blockweavePools;
    }

    async function getPoolById(poolId: string) {
        const TS = "2022-10-13T00:41:52.395+00:00"

        const contract = smartweave.contract(poolId);
        return { id: poolId, state: (await contract.readState()).state, ts: TS };
    }

    async function getUserArtefacts(userWallet: string) {
        let contributions = [];
        for (let i = 0; i < POOL_IDS.length; i++) {
            let artefacts = await getAllArtefactsByPool(POOL_IDS[i]!);
            contributions = contributions.concat(artefacts);
        }
        return contributions.filter((artefact: any) => {
            if (artefact.node && artefact.node.tags) {
                let tags = artefact.node.tags;
                for (let j = 0; j < tags.length; j++) {
                    if (tags[j].name === "Initial-Owner") {
                        if (tags[j].value === userWallet) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
    }

    async function getUserFavorites(userWallet: string) {
        let contributions = [];
        for (let i = 0; i < POOL_IDS.length; i++) {
            let artefacts = await getAllArtefactsByPool(POOL_IDS[i]!);
            contributions = contributions.concat(artefacts);
        }
        return contributions.filter((artefact: any) => {
            if (artefact.node && artefact.node.tags) {
                let tags = artefact.node.tags;
                for (let j = 0; j < tags.length; j++) {
                    if (tags[j].name === "Initial-Owner") {
                        if (tags[j].value === userWallet) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
    }


    async function toggleUserFavorite(artefactId: string){
        alert(artefactId);
    }

    function calcARDonated(userWallet: string, pool: any) {
        let calc = pool.state.tokens[userWallet] / 1000000000000;
        let tokens = (calc).toFixed(calc.toString().length);
        return tokens;
    }

    function calcReceivingPercent(userWallet: string, pool: any) {
        let calc = (pool.state.tokens[userWallet] / parseFloat(pool.state.totalContributions)) * 100;
        let tokens = (calc).toFixed(4);
        return tokens;
    }

    async function calcLastContributions(userWallet: string, pools: any[]){
        let contributions = await getUserArtefacts(userWallet);
        let conMap = {};
        pools.map((pool: any) => {
            let lastDate = 0;
            contributions.map((c: any) => {
                c.node.tags.map((tag: any) => {
                    if(tag.name === "Created-At"){
                        let v = parseInt(tag.value);
                        if(v > lastDate){
                            lastDate = v;
                            conMap[pool.id] = v;
                        }
                    }
                })
            })
        })
        return conMap;
    }

    async function getUserContributions(userWallet: string) {
        let pools = await getAllPools();
        let lastContributions = await calcLastContributions(userWallet, pools);
        return pools.filter((pool: any) => {
            if (pool.state.contributors.hasOwnProperty(userWallet)) {
                return true;
            }
            return false;
        }).map((pool: any) => {
            let p = pool;
            p["totalContributed"] = calcARDonated(userWallet, pool);
            p["lastContribution"] = lastContributions[pool.id];
            p["receivingPercent"] = calcReceivingPercent(userWallet, pool);
            return p;
        });
    }

    React.useEffect(() => {
        async function handleWallet() {
            let walletAddress: string | null = null;
            try {
                walletAddress = await global.window.arweaveWallet.getActiveAddress();
            }
            catch { }
            if (walletAddress) {
                setWalletAddress(walletAddress as any);
                setAvailableBalance(await getUserBalance(walletAddress));
            }
        }

        handleWallet();

        window.addEventListener("arweaveWalletLoaded", handleWallet);

        return () => {
            window.removeEventListener("arweaveWalletLoaded", handleWallet);
        };
    })
    
    return (
        <ARContext.Provider
            value={{
                walletAddress,
                availableBalance,
                handleConnect,
                handleDisconnect,
                wallets,
                walletModalVisible,
                setWalletModalVisible,
                handlePoolContribute,
                getARAmount,
                getAllArtefactsByPool,
                getAllPools,
                getPoolById,
                getUserArtefacts,
                getUserContributions,
                getUserFavorites,
                toggleUserFavorite
            }}
        >
            {props.children}
        </ARContext.Provider>
    )
}
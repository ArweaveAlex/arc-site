import React from "react";
import * as gql from "gql-query-builder";
import Arweave from "arweave";
import { SmartWeaveNodeFactory } from "redstone-smartweave";

import { ArtifactQueryType, ContributionResultType } from "@/types";
import { getBalanceEndpoint, getTxEndpoint } from "@/endpoints";
import { getTagValue } from "@/util";
import { LANGUAGE } from "@/language";
import { PAGINATOR, STORAGE, TAGS } from "@/config";

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
    getAllArtifactsByPool: (poolId: string) => any;
    getAllPools: () => any;
    getPoolById: (poolId: string) => any;
    getArtifactById: (artifactId: string) => any;
    getUserArtifacts: (userWallet: string) => any;
    getUserContributions: (userWallet: string) => any;
    getUserBookmarks: () => any;
    toggleUserBookmark: (artifactId: string) => any;
    getBookmarksIds: () => any;
    setTxInterval: (txId: string, parentTxId: string) => any
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

// 6AwT3c-PCJGyUC0od5MLnsokPzyXtGYGzCy7K9vTppQ
// tVw9PU3ysGdimjcbX7QCQPnZXXOt8oai3AbDW85Z_KA
// t6AAwEvvR-dbp_1FrSfJQsruLraJCobKl9qsJh9yb2M
// AwTgrMvxylqBuxsrkMPYxFS8b-uWavrgtRI28S25qfo
// O-S-Dt7cV5fUFgfkROTdXe_ZtmCA2PlEB15ECPE1R8Y
// jnEaMCUyYE3DshJEZaEwBXc9OwhGB-hBhSlL7pXB9dc
// 8JgQiIdiFvU--9yr_AKqBhNXsfVPBxUMiD17fotkUZs

const POOL_IDS: string[] = ["AwTgrMvxylqBuxsrkMPYxFS8b-uWavrgtRI28S25qfo"];

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
    async getAllArtifactsByPool(poolId: string): Promise<any> {
        console.log(`Get All Artifacts for ${poolId}`);
        return null;
    },
    async getAllPools() {
        return null;
    },
    async getPoolById(poolId: string) {
        console.log(`Get Pool ${poolId}`);
        return null
    },
    async getArtifactById(artifactId: string) {
        console.log(`Get Artifact ${artifactId}`);
        return null
    },
    async getUserArtifacts(_userWallet: string) {
        return null;
    },
    async getUserContributions(_userWallet: string) {
        return null;
    },
    async getUserBookmarks() {
        return null;
    },
    async toggleUserBookmark(_artifactId: string) {
        return null
    },
    async getBookmarksIds() {
        return null
    },
    setTxInterval(_txId: string, _parentTxId: string) {
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

    async function getAllArtifactsByPool(poolId: string) {
        const aggregatedArtifacts: any = [];
        let cursor: string | null = "";

        const query = (cursor: string) => gql.query({
            operation: "transactions",
            variables: {
                tags: {
                    value: {
                        name: TAGS.keys.poolId,
                        values: [poolId]
                    },
                    type: "[TagFilter!]"
                },
                first: PAGINATOR,
                after: cursor
            },
            fields: [
                {
                    edges: [
                        "cursor",
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

        while (cursor !== null) {
            const response = await arweave.api.post("/graphql", query(cursor));
            if (response.data.data) {
                const responseData = response.data.data.transactions.edges;
                if (responseData.length > 0) {
                    cursor = responseData[responseData.length - 1].cursor;
                    aggregatedArtifacts.push(...responseData);
                    if (responseData.length < PAGINATOR) {
                        cursor = null;
                    }
                }
                else {
                    cursor = null;
                }
            }
            else {
                cursor = null;
            }
        }

        return aggregatedArtifacts.filter((element: ArtifactQueryType) => getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none);
    }

    async function getAllPools() {
        const collections: any = [];

        for (let i = 0; i < POOL_IDS.length; i++) {
            try {
                const contract = smartweave.contract(POOL_IDS[i]!);
                collections.push({ id: POOL_IDS[i], state: (await contract.readState()).state });
            }
            catch (error: any) {
                console.error(error)
            }
        }

        return collections;
    }

    async function getPoolById(poolId: string) {
        try {
            const contract = smartweave.contract(poolId);
            return { id: poolId, state: (await contract.readState()).state };
        }
        catch (error: any) {
            console.error(error)
            return null
        }
    }

    async function getArtifactById(artifactId: string) {
        const query = () => gql.query({
            operation: "transactions",
            variables: {
                tags: {
                    value: {
                        name: TAGS.keys.uploaderTxId,
                        values: [artifactId]
                    },
                    type: "[TagFilter!]"
                }
            },
            fields: [
                {
                    edges: [
                        "cursor",
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

        const response = await arweave.api.post("/graphql", query());
        if (response.data.data) {
            const responseData = response.data.data.transactions.edges;
            if (responseData.length > 0) {
                // console.log(getTagValue(responseData[0].node.tags, TAGS.keys.artifactName)); // TODO Get Artifact Type return artifactType
            }
        }

        try {
            const response = await fetch(getTxEndpoint(artifactId))
            if (response.status === 200) {
                try {
                    return ({
                        artifactType: TAGS.values.defaultArtifactType,
                        dataUrl: response.url,
                        rawData: await response.text()
                    });
                }
                catch (error: any) {
                    console.error(error);
                    return null;
                }
            }
            else {
                return null;
            }
        }
        catch (error: any) {
            console.error(error);
            return null;
        }
    }

    async function getUserArtifacts(userWallet: string) {
        let contributions = [];
        for (let i = 0; i < POOL_IDS.length; i++) {
            let artifacts = await getAllArtifactsByPool(POOL_IDS[i]!);
            contributions = contributions.concat(artifacts);
        }
        return contributions.filter((artifact: ArtifactQueryType) => {
            if (artifact.node && artifact.node.tags) {
                let tags = artifact.node.tags;
                for (let j = 0; j < tags.length; j++) {
                    if (tags[j]!.name === TAGS.keys.initialOwner) {
                        if (tags[j]!.value === userWallet) {
                            return true;
                        }
                    }
                }
            }
            return false;
        });
    }

    async function getUserBookmarks() {
        const aggregatedBookmarks: any = [];
        let cursor: string | null = "";

        const query = (cursor: string) => gql.query({
            operation: "transactions",
            variables: {
                tags: {
                    value: {
                        name: TAGS.keys.bookmarkSearch,
                        values: [walletAddress]
                    },
                    type: "[TagFilter!]"
                },
                first: PAGINATOR,
                after: cursor
            },
            fields: [
                {
                    edges: [
                        "cursor",
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

        if (walletAddress) {
            while (cursor !== null) {
                const response = await arweave.api.post("/graphql", query(cursor));
                if (response.data.data) {
                    const responseData = response.data.data.transactions.edges;
                    if (responseData.length > 0) {
                        cursor = responseData[responseData.length - 1].cursor;
                        aggregatedBookmarks.push(...responseData);
                        if (responseData.length < PAGINATOR) {
                            cursor = null;
                        }
                    }
                    else {
                        cursor = null;
                    }
                }
                else {
                    cursor = null;
                }
            }
        }

        return aggregatedBookmarks;
    }

    async function getBookmarksIds() {
        const aggregatedBookmarks = await getUserBookmarks();

        if (aggregatedBookmarks.length > 0) {
            let recentDate = Number(getTagValue(aggregatedBookmarks[0].node.tags, TAGS.keys.dateCreated)!)

            for (let i = 0; i < aggregatedBookmarks.length; i++) {
                const date = Number(getTagValue(aggregatedBookmarks[i].node.tags, TAGS.keys.dateCreated)!);
                recentDate = Math.max(recentDate, date)
            }

            for (let i = 0; i < aggregatedBookmarks.length; i++) {
                if (recentDate === Number(getTagValue(aggregatedBookmarks[i].node.tags, TAGS.keys.dateCreated)!)) {
                    return JSON.parse(getTagValue(aggregatedBookmarks[i].node.tags, TAGS.keys.bookmarkIds)!)
                }
            }
        }

        return [];
    }


    async function toggleUserBookmark(artifactId: string) {
        if (walletAddress) {
            const bookmarksIds = await getBookmarksIds();

            if (bookmarksIds.includes(artifactId)) {
                bookmarksIds.splice(bookmarksIds.indexOf(artifactId), 1)
            }
            else {
                bookmarksIds.push(artifactId);
            }

            let txRes = await arweave.createTransaction({ data: JSON.stringify(bookmarksIds) }, "use_wallet");

            txRes.addTag(TAGS.keys.bookmarkSearch, walletAddress!);
            txRes.addTag(TAGS.keys.dateCreated, Date.now().toString());
            txRes.addTag(TAGS.keys.bookmarkIds, JSON.stringify(bookmarksIds));

            try {
                await arweave.transactions.sign(txRes, "use_wallet");
            }
            catch (e) {
                console.log(e)
            }

            await arweave.transactions.post(txRes);
            localStorage.setItem(artifactId, JSON.stringify({ [txRes.id]: STORAGE.pending }));
            window.dispatchEvent(new Event(STORAGE.txUpdate));
            setTxInterval(txRes.id, artifactId);
        }
    }

    function setTxInterval(txId: string, parentTxId: string) {
        const interval = setInterval(function () {
            arweave.transactions.getStatus(txId).then(res => {
                if (res.confirmed && localStorage.getItem(parentTxId)) {
                    localStorage.removeItem(parentTxId);
                    window.dispatchEvent(new Event(STORAGE.txUpdate));
                    clearInterval(interval);
                }
            })
        }, 2000);
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

    async function calcLastContributions(userWallet: string, pools: any[]) {
        let contributions = await getUserArtifacts(userWallet);
        let conMap = {};
        pools.map((pool: any) => {
            let lastDate = 0;
            contributions.map((c: any) => {
                c.node.tags.map((tag: any) => {
                    if (tag.name === TAGS.keys.createdAt) {
                        let v = parseInt(tag.value);
                        if (v > lastDate) {
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
            let poolElement = pool;
            poolElement.totalContributed = calcARDonated(userWallet, pool);
            poolElement.lastContribution = lastContributions[pool.id];
            poolElement.receivingPercent = calcReceivingPercent(userWallet, pool);
            return poolElement;
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
                getAllArtifactsByPool,
                getAllPools,
                getPoolById,
                getArtifactById,
                getUserArtifacts,
                getUserContributions,
                getUserBookmarks,
                toggleUserBookmark,
                getBookmarksIds,
                setTxInterval
            }}
        >
            {props.children}
        </ARContext.Provider>
    )
}
import React from "react";
import * as gql from "gql-query-builder";
import Arweave from "arweave";
import { SmartWeaveNodeFactory } from "redstone-smartweave";

import { ContributionResultType } from "@/types";
import { getBalanceEndpoint } from "@/endpoints";
import { getTagValue } from "@/util";
import { Tag } from "arweave/node/lib/transaction";
import { LANGUAGE } from "@/language";
import { PAGINATOR } from "@/config";

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
    getUserArtifacts: (userWallet: string) => any;
    getUserContributions: (userWallet: string) => any;
    getUserFavorites: (userWallet: string) => any;
    toggleUserFavorite: (artifactId: string, userWallet: string) => any;
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

// "6AwT3c-PCJGyUC0od5MLnsokPzyXtGYGzCy7K9vTppQ", "tVw9PU3ysGdimjcbX7QCQPnZXXOt8oai3AbDW85Z_KA", "t6AAwEvvR-dbp_1FrSfJQsruLraJCobKl9qsJh9yb2M"
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
    async getUserArtifacts(_userWallet: string) {
        return null;
    },
    async getUserContributions(_userWallet: string) {
        return null;
    },
    async getUserFavorites(_userWallet: string) {
        return null;
    },
<<<<<<< HEAD
    async toggleUserFavorite(_artefactId: string, _userWallet: string) {
=======
    async toggleUserFavorite(_artifactId: string, _userWallet: string) {
>>>>>>> 34ae018 (Paginate GraqhQL Artifact Queries, Handle UI Pagination, Add Media-Id Asset Tags)
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
                        name: "Pool-Id",
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
            const response = (await arweave.api.post("/graphql", query(cursor))).data.data.transactions.edges;
            cursor = response[response.length - 1].cursor;
            aggregatedArtifacts.push(...response);
            if (response.length < PAGINATOR) {
                cursor = null;
            }
        }

        return aggregatedArtifacts;
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

    async function getUserArtifacts(userWallet: string) {
        let contributions = [];
        for (let i = 0; i < POOL_IDS.length; i++) {
            let artifacts = await getAllArtifactsByPool(POOL_IDS[i]!);
            contributions = contributions.concat(artifacts);
        }
        return contributions.filter((artifact: any) => {
            if (artifact.node && artifact.node.tags) {
                let tags = artifact.node.tags;
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
        const query = gql.query({
            operation: "transactions",
            variables: {
                tags: {
                    value: {
                        name: "Alex-Favorite-Search",
                        values: [userWallet]
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


<<<<<<< HEAD
    async function toggleUserFavorite(artefactId: string, userWallet: string){
=======
    async function toggleUserFavorite(artifactId: string, userWallet: string){
>>>>>>> 34ae018 (Paginate GraqhQL Artifact Queries, Handle UI Pagination, Add Media-Id Asset Tags)
        let favorites: any[] = [];
        let f = await getUserFavorites(userWallet);

        console.log(f);

        if(f.tags){
            let n = getTagValue(f.tags, "Favorite-Ids-Tag");
            if(n){
                let favoriteIds = JSON.parse(n);
                favorites.concat(favoriteIds);
            }
        }
        
<<<<<<< HEAD
        if(favorites.includes(artefactId)){
            favorites = favorites.splice(favorites.indexOf(artefactId), 1);
        } else {
            favorites = favorites.concat(artefactId);
=======
        if(favorites.includes(artifactId)){
            favorites = favorites.splice(favorites.indexOf(artifactId), 1);
        } else {
            favorites = favorites.concat(artifactId);
>>>>>>> 34ae018 (Paginate GraqhQL Artifact Queries, Handle UI Pagination, Add Media-Id Asset Tags)
        }

        console.log(favorites);

        let searchTag: Tag = new Tag("Alex-Favorite-Search", userWallet);
        let dateCreatedTag: Tag = new Tag("Date-Created", Date.now().toString());
        let favoriteIdsTag: Tag = new Tag("Favorite-Ids-Tag", JSON.stringify(favorites).toString());
        
        console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        let res = await arweave.createTransaction({
            data: JSON.stringify(favorites)
        }, "use_wallet");
        console.log(res)
        try {
            await arweave.transactions.sign(res, "use_wallet");
        } catch(e){
            console.log(e)
        }

        res.addTag("Alex-Favorite-Search", userWallet);
        res.addTag("Date-Created", Date.now().toString());
        res.addTag("Favorite-Ids-Tag", JSON.stringify(favorites));
        
        console.log(res);

        const response = await arweave.transactions.post(res);

        console.log(response)
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
        let contributions = await getUserArtifacts(userWallet);
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
                getAllArtifactsByPool,
                getAllPools,
                getPoolById,
                getUserArtifacts,
                getUserContributions,
                getUserFavorites,
                toggleUserFavorite
            }}
        >
            {props.children}
        </ARContext.Provider>
    )
}
import React from "react";
import Arweave from "arweave";
import { SmartWeaveNodeFactory } from "redstone-smartweave";

import { API_URI } from "@/config";
import { LANGUAGE } from "@/language";

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
    handleConnect: (walletName: string) => void;
    handleDisconnect: () => void;
    walletModalVisible: boolean;
    setWalletModalVisible: (open: boolean) => void;
    handlePoolContribute: (poolId: string, amount: number) => void;
}

interface ARProviderProps {
    children: React.ReactNode;
}

const DEFAULT_CONTEXT = {
    wallets: [],
    walletAddress: null,
    availableBalance: null,
    handleConnect(walletName: string) {
        console.error(`No Connector Found for ${walletName}`);
    },
    handleDisconnect() {
        console.error(`No Connection Found`);
    },
    setWalletModalVisible(_open: boolean) {
        console.error('Make sure to render ARProvider as an ancestor of the component that uses ARContext.Provider');
    },
    walletModalVisible: false,
    handlePoolContribute(poolId: string, amount: number) {
        console.log(`Contribute to ${poolId} - amount: ${amount}`);
    }
}

const ARContext = React.createContext<ARContextState>(DEFAULT_CONTEXT);

const arweave: any = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 40000,
    logging: false,
});

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

    const [walletModalVisible, setWalletModalVisible] = React.useState(false);
    const [walletAddress, setWalletAddress] = React.useState(null);
    const [availableBalance, setAvailableBalance] = React.useState(null);

    async function connect(connector: string, consoleError: boolean) {
        await global.window?.arweaveWallet?.connect(PERMISSIONS as any).then(() => {
            setWalletModalVisible(false)
        }).catch((error: any) => {
            if (consoleError) {
                console.error(error);
            }
            else {
                alert(`${connector.charAt(0).toUpperCase() + connector.slice(1)} ${LANGUAGE.connectionError}`);
            }
        })
    }

    async function handleConnect(walletName: string) {
        connect(walletName, true);
    }

    async function handleDisconnect() {
        await global.window?.arweaveWallet?.disconnect();
        setWalletAddress(null);
    }

    const getUserBalance = async (wallet: string) => {
        const rawBalance = await fetch(`${API_URI}/api/balance/${wallet}`);
        const jsonBalance = await rawBalance.json();
        return jsonBalance.balance;
    };

    async function handlePoolContribute(poolId: string, amount: number) {

        if (!availableBalance || amount > availableBalance) {
            console.log("You don't have enough AR to contribute to this pool.");
            return;
        }

        try {
            const smartweave = SmartWeaveNodeFactory.memCached(arweave);

            const { data: contractData }: { data: ContractDataProps; } = await arweave.api.get(`/${poolId}`);

            if (!contractData.owner) {
                throw new Error(
                    "Failed to fetch contract owner. Please, try again in a few minutes."
                );
            }

            console.log(`Contribute ${amount} to pool owner: ${contractData.owner}`)

            const token = smartweave
                .contract(poolId)
                .connect("use_wallet")
                .setEvaluationOptions({
                    waitForConfirmation: false,
                });

            const result = await token.writeInteraction<any>(
                { function: "contribute" }, [], { target: contractData.owner, winstonQty: arweave.ar.arToWinston(amount.toString()) }
            );

            if (!result) {
                throw new Error("Failed to contribute to pool. Please, try again.");
            }

            console.log("Thank you for your contribution")

        }
        catch (error) {
            console.log(error);
        }
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
                handlePoolContribute
            }}
        >
            {props.children}
        </ARContext.Provider>
    )
}
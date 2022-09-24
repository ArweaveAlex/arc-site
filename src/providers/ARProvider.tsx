import React from "react";

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
    handleConnect: (walletName: string) => void;
    handleDisconnect: () => void;
    modalVisible: boolean;
    setWalletModalVisible: (open: boolean) => void;
}

interface ARProviderProps {
    children: React.ReactNode;
}

const DEFAULT_CONTEXT = {
    wallets: [],
    walletAddress: null,
    handleConnect(walletName: string) {
        console.error(`No Connector Found for ${walletName}`);
    },
    handleDisconnect() {
        console.error(`No Connection Found`);
    },
    setWalletModalVisible(_open: boolean) {
        console.error('Make sure to render ARProvider as an ancestor of the component that uses ARContext.Provider');
    },
    modalVisible: false
}

const ARContext = React.createContext<ARContextState>(DEFAULT_CONTEXT);

export function useARProvder(): ARContextState {
    return React.useContext(ARContext);
}

export function ARProvider(props: ARProviderProps) {
    const wallets = AR_WALLETS;

    const [modalVisible, setWalletModalVisible] = React.useState(false);
    const [walletAddress, setWalletAddress] = React.useState(null);
    const [connected, setConnected] = React.useState(false);

    async function connect(connector: string, consoleError: boolean) {
        await global.window?.arweaveWallet?.connect(PERMISSIONS as any).then(() => {
            setWalletModalVisible(false),
            setConnected(true)
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
        setConnected(false);
    }

    React.useEffect(() => {
        window.addEventListener("arweaveWalletLoaded", async () => {
            let walletAddress: string | null = null;
            try {
                walletAddress = await global.window?.arweaveWallet?.getActiveAddress();
            }
            catch {}
            if (walletAddress) {
                setConnected(true);
            }
        });
    }, [])

    React.useEffect(() => {
        async function getAddress() {
            const walletAddress = await global.window?.arweaveWallet?.getActiveAddress();
            if (walletAddress) {
                setWalletAddress(walletAddress as any);
            }
        }
        if (connected) {
            getAddress();
        }
    }, [connected])

    return (
        <ARContext.Provider
            value={{
                walletAddress,
                handleConnect,
                handleDisconnect,
                wallets,
                modalVisible,
                setWalletModalVisible
            }}
        >
            {props.children}
        </ARContext.Provider>
    )
}
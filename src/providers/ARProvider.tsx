import React from "react";
import { useArjs, ArjsProvider } from "arjs-react";

import { LANGUAGE } from "@/language";
import { APP } from "@/config";

const AR_WALLETS = [
    { name: "arconnect", logo: "arconnect-wallet-logo.png" }
]

const PERMISSIONS = { permissions: ["SIGN_TRANSACTION"] };

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

export const ARContext = React.createContext<ARContextState>(DEFAULT_CONTEXT);

export function useARProvder(): ARContextState {
    return React.useContext(ARContext);
}

export function WalletProvider(props: ARProviderProps) {
    const wallets = AR_WALLETS;
    const arJsWallet = useArjs();

    const [modalVisible, setWalletModalVisible] = React.useState(false);
    const [walletAddress, setWalletAddress] = React.useState(null);
    const [connected, setConnected] = React.useState(false);

    async function connect(connector: string, permissions: Object, consoleError: boolean) {
        localStorage.setItem(APP.walletStorage, connector);
        await arJsWallet.connect(connector, permissions).then(() => {
            setWalletModalVisible(false)
        }).catch((error: any) => {
            if (consoleError) {
                console.warn(error);
            }
            else {
                alert(`${connector.charAt(0).toUpperCase() + connector.slice(1)} ${LANGUAGE.connectionError}`);
            }
        })
    }

    function handleConnect(walletName: string) {
        connect(walletName, PERMISSIONS, false);
    }

    function handleDisconnect() {
        if (localStorage.getItem(APP.walletStorage)) {
            localStorage.removeItem(APP.walletStorage);
            arJsWallet.disconnect();
            setWalletAddress(null);
            setConnected(false)
        }
    }

    React.useEffect(() => {
        const walletStorageItem = localStorage.getItem(APP.walletStorage);
        window.addEventListener("arweaveWalletLoaded", async () => {
            if (window.arweaveWallet && walletStorageItem && arJsWallet.status !== "connected") {
                connect(walletStorageItem, PERMISSIONS, true);
            }
        });
    }, [])

    React.useEffect(() => {
        setConnected(arJsWallet.status === "connected");
    })

    React.useEffect(() => {
        async function getAddress() {
            setWalletAddress(await arJsWallet.getAddress())
        }
        if (connected) {
            getAddress();
        }
    })

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

export function ARProvider(props: ARProviderProps) {
    return (
        <ArjsProvider connectors={{ arconnect: true, arweave: true }}>
            <WalletProvider>
                {props.children}
            </WalletProvider>
        </ArjsProvider>
    )
}
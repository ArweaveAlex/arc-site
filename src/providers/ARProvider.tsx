import React from "react";

const AR_WALLETS = [
    { name: "arconnect", logo: "arconnect-wallet-logo.png" },
    { name: "arweave", logo: "arweave-wallet-logo.png" }
]

interface ARContextState {
    wallets: { name: string, logo: string }[];
    connected: boolean;
    handleConnect: (walletName: string) => void;
}

interface ARProviderProps {
    children: React.ReactNode;
}

const DEFAULT_CONTEXT = {
    wallets: [],
    connected: false,
    handleConnect(walletName: string) {
        console.error("No Connector Found")
    }
}

export const ARContext = React.createContext<ARContextState>(DEFAULT_CONTEXT);

export function useARProvider(): ARContextState {
    return React.useContext(ARContext);
}

export function ARProvider(props: ARProviderProps) {
    const wallets = AR_WALLETS;
    const connected = false;

    function handleConnect(walletName: string) {
        console.log(`Connect ${walletName}`);
    }

    return (
        <ARContext.Provider
            value={{
                connected,
                handleConnect,
                wallets
            }}
        >
            {props.children}
        </ARContext.Provider>
    )
}
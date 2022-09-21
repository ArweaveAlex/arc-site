import React from "react";
import Router from "next/router";
import { ReactSVG } from "react-svg";
import { useArjs } from "arjs-react";
import { ArweaveWebWallet } from "arweave-wallet-connector";

import { useARProvider } from "@/providers/ARProvider";

import { Button } from "@/components/atoms/Button";
import { Modal } from "../../components/molecules/Modal";

import { CloseHandler } from "@/components/organisms/CloseHandler";

import { APP, URLS } from "@/config";
import * as util from "@/util";
import { language } from "@/language";
import * as S from "./styles";

const ARCONNECT_WALLET = "arconnect";
const ARWEAVE_WALLET = "arweave";

function WalletList({ handleClose, setArAppWalletConnect }) {
    const arJsWallet = useArjs();

    const permissions = { permissions: ["SIGN_TRANSACTION"] };

    const { wallets, handleConnect } = useARProvider();

    async function activate(connector: string, key: Object) {
        localStorage.setItem(APP.walletStorage, connector)
        await arJsWallet.connect(connector, key).then(() => {
            handleClose()
        }).catch((error: any) => {
            console.log(error)
            alert(language.connectionError);
        })
    }

    // async function handleArweaveWalletConnection() {
    //     localStorage.setItem(APP.walletStorage, ARWEAVE_WALLET);
    //     setArAppWalletConnect();
    //     handleClose();
    // }

    function handlePress(wallet: { name: string, logo: string }, permissions: any) {
        switch (wallet.name) {
            case ARCONNECT_WALLET:
                return activate(wallet.name, permissions);
            // case ARWEAVE_WALLET:
            //     return handleArweaveWalletConnection();
            default:
                return activate(wallet.name, permissions);
        }
    }

    return (
        <S.WalletListContainer>
            {wallets.map((wallet, index) => (
                // <S.WalletListItem key={index} onClick={() => handlePress(wallet, permissions)}>
                //     <img src={`/assets/${wallet.logo}`} />
                //     <span>{wallet.name.charAt(0).toUpperCase() + wallet.name.slice(1)}</span>
                // </S.WalletListItem>
                <S.WalletListItem key={index} onClick={() => handleConnect(wallet.name)}>
                    <img src={`/assets/${wallet.logo}`} />
                    <span>{wallet.name.charAt(0).toUpperCase() + wallet.name.slice(1)}</span>
                </S.WalletListItem>
            ))}
        </S.WalletListContainer>
    )
}

export default function WalletConnect({ setDynamicNavigationStatus }) {
    const arJsWallet = useArjs();
    const arAppWallet = new ArweaveWebWallet({
        name: language.companyTitle,
        logo: "/assets/arweave-wallet-logo.png"
    })

    const permissions = { permissions: ["SIGN_TRANSACTION"] };

    const [showModal, setShowModal] = React.useState(false);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const [address, setAddress] = React.useState("");
    const [connected, setConnected] = React.useState(false);
    const [arAppWalletConnect, setArAppWalletConnect] = React.useState(false);

    React.useEffect(() => {
        //     async function connectArweaveWallet() {
        //         arAppWallet.setUrl("arweave.app");
        //         console.log(arAppWallet)
        //         await arAppWallet.namespaces.arweaveWallet.connect().then(() => {
        //             console.log("!!!")
        //             // console.log(arAppWallet.namespaces.arweaveWallet.getActiveAddress())
        //         }).catch((error: any) => {
        //             console.log(error)
        //         });

        // (async function () {
        //     arAppWallet.setUrl("arweave.app");
        //     await arAppWallet.connect()
        // })();

        const walletStorageItem = localStorage.getItem(APP.walletStorage);
        if (walletStorageItem && walletStorageItem === ARWEAVE_WALLET) {
            // connectArweaveWallet();
            (async function () {
                arAppWallet.setUrl("arweave.app");
                await arAppWallet.connect()
            })();
        }
    })

    // React.useEffect(() => {
    //     async function connectArweaveWallet() {
    //         arAppWallet.setUrl("arweave.app");
    //         console.log(arAppWallet)
    //         await arAppWallet.namespaces.arweaveWallet.connect().then(() => {
    //             console.log("!!!")
    //             // console.log(arAppWallet.namespaces.arweaveWallet.getActiveAddress())
    //         }).catch((error: any) => {
    //             console.log(error)
    //         });
    //         const arAppWalletAddress = arAppWallet.namespaces.arweaveWallet.getActiveAddress();
    //         if (arAppWalletAddress) {
    //             setConnected(true);
    //             setAddress(arAppWalletAddress);
    //         }
    //     }
    //     const walletStorageItem = localStorage.getItem(APP.walletStorage);
    //     if (walletStorageItem && walletStorageItem === ARWEAVE_WALLET) {
    //         connectArweaveWallet();
    //     }
    // })

    // React.useEffect(() => {
    //     const walletStorageItem = localStorage.getItem(APP.walletStorage);
    //     if ((walletStorageItem && walletStorageItem !== ARWEAVE_WALLET)
    //         && arJsWallet.status !== "connected" && window.arweaveWallet) {
    //         arJsWallet.connect(walletStorageItem, permissions)
    //     }
    //     // else {
    //     //     if (arAppWalletConnect && (walletStorageItem && walletStorageItem === ARWEAVE_WALLET) && !connected) {
    //     //         (async function () {
    //     //             arAppWallet.setUrl("arweave.app");
    //     //             await arAppWallet.connect();
    //     //             const arAppWalletAddress = arAppWallet.namespaces.arweaveWallet.getActiveAddress();
    //     //             if (arAppWalletAddress) {
    //     //                 setConnected(true);
    //     //                 setAddress(arAppWalletAddress);
    //     //             }
    //     //         })();
    //     //     }
    //     // }
    // })

    // React.useEffect(() => {
    //     if (!arAppWalletConnect) {
    //         setConnected(arJsWallet.status === "connected");
    //     }
    // })

    // React.useEffect(() => {
    //     async function getAddress() {
    //         setAddress(await arJsWallet.getAddress())
    //     }
    //     if (connected && !arAppWalletConnect) {
    //         getAddress();
    //     }
    // })

    const copyAddress = React.useCallback(async () => {
        if (address.length > 0) {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [address]);

    function handlePress() {
        if (connected) {
            setShowDropdown(true)
        }
        else {
            setShowModal(true);
        }
    }

    async function handleDisconnect() {
        if (localStorage.getItem(APP.walletStorage) === ARCONNECT_WALLET) {
            localStorage.removeItem(APP.walletStorage)
            arJsWallet.disconnect();
            setShowDropdown(false);
        }
        else {
            localStorage.removeItem(APP.walletStorage)
            arAppWallet.disconnect();
            setAddress("");
            setConnected(false);
            setShowDropdown(false);
        }
    }

    function handleViewAccount() {
        Router.push(URLS.account[0]!.url);
        setShowDropdown(false);
        setDynamicNavigationStatus()
    }

    return (
        <CloseHandler handler={() => setShowDropdown(!showDropdown)} active={showDropdown}>
            <S.Wrapper>
                {showModal &&
                    <Modal
                        title={language.connectWallet}
                        handleClose={() => setShowModal(false)}
                    >
                        <WalletList handleClose={() => setShowModal(false)} setArAppWalletConnect={() => setArAppWalletConnect(true)} />
                    </Modal>
                }
                <Button
                    type={"primary"}
                    label={connected ? util.formatAddress(address, false) : language.connectWallet}
                    handlePress={handlePress}
                    useMaxWidth
                />
                {showDropdown &&
                    <S.WalletDropdown>
                        <li onClick={copyAddress}>
                            <S.Icon strokeFill={false}>
                                <ReactSVG src={"/assets/copy.svg"} />
                            </S.Icon>
                            {copied ?
                                <div>
                                    <span>
                                        {language.copied}
                                    </span>
                                </div>
                                : language.copyAddress}
                        </li>
                        <li onClick={handleDisconnect}>
                            <S.Icon strokeFill={false}>
                                <ReactSVG src={"/assets/disconnect.svg"} />
                            </S.Icon>
                            {language.disconnect}
                        </li>
                        <li onClick={handleViewAccount}>
                            <S.Icon strokeFill={true}>
                                <ReactSVG src={"/assets/user.svg"} />
                            </S.Icon>
                            {language.viewAccount}
                        </li>
                    </S.WalletDropdown>
                }
            </S.Wrapper>
        </CloseHandler>
    )
}
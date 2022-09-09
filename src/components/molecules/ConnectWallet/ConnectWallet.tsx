import React from "react";
import { ReactSVG } from "react-svg";
import { useArjs } from "arjs-react";

import { Button } from "@/components/atoms/Button";
import { Modal } from "../Modal";

import { CloseHandler } from "@/handlers/CloseHandler";

import { APP, WALLETS } from "@/config";
import { language } from "@/language";
import * as S from "./styles";

function WalletList({ handleClose }) {
    const wallet = useArjs();
    const permissions = { permissions: ["SIGN_TRANSACTION"] };

    async function activate(connector: string, key: Object) {
        localStorage.setItem(APP.walletStorage, connector)
        await wallet.connect(connector, key).then(() => {
            handleClose()
        }).catch(() => {
            alert(language.connectionError);
        })
    }

    return (
        <S.WalletListContainer>
            {WALLETS.map((wallet, index) => (
                <S.WalletListItem key={index} onClick={() => activate(wallet, permissions)}>
                    <span>{wallet.charAt(0).toUpperCase() + wallet.slice(1)}</span>
                </S.WalletListItem>
            ))}
        </S.WalletListContainer>
    )
}

export default function ConnectWallet() {
    const wallet = useArjs();
    const permissions = { permissions: ["SIGN_TRANSACTION"] };

    const [showModal, setShowModal] = React.useState(false);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const [address, setAddress] = React.useState("");
    const [connected, setConnected] = React.useState(false);

    React.useEffect(() => {
        const walletStorageItem = localStorage.getItem(APP.walletStorage);
        if (walletStorageItem && wallet.status !== "connected") {
            wallet.connect(walletStorageItem, permissions)
        }
    })

    React.useEffect(() => {
        setConnected(wallet.status === "connected");
    })

    React.useEffect(() => {
        async function getAddress() {
            setAddress(await wallet.getAddress())
        }
        if (connected) {
            getAddress();
        }
    })

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

    function handleDisconnect() {
        if (wallet) {
            localStorage.removeItem(APP.walletStorage)
            wallet.disconnect();
            setShowDropdown(false);
        }
    }

    function handleViewProfile() {
        console.log('view account')
    }

    return (
        <CloseHandler handler={() => setShowDropdown(!showDropdown)} active={showDropdown}>
            <S.Wrapper>
                {showModal &&
                    <Modal
                        title={language.connectWallet}
                        handleClose={() => setShowModal(false)}
                    >
                        <WalletList handleClose={() => setShowModal(false)} />
                    </Modal>
                }
                <Button
                    type={"primary"}
                    label={connected ? address : language.connectWallet}
                    handlePress={handlePress}
                />
                {showDropdown &&
                    <S.WalletDropdown>
                        <li onClick={copyAddress}>
                            <S.Icon strokeFill={false}>
                                <ReactSVG src={"/assets/img/copy.svg"} />
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
                                <ReactSVG src={"/assets/img/disconnect.svg"} />
                            </S.Icon>
                            {language.disconnect}
                        </li>
                        <li onClick={handleViewProfile}>
                            <S.Icon strokeFill={true}>
                                <ReactSVG src={"/assets/img/user.svg"} />
                            </S.Icon>
                            {language.viewAccount}
                        </li>
                    </S.WalletDropdown>
                }
            </S.Wrapper>
        </CloseHandler>
    )
}
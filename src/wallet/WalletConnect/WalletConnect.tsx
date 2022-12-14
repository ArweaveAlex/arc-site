import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactSVG } from "react-svg";

import { useArweaveProvider } from "providers/ArweaveProvider";

import { Button } from "components/atoms/Button";
import { Modal } from "components/molecules/Modal";

import { CloseHandler } from "components/organisms/CloseHandler";

import { formatAddress } from "utils";
import { ASSETS, URLS } from "config";
import { LANGUAGE } from "language";
import * as S from "./styles";

function WalletList() {
    const arProvider = useArweaveProvider();

    return (
        <S.WalletListContainer>
            {arProvider.wallets.map((wallet, index) => (
                <S.WalletListItem key={index} onClick={() => arProvider.handleConnect()}>
                    <img src={`${wallet.logo}`} alt={""}/>
                    <span>{wallet.name.charAt(0).toUpperCase() + wallet.name.slice(1)}</span>
                </S.WalletListItem>
            ))}
        </S.WalletListContainer>
    )
}

export default function WalletConnect(props: { callback: () => void }) {
    const navigate = useNavigate();
    
    const arProvider = useArweaveProvider();

    const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
    const [copied, setCopied] = React.useState<boolean>(false);

    function handlePress() {
        if (arProvider.walletAddress) {
            setShowDropdown(true)
        }
        else {
            arProvider.setWalletModalVisible(true);
        }
    }

    const copyAddress = React.useCallback(async () => {
        if (arProvider.walletAddress) {
            if (arProvider.walletAddress.length > 0) {
                await navigator.clipboard.writeText(arProvider.walletAddress);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    }, [arProvider.walletAddress]);

    function handleDisconnect() {
        arProvider.handleDisconnect();
        setShowDropdown(false);
    }

    function handleViewAccount() {
        navigate(URLS.account[0]!.url);
        setShowDropdown(false);
        props.callback();
    }

    return (
        <CloseHandler handler={() => setShowDropdown(!showDropdown)} active={showDropdown}>
            <S.Wrapper>
                {arProvider.walletModalVisible &&
                    <Modal
                        title={LANGUAGE.connectWallet}
                        handleClose={() => arProvider.setWalletModalVisible(false)}
                    >
                        <WalletList />
                    </Modal>
                }
                <Button
                    type={"primary"}
                    label={arProvider.walletAddress ?
                        formatAddress(arProvider.walletAddress, false) : LANGUAGE.connectWallet}
                    handlePress={handlePress}
                    useMaxWidth
                />
                {showDropdown &&
                    <S.WalletDropdown>
                        <li onClick={handleViewAccount}>
                            <S.Icon strokeFill={true}>
                                <ReactSVG src={ASSETS.user} />
                            </S.Icon>
                            {LANGUAGE.viewAccount}
                        </li>
                        <li onClick={copyAddress}>
                            <S.Icon strokeFill={false}>
                                <ReactSVG src={ASSETS.copy} />
                            </S.Icon>
                            {copied ?
                                <div>
                                    <span>
                                        {LANGUAGE.copied}
                                    </span>
                                </div>
                                : LANGUAGE.copyAddress}
                        </li>
                        <li onClick={handleDisconnect}>
                            <S.Icon strokeFill={false}>
                                <ReactSVG src={ASSETS.disconnect} />
                            </S.Icon>
                            {LANGUAGE.disconnect}
                        </li>
                    </S.WalletDropdown>
                }
            </S.Wrapper>
        </CloseHandler>
    )
}
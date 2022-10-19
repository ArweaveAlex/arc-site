import React from "react";
import Router from "next/router";
import { ReactSVG } from "react-svg";

import { useARProvder } from "@/providers/ARProvider";

import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";

import { CloseHandler } from "@/components/organisms/CloseHandler";

import * as util from "@/util";
import { ASSETS, ASSET_SRC, URLS } from "@/config";
import { LANGUAGE } from "@/language";
import * as S from "./styles";

function WalletList() {
    const arProvider = useARProvder();

    return (
        <S.WalletListContainer>
            {arProvider.wallets.map((wallet, index) => (
                <S.WalletListItem key={index} onClick={() => arProvider.handleConnect()}>
                    <img src={`${ASSET_SRC}/${wallet.logo}`} />
                    <span>{wallet.name.charAt(0).toUpperCase() + wallet.name.slice(1)}</span>
                </S.WalletListItem>
            ))}
        </S.WalletListContainer>
    )
}

export default function WalletConnect({ setDynamicNavigationStatus }) {
    const arProvider = useARProvder();

    const [showDropdown, setShowDropdown] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const copyAddress = React.useCallback(async () => {
        if (arProvider.walletAddress) {
            if (arProvider.walletAddress.length > 0) {
                await navigator.clipboard.writeText(arProvider.walletAddress);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    }, [arProvider.walletAddress]);

    function handlePress() {
        if (arProvider.walletAddress) {
            setShowDropdown(true)
        }
        else {
            arProvider.setWalletModalVisible(true);
        }
    }

    function handleDisconnect() {
        arProvider.handleDisconnect();
        setShowDropdown(false);

    }

    function handleViewAccount() {
        Router.push(URLS.account[0]!.url);
        setShowDropdown(false);
        setDynamicNavigationStatus()
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
                        util.formatAddress(arProvider.walletAddress, false) : LANGUAGE.connectWallet}
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
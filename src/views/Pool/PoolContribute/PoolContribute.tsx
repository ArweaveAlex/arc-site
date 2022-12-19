import React from "react"
import { ReactSVG } from "react-svg";

import { useArweaveProvider } from "providers/ArweaveProvider";
import { ArweaveClient } from "arweave-client";
import { ContributionResultType } from "types";

import { Button } from "components/atoms/Button";
import { FormField } from "components/atoms/FormField";
import { Modal } from "components/molecules/Modal";
import { Notification } from "components/atoms/Notification";

import { ValidationType } from "types";
import { ASSETS } from "config";
import { LANGUAGE } from "language";
import { IProps } from "./types";
import * as S from "./styles";

export default function PoolContribute(props: IProps) {
    const arProvider = useArweaveProvider();
    const arClient = new ArweaveClient();

    const [showModal, setShowModal] = React.useState(false);
    const [amount, setAmount] = React.useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [receivingPercent, setReceivingPercent] = React.useState<string | null>(null);

    const [contributionResult, setContributionResult] = React.useState<ContributionResultType | null>(null);

    async function handlePoolContribute(e: any) {
        if (arProvider.availableBalance) {
            e.preventDefault();
            setLoading(true);
            setContributionResult(await arClient.handlePoolContribute(props.poolId, amount, arProvider.availableBalance));
            setLoading(false);
        }
    }

    function getAvailableBalance() {
        if (!arProvider.walletAddress) {
            return (
                <p>{LANGUAGE.walletNotConnected}</p>
            )
        }
        else {
            if (arProvider.availableBalance) {
                return (
                    <>
                        <S.AvailableBalance>{LANGUAGE.availableBalance}:&nbsp;</S.AvailableBalance>
                        <S.BalanceAmount>{arProvider.availableBalance.toFixed(3)}&nbsp;</S.BalanceAmount>
                        <S.ARTokens>{LANGUAGE.arTokens}</S.ARTokens>
                    </>
                )
            }
            else {
                if (arProvider.availableBalance === 0) {
                    return (
                        <>
                            <S.AvailableBalance>{LANGUAGE.availableBalance}:&nbsp;</S.AvailableBalance>
                            <S.BalanceAmount>{0}&nbsp;</S.BalanceAmount>
                            <S.ARTokens>{LANGUAGE.arTokens}</S.ARTokens>
                        </>
                    )
                }
                return (
                    <p>{LANGUAGE.fetchingBalance}&nbsp;...</p>
                )
            }
        }
    }

    function getInvalidForm(): ValidationType {
        if (!arProvider.availableBalance) {
            return { status: false, message: null };
        }
        else {
            if (amount > arProvider.availableBalance) {
                return { status: true, message: LANGUAGE.amountExceedsBalance };
            }
            return { status: false, message: null };
        }
    }

    function getReceivingPercent() {
        if (receivingPercent) {
            return (
                <S.RPWrapper>
                    <span>
                        {LANGUAGE.willBeReceiving}:
                    </span>
                    <p>&nbsp;~&nbsp;{receivingPercent}% {LANGUAGE.ofArtifactsCreated}.</p>
                </S.RPWrapper>
            )
        }
        else {
            return <p>{LANGUAGE.fetchingReceivingPercentage}&nbsp;...</p>
        }
    }

    function getDisabledSubmit() {
        return getInvalidForm().status || loading || !arProvider.walletAddress || isNaN(amount) || amount <= 0;
    }

    React.useEffect(() => {
        (async function () {
            if (arProvider.walletAddress) {
                setReceivingPercent(arClient.getReceivingPercent(
                    arProvider.walletAddress,
                    props.contributors,
                    props.totalContributions,
                    amount
                ))
                
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arProvider, arProvider.walletAddress, props.poolId, props.contributors, props.totalContributions, amount])

    return (
        <>
            {contributionResult &&
                <Notification
                    type={contributionResult.status === true ? "success" : "warning"}
                    message={contributionResult.message!}
                    callback={() => setContributionResult(null)}
                />
            }
            {showModal &&
                <Modal
                    title={LANGUAGE.contributeTo}
                    handleClose={() => setShowModal(false)}
                >
                    <S.ModalWrapper>
                        <S.Header>
                            <S.HeaderFlex>
                                <S.Header1>{props.header}</S.Header1>
                            </S.HeaderFlex>
                            {props.subheader}
                            <S.BalanceWrapper>
                                {getAvailableBalance()}
                            </S.BalanceWrapper>
                        </S.Header>
                        <S.Form onSubmit={(e) => handlePoolContribute(e)}>
                            <S.FormWrapper>
                                <S.FormContainer>
                                    <FormField
                                        type={"number"}
                                        value={amount}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
                                        disabled={loading || !arProvider.walletAddress}
                                        invalid={getInvalidForm()}
                                        endText={LANGUAGE.arTokens}
                                    />
                                </S.FormContainer>
                                {arProvider.walletAddress &&
                                    <S.RPWrapper>
                                        {getReceivingPercent()}
                                    </S.RPWrapper>
                                }
                            </S.FormWrapper>
                            <S.Message>
                                <p>{LANGUAGE.contributionMessage}</p>
                            </S.Message>
                            <S.SubmitWrapper>
                                <Button
                                    label={LANGUAGE.submit}
                                    type={"secondary"}
                                    handlePress={(e) => handlePoolContribute(e)}
                                    disabled={getDisabledSubmit()}
                                    loading={loading}
                                    formSubmit
                                />
                            </S.SubmitWrapper>
                        </S.Form>
                    </S.ModalWrapper>
                </Modal>
            }
            <S.Wrapper
                onClick={() => setShowModal(true)}
            >
                <S.Label>
                    <ReactSVG src={ASSETS.logoAltActive} />
                    <span>{LANGUAGE.contribute}</span>
                </S.Label>
            </S.Wrapper>
        </>
    )
}
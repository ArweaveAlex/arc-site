import React from "react"
import { ReactSVG } from "react-svg";

import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/atoms/FormField";
import { Modal } from "@/components/molecules/Modal"

import { ASSETS } from "@/config";
import { LANGUAGE } from "@/language";
import { IProps } from "./types";
import * as S from "./styles";

export default function CollectionContribute(props: IProps) {
    const [showModal, setShowModal] = React.useState(true);
    const [amount, setAmount] = React.useState<number | string>(0);

    return (
        <>
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
                        </S.Header>
                        <S.FormField>
                            <FormField
                                type={"number"}
                                value={amount}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.target.value))}
                                invalid={{ status: false, message: null }}
                                endText={LANGUAGE.arTokens}
                            />
                        </S.FormField>
                        <S.Button>
                            <Button 
                                label={LANGUAGE.submit}
                                type={"secondary"}
                                handlePress={() => console.log("Submit AR")}
                                disabled={false}
                                loading={false}
                            />
                        </S.Button>
                        <S.SignMessage>
                            <p>{LANGUAGE.walletSignMessage}</p>
                        </S.SignMessage>
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
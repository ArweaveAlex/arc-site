import React from "react"
import { ReactSVG } from "react-svg";

import { FormField } from "@/components/atoms/FormField";
import { Modal } from "@/components/molecules/Modal"

import { LANGUAGE } from "@/language";
import { IProps } from "./types";
import * as S from "./styles";

export default function CollectionContribute(props: IProps) {
    const [showModal, setShowModal] = React.useState(false);
    const [amount, setAmount] = React.useState<number | string>("");

    return (
        <>
            {showModal &&
                <Modal
                    title={LANGUAGE.contributeTo}
                    handleClose={() => setShowModal(false)}
                >
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
                </Modal>
            }
            <S.Wrapper
                onClick={() => setShowModal(true)}
            >
                <S.Label>
                    <ReactSVG src={"/assets/logo-alt-active.svg"} />
                    <span>{LANGUAGE.contribute}</span>
                </S.Label>
            </S.Wrapper>
        </>
    )
}
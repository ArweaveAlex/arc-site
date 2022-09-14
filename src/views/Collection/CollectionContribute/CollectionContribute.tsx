import React from "react"
import { ReactSVG } from "react-svg";

import { Modal } from "@/components/molecules/Modal"

import { language } from "@/language";
import * as S from "./styles";

export default function CollectionContribute() {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            {showModal &&
                    <Modal
                        title={language.contributeTo}
                        handleClose={() => setShowModal(false)}
                    >
                        
                    </Modal>
                }
            <S.Wrapper
                onClick={() => setShowModal(true)}
            >
                <S.Label>
                    <ReactSVG src={"/assets/img/logo-alt-active.svg"}/>
                <span>{language.contribute}</span>
                </S.Label>
            </S.Wrapper>
        </>
    )
}
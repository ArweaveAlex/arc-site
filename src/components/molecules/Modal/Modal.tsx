import React from "react";
import { ReactSVG } from "react-svg";

import { IconButton } from "components/atoms/IconButton";
import { Portal } from "components/atoms/Portal";

import { ASSETS, DOM } from "config";
import * as window from "window";
import * as S from "./styles";
import { IProps } from "./types";

export default function Modal(props: IProps) {
    React.useEffect(() => {
        window.scrollTo(0, 0);
        window.hideDocumentBody();
        return () => {
            window.showDocumentBody();
        };
    }, []);

    return (
        <Portal node={DOM.modal}>
            <S.Wrapper>
                <S.Container>
                    <S.Header>
                        <S.LT>
                            <S.Logo>
                                <ReactSVG src={ASSETS.logoAlt} />
                            </S.Logo>
                            <S.Title>{props.title}</S.Title>
                        </S.LT>
                        <S.Close>
                            <IconButton
                                sm
                                warning
                                src={ASSETS.close}
                                handlePress={props.handleClose}
                            />
                        </S.Close>
                    </S.Header>
                    <S.Body>
                        {props.children}
                    </S.Body>
                </S.Container>
            </S.Wrapper>
        </Portal>
    )
}
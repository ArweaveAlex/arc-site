import React from "react";
import { ReactSVG } from "react-svg";

import { Button } from "components/atoms/Button";
import { IconButton } from "components/atoms/IconButton";

import { ASSETS } from "config";
import { IProps } from "./types";
import * as S from "./styles";

export default function Search(props: IProps) {
    return (
        <S.Wrapper>
            <S.SearchWrapper>
                <S.SearchIcon disabled={props.disabled || !props.value}>
                    <ReactSVG src={ASSETS.search} />
                </S.SearchIcon>
                <S.SearchInput
                    type={"text"}
                    value={props.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleChange(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => props.handleSearch(e)}
                    disabled={props.disabled}
                />
                <S.CloseWrapper>
                    <IconButton
                        src={ASSETS.close}
                        type={"primary"}
                        handlePress={() => props.handleClear()}
                        disabled={props.disabled || !props.value}
                        warning
                        sm
                    />
                </S.CloseWrapper>
            </S.SearchWrapper>
            <S.SearchButtonWrapper>
                <Button 
                    type={"secondary"}
                    label={"Search"}
                    handlePress={(e: React.MouseEvent<HTMLInputElement>) => props.handleSearch(e)}
                    disabled={props.disabled || !props.value}
                    noMinWidth
                />
            </S.SearchButtonWrapper>
        </S.Wrapper>
    )
}
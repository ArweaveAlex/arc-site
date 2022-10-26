import React from "react";

import { LANGUAGE } from "@/language";
import { IProps } from "../../types";
import * as S from "./styles";

export default function ArtifactWiki(props: IProps) {
    return (
        <S.Wrapper>
            <S.Content
                id={"wiki-iframe"}
                src={props.data.dataUrl}
                frameBorder="0"
            />
            <S.LoadingWrapper><p>{LANGUAGE.loading}&nbsp;...</p></S.LoadingWrapper>
        </S.Wrapper>
    )
}
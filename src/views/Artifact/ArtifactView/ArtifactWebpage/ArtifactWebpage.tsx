import React from "react";
import parse from "html-react-parser";

import { LANGUAGE } from "language";
import { IProps } from "../../types";
import * as S from "./styles";

export default function ArtifactWebpage(props: IProps) {
    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        if (props.data && props.data.rawData) {
            setData((new DOMParser()).parseFromString(props.data.rawData, 'text/html').body.innerHTML)
        }
    }, [props.data])

    return data ? (
        <S.Wrapper>
            {parse(data)}
        </S.Wrapper>
    ) : (
        <S.LoadingWrapper>
            <p>{LANGUAGE.loading}&nbsp;...</p>
        </S.LoadingWrapper>
    );
}
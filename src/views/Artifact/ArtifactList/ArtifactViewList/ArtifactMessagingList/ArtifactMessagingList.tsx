import React from "react";

import { Loader } from "components/atoms/Loader";

import { orderByAssociationSequence } from "filters/artifacts";
import { ArtifactDetailType } from "config/types";
import { STORAGE } from "config";
import { getMessageText, getUsername } from "config/utils";
import { IProps } from "../../types";
import * as S from "./styles";

// TODO - Link to /thread/:id, render ArtifactSingle with go back to list option
function ListItem(props: { rawData: string }) {
    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        if (props.rawData) {
            setData(JSON.parse(props.rawData));
        }
    }, [props.rawData])

    return data ? (
        <S.ListItemWrapper>
            <p>{data.user && data.user.name ? data.user.name : STORAGE.none}</p>
            <p>{getUsername(data)}</p>
            <p>{getMessageText(data)}</p>
        </S.ListItemWrapper>
    ) : null;
}

export default function ArtifactMessagingList(props: IProps) {
    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        if (props.data) {
            setData(orderByAssociationSequence(props.data));
        }
    }, [props.data])

    return data ? (
        <S.Wrapper>
            <S.ListWrapper>
                {data.map((artifact: ArtifactDetailType, index: number) => {
                    return (
                        <ListItem 
                            key={index} 
                            rawData={artifact.rawData} 
                        />
                    )
                })}
            </S.ListWrapper>
            {props.loading && (
                <S.LoadingContainer>
                    <Loader sm />
                </S.LoadingContainer>
            )}
        </S.Wrapper>
    ) : null;
}
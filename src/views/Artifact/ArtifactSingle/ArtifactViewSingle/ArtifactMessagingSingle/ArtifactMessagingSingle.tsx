import React from "react";

import { MessagingListItem } from "global/MessagingListItem";

import { Loader } from "components/atoms/Loader";

import { ArtifactDetailType } from "helpers/types";
import { IProps } from "../../types";
import * as S from "./styles";

export default function ArtifactMessagingSingle(props: IProps) {
    const [detailData, setDetailData] = React.useState<ArtifactDetailType | null>(null);

    function getDetailData() {
        if (!detailData) {
            return <Loader sm />
        }
        else {
            return (
                <MessagingListItem
                    data={detailData}
                    isListItem={false}
                    active={false}
                    showArtifactLink={false}
                    showOwnerLink={false}
                />
            )
        }
    }

    React.useEffect(() => {
        if (props.data) {
            setDetailData(props.data);
        }
    }, [props.data])

    return (
        <S.Wrapper>
            <S.DetailWrapper>
                {getDetailData()}
            </S.DetailWrapper>
        </S.Wrapper>
    );
}
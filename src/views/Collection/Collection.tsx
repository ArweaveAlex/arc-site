import { useARProvder } from "@/providers/ARProvider";

import { CollectionType } from "@/types";

import { Loader } from "@/components/atoms/Loader";

import { CollectionHeader } from "./CollectionHeader";
import { CollectionDetail } from "./CollectionDetail";

import { getTxEndpoint } from "@/endpoints";
import { formatDate } from "@/util";
import * as S from "./styles";
import React from "react";

export default function _Collection(props: { data: CollectionType }) {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        (async function () {
            setData((await arProvider.getAllArtifactsByPool(props.data.id)));
        })();
    }, [arProvider.walletAddress])
    
    return data ? (
        <S.Wrapper>
            <CollectionHeader
                id={props.data.id}
                image={getTxEndpoint(props.data.state.image)}
                title={props.data.state.title}
                description={props.data.state.description}
                dateCreated={formatDate(props.data.state.timestamp, "epoch")}
                count={data ? data.length : 0}
                totalContributions={arProvider.getARAmount(props.data.state.totalContributions)}
            />
            <CollectionDetail data={data}/>
        </S.Wrapper>
    ) : <Loader />
}
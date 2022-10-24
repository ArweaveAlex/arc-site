import { useARProvder } from "@/providers/ARProvider";

import { ArweaveCollectionProps } from "@/types";

import { Loader } from "@/components/atoms/Loader";
import { IconButton } from "@/components/atoms/IconButton";

import { CollectionHeader } from "./CollectionHeader";
import { CollectionDetail } from "./CollectionDetail";

import { getTxEndpoint } from "@/endpoints";
import { formatDate, getTagValue } from "@/util";
import { ASSETS } from "@/config";
import * as S from "./styles";
import React from "react";

export default function _Collection(props: { data: ArweaveCollectionProps }) {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    function getBookmarkToggle(txId: string) {
        return (
            <S.BookmarkToggle>
                <IconButton
                    src={ASSETS.bookmark} 
                    handlePress={() => {arProvider.toggleUserBookmark!(txId)}}
                />
            </S.BookmarkToggle>
        )
    }

    React.useEffect(() => {
        (async function () {
            setData((await arProvider.getAllArtifactsByPool(props.data.id)).map((element: any) => {
                console.log(element.node.id)
                if (!getTagValue(element.node.tags, "Uploader-Tx-Id")) {
                    return {
                        title: getTagValue(element.node.tags, "Artefact-Name"), 
                        dateCreated: formatDate(getTagValue(element.node.tags, "Created-At"), "epoch"),
                        bookmark: getBookmarkToggle(element.node.id)
                    }
                }
                else {
                    return null;
                }
            }).filter((element: any) => element !== null));
        })();
    }, [arProvider.walletAddress])
    
    return data ? (
        <S.Wrapper>
            <CollectionHeader
                id={props.data.id}
                image={getTxEndpoint(props.data.state.image)}
                title={props.data.state.title}
                description={props.data.state.description}
                dateCreated={formatDate(props.data.ts, "iso")}
                count={data ? data.length : 0}
                totalContributions={arProvider.getARAmount(props.data.state.totalContributions)}
            />
            <CollectionDetail data={data}/>
        </S.Wrapper>
    ) : <Loader />
}
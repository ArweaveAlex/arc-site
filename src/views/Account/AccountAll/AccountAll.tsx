import React from "react";

import { Table } from "@/components/organisms/Table";

// import { getViewblockEndpoint } from "@/endpoints";
import { LANGUAGE } from "@/language"
import * as S from "./styles";

import { useARProvder } from "@/providers/ARProvider";
import { formatDate, getTagValue } from "@/util";

export default function AccountAll() {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    // function getViewblockLink(uploaderTxId: string | null, label: string | null) {
    //     if (!uploaderTxId || !label) {
    //         return <a target="_blank" href={"#"}></a>
    //     }
    //     return <a target="_blank" href={getViewblockEndpoint(uploaderTxId)}>{label}</a>
    // }

    React.useEffect(() => {
        if (arProvider.walletAddress) {
            (async function () {
                setData((await arProvider.getUserArtifacts(arProvider.walletAddress!)).map((element: any) => {
                    return {
                        title: getTagValue(element.node.tags, "Artifact-Name"),
                        dateCreated: formatDate(getTagValue(element.node.tags, "Created-At"), "epoch")
                    }
                }));
            })();
        }
    }, [arProvider.walletAddress])

    function getData() {
        if (data && data.length > 0) {
            return (
                <S.Wrapper>
                    <Table
                        title={LANGUAGE.allArtifacts}
                        header={{ title: { width: "77.5%" }, dateCreated: { width: "22.5%" } }}
                        data={data}
                        recordsPerPage={50}
                    />
                </S.Wrapper>
            )
        }
        else {
            return <p>{LANGUAGE.noArtifacts}</p>
        }
    }

    return data ? (
        <>
            {getData()}
        </>

    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}
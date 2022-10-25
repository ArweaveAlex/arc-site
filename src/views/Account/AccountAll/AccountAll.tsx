import React from "react";

import { ArtifactTable } from "@/global/ArtifactTable";

import { LANGUAGE } from "@/language"
import * as S from "./styles";

import { useARProvder } from "@/providers/ARProvider";

export default function AccountAll() {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        (async function () {
            if (arProvider.walletAddress) {
                setData((await arProvider.getUserArtifacts(arProvider.walletAddress)));
            }
        })();
    }, [arProvider.walletAddress])

    function getData() {
        if (data && data.length > 0) {
            return (
                <S.Wrapper>
                    <ArtifactTable data={data} showBookmarks={true} />
                </S.Wrapper>
            )
        }
        else {
            return <p>{LANGUAGE.noArtifacts}</p>
        }
    }

    return data ? (
        <>{getData()}</>

    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}
import React from "react";

import { useARProvder } from "providers/ARProvider";

import { ArtifactTable } from "global/ArtifactTable";

import { LANGUAGE } from "language";
import * as S from "./styles";
import { ArtifactResponseType } from "types";

export default function AccountBookmarks() {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<ArtifactResponseType>({ cursor: null, contracts: [], count: 0 });
    const [state, setState] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {
            if (arProvider.walletAddress) {
                setData((await arProvider.getUserBookmarkArtifacts(data.cursor ? data.cursor: null)));
            }
        })();
    }, [arProvider.walletAddress, state])

    function handleUpdateFetch() {
        setState(!state);
    }

    function getData() {
        console.log(data);
        if (data && data.contracts.length > 0) {
            return (
                <S.Wrapper>
                    <ArtifactTable 
                        data={data} 
                        showBookmarks={true}
                        handleUpdateFetch={handleUpdateFetch}
                    />
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
import React from "react";

import { useARProvder } from "@/providers/ARProvider";

import { ArtifactTable } from "@/global/ArtifactTable";

import { ArtifactQueryType } from "@/types";
import { LANGUAGE } from "@/language";
import * as S from "./styles";

export default function AccountBookmarks() {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<any>(null);
    const [state, setState] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {
            const bookmarksIds = await arProvider.getBookmarksIds();

            if (arProvider.walletAddress) {
                // setData((await arProvider.getUserArtifacts(arProvider.walletAddress)).filter((element: ArtifactQueryType) => 
                //     bookmarksIds.includes(element.node.id)));
                setData((await arProvider.getUserArtifacts(arProvider.walletAddress)));
            }
        })();
    }, [arProvider.walletAddress])

    function handleUpdateFetch() {
        setState(!state);
    }

    function getData() {
        if (data && data.length > 0) {
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
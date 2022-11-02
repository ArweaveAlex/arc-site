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
        /*  ESLint used to avoid warning with data.cursor not being used in dependency array
            By adding data.cursor to dependency array this effect will continue to run
            getUserBookmarkArtifacts and return each subsequent query set */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arProvider.walletAddress, state])

    function handleUpdateFetch() {
        setState(!state);
    }

    function getData() {
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
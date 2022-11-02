import React from "react";

import { useARProvder } from "providers/ARProvider";

import { ArtifactTable } from "global/ArtifactTable";

import { LANGUAGE } from "language"
import * as S from "./styles";
import { ArtifactResponseType } from "types";

export default function AccountAll() {
    const arProvider = useARProvder();

    const [data, setData] = React.useState<ArtifactResponseType>({ cursor: null, contracts: [], count: null });
    const [state, setState] = React.useState<boolean>(false);

    React.useEffect(() => {
        (async function () {
            if (arProvider.walletAddress) {
                setData((await arProvider.getUserArtifacts(arProvider.walletAddress, data.cursor ? data.cursor : null)));
            }
        })();
        /*  ESLint used to avoid warning with data.cursor not being used in dependency array
            By adding data.cursor to dependency array this effect will continue to run
            getUserArtifacts and return each subsequent query set */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arProvider.walletAddress, state])

    function handleUpdateFetch() {
        setState(!state);
    }

    function checkState() {
        return data && (data.count !== null);
    }

    console.log(data);

    function getData() {
        if (data.contracts.length > 0) {
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

    return checkState() ? (
        <>{getData()}</>
    ) : <p>{LANGUAGE.loading}&nbsp;...</p>
}
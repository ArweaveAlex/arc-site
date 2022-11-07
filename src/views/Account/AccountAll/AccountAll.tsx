import React from "react";

import { useARProvder } from "providers/ARProvider";

import { ArtifactTable } from "global/ArtifactTable";

import { LANGUAGE } from "language"
import * as S from "./styles";
import { ArtifactResponseType } from "types";

export default function AccountAll() {
    const arProvider = useARProvder();

    const [cursor, setCursor] = React.useState<string | null>(null);
    const [data, setData] = React.useState<ArtifactResponseType>({ 
        nextCursor: null, 
        previousCursor: null, 
        contracts: [], 
        count: null 
    });

    React.useEffect(() => {
        (async function () {
            if (arProvider.walletAddress) {
                setData((await arProvider.getUserArtifacts(arProvider.walletAddress, cursor)));
            }
        })();
        /*  ESLint used to avoid warning with data.nextCursor not being used in dependency array
            By adding data.nextCursor to dependency array this effect will continue to run
            getUserArtifacts and return each subsequent query set */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arProvider.walletAddress, cursor])

    function checkState() {
        return data && (data.count !== null);
    }

    function getData() {
        if (data.contracts.length > 0) {
            return (
                <S.Wrapper>
                    <ArtifactTable 
                        data={data} 
                        showBookmarks={true}
                        handleUpdateFetch={(cursor: string | null) => setCursor(cursor)}
                        cursors={{
                            next: data.nextCursor,
                            previous: data.previousCursor
                        }}
                        owner={arProvider.walletAddress}
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
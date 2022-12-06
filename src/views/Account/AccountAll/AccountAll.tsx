import React from "react";
import { useDispatch } from "react-redux";

import { useArweaveProvider } from "providers/ArweaveProvider";
import { getArtifactsByUser } from "gql/artifacts";

import { ArtifactTable } from "global/ArtifactTable";

import { clearCursors } from "redux/cursors/actions";
import { ArtifactResponseType } from "types";
import { LANGUAGE } from "language";
import { REDUX_CURSORS } from "redux-config";
import * as S from "./styles";

export default function AccountAll() {
    const dispatch = useDispatch();
    const arProvider = useArweaveProvider();

    const [cursor, setCursor] = React.useState<string | null>(null);
    const [data, setData] = React.useState<ArtifactResponseType | null>(null);
    
    React.useEffect(() => {
        dispatch(clearCursors());
    }, [dispatch])

    React.useEffect(() => {
        (async function () {
            if (arProvider.walletAddress) {
                setData(await getArtifactsByUser({
                    poolIds: null,
                    owner: arProvider.walletAddress,
                    uploader: null,
                    cursor: cursor,
                    reduxCursor: REDUX_CURSORS.accountAll
                }));
            }
        })();
        /*  ESLint used to avoid warning with data.nextCursor not being used in dependency array
            By adding data.nextCursor to dependency array this effect will continue to run
            getArtifactsByUser and return each subsequent query set */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arProvider.walletAddress, cursor])

    function checkState() {
        return data;
    }

    function getData() {
        if (data && data.contracts.length > 0) {
            return (
                <S.Wrapper>
                    <ArtifactTable
                        data={data}
                        showBookmarks={true}
                        showPoolsId={true}
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

    return checkState() ? <>{getData()}</> : <p>{LANGUAGE.loading}&nbsp;...</p>
}
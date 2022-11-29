import React from "react";
import { useParams } from "react-router-dom";

import { getArtifactsByUser } from "gql/artifacts";

import { ArtifactTable } from "global/ArtifactTable";

import { ArtifactResponseType } from "types";
import { LANGUAGE } from "language";
import * as S from "./styles";

export default function LibraryAll() {
    const { id } = useParams();

    const [cursor, setCursor] = React.useState<string | null>(null);
    const [data, setData] = React.useState<ArtifactResponseType | null>(null);

    React.useEffect(() => {
        (async function () {
            if (id) {
                setData(await getArtifactsByUser(id, cursor));
            }
        })();
        /*  ESLint used to avoid warning with data.nextCursor not being used in dependency array
            By adding data.nextCursor to dependency array this effect will continue to run
            getArtifactsByUser and return each subsequent query set */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, cursor])

    function checkState() {
        return data;
    }

    function getData() {
        if (data && data.contracts.length > 0 && id) {
            return (
                <S.Wrapper>
                    <ArtifactTable 
                        data={data} 
                        showBookmarks={false}
                        showCollectionId={true}
                        handleUpdateFetch={(cursor: string | null) => setCursor(cursor)}
                        cursors={{
                            next: data.nextCursor,
                            previous: data.previousCursor
                        }}
                        owner={id}
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
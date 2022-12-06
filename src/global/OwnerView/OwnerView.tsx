import React from "react";
import { useDispatch } from "react-redux";

import { ArtifactTable } from "global/ArtifactTable";

import { clearCursors } from "redux/cursors/actions";
import { ArtifactResponseType } from "types";

import { LANGUAGE } from "language";
import { IProps } from "./types";
import * as S from "./styles";

export default function OwnerView(props: IProps) {
    const dispatch = useDispatch();

    const [cursor, setCursor] = React.useState<string | null>(null);
    const [data, setData] = React.useState<ArtifactResponseType | null>(null);

    React.useEffect(() => {
        dispatch(clearCursors());
    }, [dispatch])

    React.useEffect(() => {
        (async function () {
            if (props.owner) {
                setData(await props.fetch({
                    poolIds: null,
                    owner: props.owner,
                    uploader: null,
                    cursor: cursor,
                    reduxCursor: props.reduxCursor
                }));
            }
        })();
        
    }, [props, cursor])

    function checkState() {
        return data;
    }

    function getData() {
        if (data && data.contracts.length > 0) {
            return (
                <S.Wrapper>
                    <ArtifactTable
                        data={data}
                        showBookmarks={props.showBookmarks}
                        showPoolIds={props.showPoolIds}
                        handleUpdateFetch={(cursor: string | null) => setCursor(cursor)}
                        cursors={{
                            next: data.nextCursor,
                            previous: data.previousCursor
                        }}
                        owner={props.owner}
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
import React from "react";
import { useDispatch } from "react-redux";

import { ArtifactTable } from "global/ArtifactTable";
import { Loader } from "components/atoms/Loader";

import { clearCursors } from "redux/cursors/actions";
import { ArtifactResponseType } from "config/types";

import { LANGUAGE } from "config/language";
import { IProps } from "./types";
import * as S from "./styles";

export default function OwnerView(props: IProps) {
    const dispatch = useDispatch();

    const [data, setData] = React.useState<ArtifactResponseType | null>(null);
    const [cursor, setCursor] = React.useState<string | null>(null);

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

    function getData() {
        if (data && data.contracts.length > 0) {
            return (
                <S.Wrapper>
                    <ArtifactTable
                        id={{
                            value: props.owner,
                            type: "ownerId"
                        }}
                        data={data}
                        showBookmarks={props.showBookmarks}
                        showPoolIds={props.showPoolIds}
                        handleCursorFetch={(cursor: string | null) => setCursor(cursor)}
                        cursors={{
                            next: data.nextCursor,
                            previous: data.previousCursor
                        }}
                        owner={props.owner}
                        cursorObject={props.cursorObject}
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
    ) : (
        <S.LoadingContainer>
            <Loader sm />
        </S.LoadingContainer>
    )
}
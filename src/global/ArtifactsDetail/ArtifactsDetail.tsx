import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "redux/store";
import { getArtifactsByIds } from "gql/artifacts";

import { ArtifactsTable } from "global/ArtifactsDetail/ArtifactsTable";

import { clearCursors } from "redux/cursors/actions";
import { ArtifactResponseType } from "helpers/types";
import { IProps } from "./types";

export default function ArtifactsDetail(props: IProps) {
    const dispatch = useDispatch();

    const searchIdsReducer = useSelector((state: RootState) => state.searchIdsReducer);
    const searchTermReducer = useSelector((state: RootState) => state.searchTermReducer);

    const [detailData, setDetailData] = React.useState<ArtifactResponseType | null>(null);
    const [detailDataUpdated, setDetailDataUpdated] = React.useState<boolean>(false);

    const [cursor, setCursor] = React.useState<string | null>(null);
    const [searchRequested, setSearchRequested] = React.useState<boolean | null>(
        (searchTermReducer[props.cursorObject.value].value !== "" &&
            searchTermReducer[props.cursorObject.value].id.value === props.id.value) ? true : null
    );

    React.useEffect(() => {
        dispatch(clearCursors());
    }, [dispatch])

    React.useEffect(() => {
        (async function () {
            setDetailDataUpdated(!detailDataUpdated);
            setDetailData(null);
            if (searchRequested && searchIdsReducer[props.cursorObject.value] &&
                searchIdsReducer[props.cursorObject.value].length > 0) {
                setDetailData((await getArtifactsByIds({
                    ids: null,
                    owner: null,
                    uploader: null,
                    cursor: cursor,
                    reduxCursor: props.cursorObject.value
                })));
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchRequested, searchIdsReducer, cursor])

    React.useEffect(() => {
        (async function () {
            setDetailDataUpdated(!detailDataUpdated);
            if (props.id.value && (searchRequested === null)) {
                setDetailData(null);
                setDetailData((await props.defaultFetch.fn({
                    ids: props.defaultFetch.ids,
                    owner: props.owner,
                    uploader: props.uploader,
                    cursor: cursor,
                    reduxCursor: props.cursorObject.value
                })));
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchRequested, props.id.value, props.uploader, props.cursorObject.value, cursor])

    React.useEffect(() => {
        if (searchRequested && searchIdsReducer[props.cursorObject.value] &&
            searchIdsReducer[props.cursorObject.value].length <= 0) {
            setDetailData({
                nextCursor: null,
                previousCursor: null,
                contracts: []
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailDataUpdated])

    return (
        <ArtifactsTable
            id={props.id}
            indexIds={props.indexIds}
            data={detailData}
            showCollections={props.showCollections}
            showPoolIds={props.showPoolIds}
            handleCursorFetch={(cursor: string | null) => setCursor(cursor)}
            cursors={{
                next: detailData?.nextCursor ?? null,
                previous: detailData?.previousCursor ?? null
            }}
            owner={props.owner}
            cursorObject={props.cursorObject}
            setSearchRequested={(searchRequested: boolean) => setSearchRequested(searchRequested)}
        />
    )
}
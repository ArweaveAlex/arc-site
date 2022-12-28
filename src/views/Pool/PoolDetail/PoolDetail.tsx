import { ArtifactTable } from "global/ArtifactTable";

import { IProps } from "./types";

export default function PoolDetail(props: IProps) {
    return (
        <ArtifactTable
            id={props.id}
            data={props.data} 
            showBookmarks={false}
            showPoolIds={false}
            handleCursorFetch={(cursor: string | null) => props.handleCursorFetch(cursor)}
            cursors={props.cursors}
            owner={null}
            cursorObject={props.cursorObject}
        />
    )
}
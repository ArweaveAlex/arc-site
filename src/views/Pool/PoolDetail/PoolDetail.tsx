import { ArtifactTable } from "global/ArtifactTable";

import { IProps } from "./types";

export default function PoolDetail(props: IProps) {
    return (
        <ArtifactTable 
            data={props.data} 
            showBookmarks={false}
            showPoolIds={false}
            handleCursorFetch={(cursor: string | null) => props.handleCursorFetch(cursor)}
            handleSearchFetch={(term: string | null) => props.handleSearchFetch(term)}
            cursors={props.cursors}
            owner={null}
        />
    )
}
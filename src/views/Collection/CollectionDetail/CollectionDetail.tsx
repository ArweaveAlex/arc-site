import { ArtifactTable } from "global/ArtifactTable";

import { IProps } from "./types";

export default function CollectionDetail(props: IProps) {
    return (
        <ArtifactTable 
            data={props.data} 
            showBookmarks={false}
            handleUpdateFetch={(cursor: string | null) => props.handleUpdateFetch(cursor)}
            cursors={props.cursors}
            owner={null}
        />
    )
}
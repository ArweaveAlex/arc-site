import { ArtifactTable } from "@/global/ArtifactTable";

import { IProps } from "./types";

export default function CollectionDetail(props: IProps) {
    return (
        <ArtifactTable data={props.data} showBookmarks={false} />
    )
}
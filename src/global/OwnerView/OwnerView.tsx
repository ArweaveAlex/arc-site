import { ArtifactsDetail } from "global/ArtifactsDetail";

import { IProps } from "./types";

export default function OwnerView(props: IProps) {

    // TODO - initSearch all contributed pools

    return (
        <ArtifactsDetail
            id={{ value: props.owner, type: "ownerId" }}
            indexIds={null}
            cursorObject={props.cursorObject}
            defaultFetch={{
                fn: props.fetch,
                ids: null
            }}
            showCollections={props.showCollections}
            showPoolIds={props.showPoolIds}
            owner={props.owner}
            uploader={null}
        />
    )
}
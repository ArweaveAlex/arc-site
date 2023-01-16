import { ArtifactViewList } from "./ArtifactViewList";

import { IProps } from "./types";

export default function ArtifactList(props: IProps) {
    return (
        <ArtifactViewList 
            data={props.data}
            loading={props.loading}
            updateSequence={props.updateSequence}
        />
    )
}
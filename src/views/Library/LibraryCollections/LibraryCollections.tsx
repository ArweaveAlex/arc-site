import { useParams } from "react-router-dom";

import { OwnerArtifacts } from "global/Owner/OwnerArtifacts";

import { getArtifactsByCollections } from "gql/artifacts";
import { REDUX_TABLES } from "helpers/redux";
import { CursorEnum } from "helpers/types";

export default function LibraryCollection() {
    const { id } = useParams();

    return id ? (
        <OwnerArtifacts 
            owner={id}
            reduxCursor={REDUX_TABLES.libraryCollections}
            fetch={getArtifactsByCollections}
            showCollections={false}
            showPoolIds={false}
            showSearch={true}
            selectCallback={null}
            selectedCallbackIds={null}
            cursorObject={{
                key: CursorEnum.Search,
                value: REDUX_TABLES.libraryCollections
            }}
        />
    ) : null;
}
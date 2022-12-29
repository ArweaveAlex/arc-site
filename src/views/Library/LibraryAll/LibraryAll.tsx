import { useParams } from "react-router-dom";

import { OwnerView } from "global/OwnerView";

import { getArtifactsByUser } from "gql/artifacts";
import { REDUX_CURSORS } from "config/redux";

export default function LibraryAll() {
    const { id } = useParams();

    return id ? (
        <OwnerView 
            owner={id}
            reduxCursor={REDUX_CURSORS.libraryAll}
            fetch={getArtifactsByUser}
            showCollections={false}
            showPoolIds={true}
            cursorObject={{
                key: "search",
                value: REDUX_CURSORS.libraryAll
            }}
        />
    ) : null;
}
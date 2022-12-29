import { useParams } from "react-router-dom";

import { OwnerView } from "global/OwnerView";

import { getArtifactsByCollections } from "gql/artifacts";
import { REDUX_CURSORS } from "config/redux";
import { CursorEnum } from "config/types";

export default function LibraryCollection() {
    const { id } = useParams();

    return id ? (
        <OwnerView 
            owner={id}
            reduxCursor={REDUX_CURSORS.libraryCollections}
            fetch={getArtifactsByCollections}
            showCollections={false}
            showPoolIds={true}
            cursorObject={{
                key: CursorEnum.Search,
                value: REDUX_CURSORS.libraryCollections
            }}
        />
    ) : null;
}
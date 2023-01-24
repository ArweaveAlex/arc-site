import { useParams } from "react-router-dom";

import { OwnerView } from "global/OwnerView";

import { getArtifactsByCollections } from "helpers/gql/artifacts";
import { REDUX_TABLES } from "helpers/redux";
import { CursorEnum } from "helpers/types";

export default function LibraryCollection() {
    const { id } = useParams();

    return id ? (
        <OwnerView 
            owner={id}
            reduxCursor={REDUX_TABLES.libraryCollections}
            fetch={getArtifactsByCollections}
            showCollections={false}
            showPoolIds={true}
            cursorObject={{
                key: CursorEnum.Search,
                value: REDUX_TABLES.libraryCollections
            }}
        />
    ) : null;
}
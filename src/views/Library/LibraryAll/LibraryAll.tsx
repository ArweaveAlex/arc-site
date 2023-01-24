import { useParams } from "react-router-dom";

import { OwnerView } from "global/OwnerView";

import { getArtifactsByUser } from "gql/artifacts";
import { REDUX_TABLES } from "helpers/redux";
import { CursorEnum } from "helpers/types";

export default function LibraryAll() {
    const { id } = useParams();

    return id ? (
        <OwnerView 
            owner={id}
            reduxCursor={REDUX_TABLES.libraryAll}
            fetch={getArtifactsByUser}
            showCollections={false}
            showPoolIds={true}
            cursorObject={{
                key: CursorEnum.Search,
                value: REDUX_TABLES.libraryAll
            }}
        />
    ) : null;
}
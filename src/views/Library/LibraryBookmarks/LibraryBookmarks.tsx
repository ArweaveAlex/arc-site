import { useParams } from "react-router-dom";

import { OwnerView } from "global/OwnerView";

import { getArtifactsByBookmarks } from "gql/artifacts";
import { REDUX_CURSORS } from "redux-config";

export default function AccountAll() {
    const { id } = useParams();

    return id ? (
        <OwnerView 
            owner={id}
            reduxCursor={REDUX_CURSORS.libraryBookmarks}
            fetch={getArtifactsByBookmarks}
            showBookmarks={false}
            showPoolIds={true}
        />
    ) : null;
}
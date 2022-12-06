import { useParams } from "react-router-dom";

import { OwnerView } from "global/OwnerView";

import { getArtifactsByUser } from "gql/artifacts";
import { REDUX_CURSORS } from "redux-config";

export default function AccountAll() {
    const { id } = useParams();

    return id ? (
        <OwnerView 
            owner={id}
            reduxCursor={REDUX_CURSORS.libraryAll}
            fetch={getArtifactsByUser}
            showBookmarks={false}
            showPoolIds={true}
        />
    ) : null;
}
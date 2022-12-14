import { OwnerView } from "global/OwnerView";

import { useArweaveProvider } from "providers/ArweaveProvider";
import { getArtifactsByUser } from "gql/artifacts";
import { REDUX_CURSORS } from "redux-config";

export default function AccountAll() {
    const arProvider = useArweaveProvider();

    return arProvider.walletAddress ? (
        <OwnerView 
            owner={arProvider.walletAddress}
            reduxCursor={REDUX_CURSORS.accountAll}
            fetch={getArtifactsByUser}
            showBookmarks={true}
            showPoolIds={true}
        />
    ) : null;
}
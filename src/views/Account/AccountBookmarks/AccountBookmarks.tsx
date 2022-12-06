import { OwnerView } from "global/OwnerView";

import { useArweaveProvider } from "providers/ArweaveProvider";
import { getArtifactsByBookmarks } from "gql/artifacts";
import { REDUX_CURSORS } from "redux-config";

export default function AccountAll() {
    const arProvider = useArweaveProvider();

    return arProvider.walletAddress ? (
        <OwnerView 
            owner={arProvider.walletAddress}
            reduxCursor={REDUX_CURSORS.accountBookmarks}
            fetch={getArtifactsByBookmarks}
            showBookmarks={true}
            showPoolIds={true}
        />
    ) : null;
}
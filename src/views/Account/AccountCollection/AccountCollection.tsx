import { OwnerView } from "global/OwnerView";

import { useArweaveProvider } from "providers/ArweaveProvider";
import { getArtifactsByCollections } from "gql/artifacts";
import { REDUX_CURSORS } from "config/redux";

export default function AccountCollection() {
    const arProvider = useArweaveProvider();

    return arProvider.walletAddress ? (
        <OwnerView 
            owner={arProvider.walletAddress}
            reduxCursor={REDUX_CURSORS.accountCollections}
            fetch={getArtifactsByCollections}
            showCollections={true}
            showPoolIds={true}
            cursorObject={{
                key: "search",
                value: REDUX_CURSORS.accountCollections
            }}
        />
    ) : null;
}
import { OwnerView } from "global/OwnerView";

import { useArweaveProvider } from "providers/ArweaveProvider";
import { getArtifactsByUser } from "gql/artifacts";
import { REDUX_CURSORS } from "config/redux";

export default function AccountAll() {
    const arProvider = useArweaveProvider();

    return arProvider.walletAddress ? (
        <OwnerView
            owner={arProvider.walletAddress}
            reduxCursor={REDUX_CURSORS.accountAll}
            fetch={getArtifactsByUser}
            showCollections={true}
            showPoolIds={true}
            cursorObject={{
                key: "search",
                value: REDUX_CURSORS.accountAll
            }}
        />
    ) : null;
}
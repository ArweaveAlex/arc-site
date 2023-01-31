import { OwnerArtifacts } from "global/Owner/OwnerArtifacts";

import { useArweaveProvider } from "providers/ArweaveProvider";
import { getArtifactsByCollections } from "gql/artifacts";
import { REDUX_TABLES } from "helpers/redux";
import { CursorEnum } from "helpers/types";

export default function AccountCollection() {
    const arProvider = useArweaveProvider();

    return arProvider.walletAddress ? (
        <OwnerArtifacts 
            owner={arProvider.walletAddress}
            reduxCursor={REDUX_TABLES.accountCollections}
            fetch={getArtifactsByCollections}
            showCollections={true}
            showPoolIds={true}
            showSearch={false}
			selectCallback={null}
			selectedCallbackIds={null}
            cursorObject={{
                key: CursorEnum.Search,
                value: REDUX_TABLES.accountCollections
            }}
        />
    ) : null;
}
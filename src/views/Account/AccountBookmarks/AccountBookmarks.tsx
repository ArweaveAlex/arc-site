import { OwnerArtifacts } from "global/Owner/OwnerArtifacts";

import { useArweaveProvider } from "providers/ArweaveProvider";
import { getArtifactsByBookmarks } from "gql/artifacts";
import { REDUX_TABLES } from "helpers/redux";
import { CursorEnum } from "helpers/types";

export default function AccountBookmark() {
  const arProvider = useArweaveProvider();

  return arProvider.walletAddress ? (
    <OwnerArtifacts
      owner={arProvider.walletAddress}
      reduxCursor={REDUX_TABLES.accountBookmarks}
      fetch={getArtifactsByBookmarks}
      showActions={true}
      showPoolIds={true}
      showSearch={false}
      bookmarksDisabled={false}
      selectCallback={null}
      selectedCallbackIds={null}
      cursorObject={{
        key: CursorEnum.Search,
        value: REDUX_TABLES.accountBookmarks,
      }}
      usePreviewModal={true}
    />
  ) : null;
}

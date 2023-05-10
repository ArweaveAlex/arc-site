import { CursorEnum } from 'arcframework';

import { OwnerArtifacts } from 'global/Owner/OwnerArtifacts';
import { getArtifactsByBookmarks } from 'gql';
import { REDUX_TABLES } from 'helpers/redux';
import { useArweaveProvider } from 'providers/ArweaveProvider';

export default function AccountBookmarks() {
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
			disabledSelectedCallbackIds={null}
			cursorObject={{
				key: CursorEnum.Search,
				value: REDUX_TABLES.accountBookmarks,
			}}
			usePreviewModal={true}
		/>
	) : null;
}

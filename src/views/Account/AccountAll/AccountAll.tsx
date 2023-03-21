import { OwnerArtifacts } from 'global/Owner/OwnerArtifacts';
import { getArtifactsByUser } from 'gql/artifacts';
import { REDUX_TABLES } from 'helpers/redux';
import { CursorEnum } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';

export default function AccountAll() {
	const arProvider = useArweaveProvider();

	return arProvider.walletAddress ? (
		<OwnerArtifacts
			owner={arProvider.walletAddress}
			reduxCursor={REDUX_TABLES.accountAll}
			fetch={getArtifactsByUser}
			showActions={true}
			showPoolIds={true}
			showSearch={false}
			selectCallback={null}
			selectedCallbackIds={null}
			bookmarksDisabled={false}
			cursorObject={{
				key: CursorEnum.Search,
				value: REDUX_TABLES.accountAll,
			}}
			usePreviewModal={true}
		/>
	) : null;
}

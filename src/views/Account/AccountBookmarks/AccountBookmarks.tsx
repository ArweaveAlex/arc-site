import { OwnerArtifacts } from 'components/organisms/Owner/OwnerArtifacts';
import { getArtifactIdsByBookmarks } from 'gql';
import { REDUX_TABLES } from 'helpers/redux';
import { CursorEnum } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';

export default function AccountBookmarks() {
	const arProvider = useArweaveProvider();

	return arProvider.walletAddress ? (
		<OwnerArtifacts
			owner={arProvider.walletAddress}
			reduxCursor={REDUX_TABLES.accountBookmarks}
			fetch={getArtifactIdsByBookmarks}
			showActions={true}
			showPoolIds={true}
			showSearch={false}
			ownerActionDisabled={false}
			selectCallback={null}
			selectedCallbackIds={null}
			disabledSelectedCallbackIds={null}
			disabledContractSrc={false}
			cursorObject={{
				key: CursorEnum.IdGQL,
				value: REDUX_TABLES.accountBookmarks,
			}}
			usePreviewModal={true}
			useIdPagination={true}
		/>
	) : null;
}

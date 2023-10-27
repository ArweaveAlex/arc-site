import { OwnerArtifacts } from 'components/organisms/Owner/OwnerArtifacts';
import { getArtifactIdsByUser } from 'gql';
import { REDUX_TABLES } from 'helpers/redux';
import { CursorEnum } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';

export default function AccountAll() {
	const arProvider = useArweaveProvider();

	return arProvider.walletAddress ? (
		<OwnerArtifacts
			owner={arProvider.walletAddress}
			reduxCursor={REDUX_TABLES.accountAll}
			fetch={getArtifactIdsByUser}
			showActions={true}
			showPoolIds={true}
			showSearch={false}
			selectCallback={null}
			selectedCallbackIds={null}
			disabledSelectedCallbackIds={null}
			ownerActionDisabled={false}
			disabledContractSrc={false}
			cursorObject={{
				key: CursorEnum.IdGQL,
				value: REDUX_TABLES.accountAll,
			}}
			usePreviewModal={true}
			useIdPagination={true}
		/>
	) : null;
}

import { CursorEnum } from 'arcframework';

import { OwnerArtifacts } from 'global/Owner/OwnerArtifacts';
import { getArtifactsByUser } from 'gql';
import { REDUX_TABLES } from 'helpers/redux';
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
			disabledSelectedCallbackIds={null}
			ownerActionDisabled={false}
			disabledContractSrc={false}
			cursorObject={{
				key: CursorEnum.Search,
				value: REDUX_TABLES.accountAll,
			}}
			usePreviewModal={true}
		/>
	) : null;
}

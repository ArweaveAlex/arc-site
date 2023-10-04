import { useParams } from 'react-router-dom';

import { CursorEnum } from 'arcframework';

import { OwnerArtifacts } from 'components/organisms/Owner/OwnerArtifacts';
import { getArtifactIdsByUser } from 'gql';
import { REDUX_TABLES } from 'helpers/redux';

export default function LibraryAll() {
	const { id } = useParams();

	return id ? (
		<OwnerArtifacts
			owner={id}
			reduxCursor={REDUX_TABLES.libraryAll}
			fetch={getArtifactIdsByUser}
			showActions={true}
			showPoolIds={true}
			showSearch={false}
			ownerActionDisabled={true}
			selectCallback={null}
			selectedCallbackIds={null}
			disabledContractSrc={false}
			disabledSelectedCallbackIds={null}
			cursorObject={{
				key: CursorEnum.IdGQL,
				value: REDUX_TABLES.libraryAll,
			}}
			usePreviewModal={true}
			useIdPagination={true}
		/>
	) : null;
}

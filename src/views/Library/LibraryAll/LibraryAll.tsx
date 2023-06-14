import { useParams } from 'react-router-dom';

import { CursorEnum } from 'arcframework';

import { OwnerArtifacts } from 'global/Owner/OwnerArtifacts';
import { getArtifactsByUser } from 'gql';
import { REDUX_TABLES } from 'helpers/redux';

export default function LibraryAll() {
	const { id } = useParams();

	return id ? (
		<OwnerArtifacts
			owner={id}
			reduxCursor={REDUX_TABLES.libraryAll}
			fetch={getArtifactsByUser}
			showActions={true}
			showPoolIds={true}
			showSearch={false}
			ownerActionDisabled={true}
			selectCallback={null}
			selectedCallbackIds={null}
			disabledSelectedCallbackIds={null}
			cursorObject={{
				key: CursorEnum.Search,
				value: REDUX_TABLES.libraryAll,
			}}
			usePreviewModal={true}
		/>
	) : null;
}

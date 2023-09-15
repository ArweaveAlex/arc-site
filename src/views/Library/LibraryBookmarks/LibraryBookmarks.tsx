import { useParams } from 'react-router-dom';

import { CursorEnum } from 'arcframework';

import { OwnerArtifacts } from 'global/Owner/OwnerArtifacts';
import { getArtifactsByBookmarks } from 'gql';
import { REDUX_TABLES } from 'helpers/redux';

export default function LibraryBookmark() {
	const { id } = useParams();

	return id ? (
		<OwnerArtifacts
			owner={id}
			reduxCursor={REDUX_TABLES.libraryBookmarks}
			fetch={getArtifactsByBookmarks}
			showActions={true}
			showPoolIds={false}
			showSearch={false}
			ownerActionDisabled={true}
			selectCallback={null}
			selectedCallbackIds={null}
			disabledContractSrc={false}
			disabledSelectedCallbackIds={null}
			cursorObject={{
				key: CursorEnum.Search,
				value: REDUX_TABLES.libraryBookmarks,
			}}
			usePreviewModal={true}
		/>
	) : null;
}

import { useParams } from 'react-router-dom';

import { OwnerArtifacts } from 'global/Owner/OwnerArtifacts';
import { getArtifactsByBookmarks } from 'gql/artifacts';
import { REDUX_TABLES } from 'helpers/redux';
import { CursorEnum } from 'helpers/types';

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
			bookmarksDisabled={true}
			selectCallback={null}
			selectedCallbackIds={null}
			cursorObject={{
				key: CursorEnum.Search,
				value: REDUX_TABLES.libraryBookmarks,
			}}
			usePreviewModal={true}
		/>
	) : null;
}

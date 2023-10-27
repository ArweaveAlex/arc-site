import { useParams } from 'react-router-dom';

import { CursorEnum } from 'arcframework';

import { OwnerArtifacts } from 'components/organisms/Owner/OwnerArtifacts';
import { getArtifactIdsByBookmarks } from 'gql';
import { REDUX_TABLES } from 'helpers/redux';

export default function LibraryBookmark() {
	const { id } = useParams();

	return id ? (
		<OwnerArtifacts
			owner={id}
			reduxCursor={REDUX_TABLES.libraryBookmarks}
			fetch={getArtifactIdsByBookmarks}
			showActions={true}
			showPoolIds={false}
			showSearch={false}
			ownerActionDisabled={true}
			selectCallback={null}
			selectedCallbackIds={null}
			disabledContractSrc={false}
			disabledSelectedCallbackIds={null}
			cursorObject={{
				key: CursorEnum.IdGQL,
				value: REDUX_TABLES.libraryBookmarks,
			}}
			usePreviewModal={true}
			useIdPagination={true}
		/>
	) : null;
}

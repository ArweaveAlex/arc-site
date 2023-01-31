import { useParams } from "react-router-dom";

import { OwnerArtifacts } from "global/Owner/OwnerArtifacts";

import { getArtifactsByUser } from "gql/artifacts";
import { REDUX_TABLES } from "helpers/redux";
import { CursorEnum } from "helpers/types";

export default function LibraryAll() {
	const { id } = useParams();

	return id ? (
		<OwnerArtifacts
			owner={id}
			reduxCursor={REDUX_TABLES.libraryAll}
			fetch={getArtifactsByUser}
			showCollections={false}
			showPoolIds={true}
			showSearch={true}
			selectCallback={null}
			selectedCallbackIds={null}
			cursorObject={{
				key: CursorEnum.Search,
				value: REDUX_TABLES.libraryAll,
			}}
		/>
	) : null;
}

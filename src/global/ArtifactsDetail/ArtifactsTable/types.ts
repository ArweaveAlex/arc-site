import { ArtifactResponseType, CursorType, CursorObjectType, TableIdType } from "helpers/types";

export interface IProps {
	id: TableIdType;
	indexIds: string[] | null;
	data: ArtifactResponseType;
	showCollections: boolean;
	showPoolIds: boolean;
	showSearch: boolean;
	handleCursorFetch: (cursor: string | null) => void;
	cursors: CursorType;
	owner: string | null;
	cursorObject: CursorObjectType;
	setSearchRequested: (searchRequested: boolean) => void;
	showNoResults: boolean;
	selectCallback: ((id: string) => void) | null;
	selectedCallbackIds: string[] | null;
}

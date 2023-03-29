import { ArtifactResponseType, CursorObjectType, CursorType, TableIdType } from 'arcframework';

export interface IProps {
	id: TableIdType;
	indexIds: string[] | null;
	data: ArtifactResponseType;
	showActions: boolean;
	showPoolIds: boolean;
	showSearch: boolean;
	handleCursorFetch: ((cursor: string | null) => void) | null;
	cursors: CursorType;
	owner: string | null;
	cursorObject: CursorObjectType;
	setSearchRequested: (searchRequested: boolean) => void;
	showNoResults: boolean;
	bookmarksDisabled: boolean;
	selectCallback: ((id: string) => void) | null;
	selectedCallbackIds: string[] | null;
	disabledSelectedCallbackIds: string[] | null;
	usePreviewModal: boolean;
	action?: React.ReactNode;
}

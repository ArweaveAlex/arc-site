import { ArtifactResponseType, CursorObjectType, CursorType, TableIdType } from 'arcframework';

export interface IProps {
	id: TableIdType;
	data: ArtifactResponseType;
	showActions: boolean;
	showPoolIds: boolean;
	showSearch: boolean;
	handleCursorFetch: ((cursor: string | null) => void) | null;
	cursors: CursorType;
	owner: string | null;
	cursorObject: CursorObjectType;
	showNoResults: boolean;
	ownerActionDisabled: boolean;
	selectCallback: ((id: string) => void) | null;
	selectedCallbackIds: string[] | null;
	disabledSelectedCallbackIds: string[] | null;
	disabledContractSrc: boolean;
	usePreviewModal: boolean;
	action?: React.ReactNode;
}

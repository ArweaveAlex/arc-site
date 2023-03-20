import { ArtifactArgsType, ArtifactResponseType, CursorObjectType } from 'helpers/types';

export interface IProps {
	owner: string | null;
	reduxCursor: string;
	fetch: (args: ArtifactArgsType) => Promise<ArtifactResponseType>;
	showActions: boolean;
	showPoolIds: boolean;
	showSearch: boolean;
	bookmarksDisabled: boolean;
	cursorObject: CursorObjectType;
	selectCallback: ((id: string) => void) | null;
	selectedCallbackIds: string[] | null;
	disabledSelectedCallbackIds: string[] | null;
	usePreviewModal: boolean;
	action?: React.ReactNode;
}

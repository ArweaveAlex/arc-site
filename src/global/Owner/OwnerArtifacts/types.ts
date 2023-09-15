import { ArtifactArgsType, ArtifactResponseType, CursorObjectType } from 'arcframework';

export interface IProps {
	owner: string | null;
	ids?: string[];
	reduxCursor: string;
	fetch: (args: ArtifactArgsType) => Promise<ArtifactResponseType>;
	showActions: boolean;
	showPoolIds: boolean;
	showSearch: boolean;
	ownerActionDisabled: boolean;
	cursorObject: CursorObjectType;
	selectCallback: ((id: string) => void) | null;
	selectedCallbackIds: string[] | null;
	disabledSelectedCallbackIds: string[] | null;
	disabledContractSrc: boolean;
	usePreviewModal: boolean;
	action?: React.ReactNode;
}

import { AGQLResponseType, CursorObjectType, GQLArgsType, UserArtifactsArgsType } from 'helpers/types';

export interface IProps {
	owner: string | null;
	ids?: string[];
	reduxCursor: string;
	fetch: ((args: GQLArgsType) => Promise<AGQLResponseType>) | ((args: UserArtifactsArgsType) => Promise<string[]>);
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
	useIdPagination: boolean;
	action?: React.ReactNode;
}

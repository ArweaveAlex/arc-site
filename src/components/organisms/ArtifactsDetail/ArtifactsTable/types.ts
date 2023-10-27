import { CursorType, TableIdType } from 'arcframework';

import { AGQLResponseType, CursorObjectType } from 'helpers/types';

export interface IProps {
	id: TableIdType;
	data: AGQLResponseType;
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
	setFilteredArtifactTypes: (artifactTypes: string[]) => void;
	currentFilteredArtifactTypes: string[];
	filterDisabled: boolean;
	action?: React.ReactNode;
}

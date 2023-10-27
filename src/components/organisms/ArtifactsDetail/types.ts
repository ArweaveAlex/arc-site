import { TableIdType, UserArtifactsArgsType } from 'arcframework';

import { AGQLResponseType, CursorObjectType, GQLArgsType, GQLNodeResponseType } from 'helpers/types';

export interface IProps {
	id: TableIdType;
	fetchIds?: string[];
	cursorObject: CursorObjectType;
	defaultFetch: {
		ids: string[] | null;
		fn: ((args: GQLArgsType) => Promise<AGQLResponseType>) | ((args: UserArtifactsArgsType) => Promise<string[]>);
	};
	showActions: boolean;
	ownerActionDisabled: boolean;
	selectCallback: ((id: string) => void) | null;
	showPoolIds: boolean;
	showSearch: boolean;
	owner: string | null;
	uploaders: string[] | null;
	selectedCallbackIds: string[] | null;
	disabledSelectedCallbackIds: string[] | null;
	disabledContractSrc: boolean;
	usePreviewModal: boolean;
	action?: React.ReactNode;
	setCount?: (count: number) => void | null;
	useIdPagination: boolean;
	setArtifacts?: {
		fn: (artifacts: GQLNodeResponseType[]) => void;
		count: number;
	} | null;
}

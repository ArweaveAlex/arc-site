import {
	ArtifactArgsType,
	ArtifactResponseType,
	CursorObjectType,
	TableIdType,
	UserArtifactsArgsType,
} from 'arcframework';

export interface IProps {
	id: TableIdType;
	cursorObject: CursorObjectType;
	defaultFetch: {
		ids: string[] | null;
		fn:
			| ((args: ArtifactArgsType) => Promise<ArtifactResponseType>)
			| ((args: UserArtifactsArgsType) => Promise<string[]>);
	};
	showActions: boolean;
	ownerActionDisabled: boolean;
	selectCallback: ((id: string) => void) | null;
	showPoolIds: boolean;
	showSearch: boolean;
	owner: string | null;
	uploader: string | null;
	selectedCallbackIds: string[] | null;
	disabledSelectedCallbackIds: string[] | null;
	disabledContractSrc: boolean;
	usePreviewModal: boolean;
	action?: React.ReactNode;
	setCount?: (count: number) => void | null;
	useIdPagination: boolean;
}

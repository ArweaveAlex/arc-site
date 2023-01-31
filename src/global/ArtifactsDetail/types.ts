import { ArtifactResponseType, ArtifactArgsType, CursorObjectType, TableIdType } from "helpers/types";

export interface IProps {
	id: TableIdType;
	indexIds: string[] | null;
	cursorObject: CursorObjectType;
	defaultFetch: {
		ids: string[] | null;
		fn: (args: ArtifactArgsType) => Promise<ArtifactResponseType>;
	};
	showCollections: boolean;
	selectCallback: ((id: string) => void) | null;
	showPoolIds: boolean;
	showSearch: boolean;
	owner: string | null;
	uploader: string | null;
	selectedCallbackIds: string[] | null;
}

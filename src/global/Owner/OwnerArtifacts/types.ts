import { ArtifactArgsType, ArtifactResponseType, CursorObjectType } from "helpers/types";

export interface IProps {
	owner: string | null;
	reduxCursor: string;
	fetch: (args: ArtifactArgsType) => Promise<ArtifactResponseType>;
	showCollections: boolean;
	showPoolIds: boolean;
	cursorObject: CursorObjectType;
	selectCallback: ((id: string) => void) | null;
	selectedCallbackIds: string[] | null;
}

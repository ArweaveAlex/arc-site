import { ArtifactArgsType, ArtifactResponseType, CursorObjectType } from "config/types";

export interface IProps {
    owner: string | null;
    reduxCursor: string;
    fetch: (args: ArtifactArgsType) => Promise<ArtifactResponseType>;
    showCollections: boolean;
    showPoolIds: boolean;
    cursorObject: CursorObjectType;
}
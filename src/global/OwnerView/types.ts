import { ArtifactArgsType, ArtifactResponseType, CursorObjectType } from "types";

export interface IProps {
    owner: string | null;
    reduxCursor: string;
    fetch: (args: ArtifactArgsType) => Promise<ArtifactResponseType>;
    showBookmarks: boolean;
    showPoolIds: boolean;
    cursorObject: CursorObjectType;
}
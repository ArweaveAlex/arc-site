import { ArtifactResponseType, CursorType, CursorObjectType, TableIdType } from "types";

export interface IProps {
    id: TableIdType;
    data: ArtifactResponseType;
    showBookmarks: boolean;
    showPoolIds: boolean;
    handleCursorFetch: (cursor: string | null) => void;
    cursors: CursorType;
    owner: string | null,
    cursorObject: CursorObjectType
}
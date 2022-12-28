import { ArtifactResponseType, CursorType, CursorObjectType, TableIdType } from "types";

export interface IProps {
    id: TableIdType;
    data: ArtifactResponseType;
    handleCursorFetch: (cursor: string | null) => void;
    cursors: CursorType;
    cursorObject: CursorObjectType;
}
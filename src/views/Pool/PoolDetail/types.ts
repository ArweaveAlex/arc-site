import { ArtifactResponseType, CursorType, CursorObjectType, TableIdType } from "config/types";

export interface IProps {
    id: TableIdType;
    data: ArtifactResponseType;
    handleCursorFetch: (cursor: string | null) => void;
    cursors: CursorType;
    cursorObject: CursorObjectType;
    setSearchRequested: (searchRequested: boolean) => void;
}
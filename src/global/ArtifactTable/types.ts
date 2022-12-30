import { ArtifactResponseType, CursorType, CursorObjectType, TableIdType } from "config/types";

export interface IProps {
    id: TableIdType;
    data: ArtifactResponseType;
    showCollections: boolean;
    showPoolIds: boolean;
    handleCursorFetch: (cursor: string | null) => void;
    cursors: CursorType;
    owner: string | null;
    cursorObject: CursorObjectType;
    setSearchRequested: (searchRequested: boolean) => void;
}
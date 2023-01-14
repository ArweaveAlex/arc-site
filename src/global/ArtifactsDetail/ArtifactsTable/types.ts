import { ArtifactResponseType, CursorType, CursorObjectType, TableIdType, PoolType } from "helpers/types";

export interface IProps {
    id: TableIdType;
    indexIds: string [] | null;
    data: ArtifactResponseType;
    showCollections: boolean;
    showPoolIds: boolean;
    handleCursorFetch: (cursor: string | null) => void;
    cursors: CursorType;
    owner: string | null;
    cursorObject: CursorObjectType;
    setSearchRequested: (searchRequested: boolean) => void;
}
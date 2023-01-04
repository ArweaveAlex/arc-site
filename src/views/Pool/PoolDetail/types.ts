import { ArtifactResponseType, CursorType, CursorObjectType, TableIdType } from "config/types";

export interface IProps {
    id: TableIdType;
    cursorObject: CursorObjectType;
    uploader: string | null;
}
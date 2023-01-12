import { CursorObjectType, TableIdType } from "helpers/types";

export interface IProps {
    id: TableIdType;
    cursorObject: CursorObjectType;
    uploader: string | null;
}
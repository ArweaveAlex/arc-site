import { CursorObjectType, TableIdType } from "config/types";

export interface IProps {
    id: TableIdType;
    cursorObject: CursorObjectType;
    setSearchRequested: (searchRequested: boolean) => void;
    disabled: boolean;
}
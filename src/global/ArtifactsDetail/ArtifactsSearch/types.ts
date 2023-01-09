import { CursorObjectType, TableIdType } from "config/types";

export interface IProps {
    id: TableIdType;
    indexIds: string [] | null;
    cursorObject: CursorObjectType;
    setSearchRequested: (searchRequested: boolean) => void;
    disabled: boolean;
    owner: string | null;
}
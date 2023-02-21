import { CursorObjectType, TableIdType, PoolType } from "helpers/types";

export interface IProps {
  id: TableIdType;
  cursorObject: CursorObjectType;
  uploader: string | null;
}

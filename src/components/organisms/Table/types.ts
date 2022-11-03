import { KeyValueType, TableHeaderType, CursorType } from "types"

export interface IProps {
    title: string;
    header: TableHeaderType;
    data: KeyValueType[];
    recordsPerPage: number;
    showPageNumbers: boolean;
    handleUpdateFetch: (cursor: string | null) => void;
    cursors: CursorType
}
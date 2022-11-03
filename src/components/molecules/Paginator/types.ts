import { Dispatch, SetStateAction } from "react";

import { CursorType } from "types";

export interface IProps {
    nPages: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    scrollRef: any;
    showPageNumbers: boolean;
    handleUpdateFetch: (cursor: string | null) => void;
    cursors: CursorType
}
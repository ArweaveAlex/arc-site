import React from "react";

import { KeyValueType, TableHeaderType, CursorType } from "types"

export interface IProps {
    title: string;
    titleAction?: React.ReactNode | null;
    header: TableHeaderType;
    data: KeyValueType[];
    recordsPerPage: number;
    showPageNumbers: boolean;
    handleUpdateFetch: (cursor: string | null) => void;
    cursors: CursorType;
}
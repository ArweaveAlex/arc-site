import React from "react";

import { KeyValueType, TableHeaderType, CursorType } from "config/types"

export interface IProps {
    title: string;
    action?: React.ReactNode | null;
    header: TableHeaderType;
    data: KeyValueType[];
    recordsPerPage: number;
    showPageNumbers: boolean;
    handleCursorFetch: (cursor: string | null) => void;
    cursors: CursorType;
}
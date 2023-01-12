import React from "react";

import { KeyValueType, TableHeaderType, CursorType } from "helpers/types"

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
import React from 'react';

import { TableHeaderType, TableRowType, CursorType } from 'helpers/types';

export interface IProps {
	title: string;
	action?: React.ReactNode | null;
	header: TableHeaderType;
	data: TableRowType[];
	recordsPerPage: number;
	showPageNumbers: boolean;
	handleCursorFetch: (cursor: string | null) => void;
	cursors: CursorType;
	showNoResults: boolean;
}

export type ButtonType = 'primary' | 'alt1' | 'alt2' | 'alt3' | 'success' | 'warning';
export type FormFieldType = 'number' | 'password';
export type NotificationType = 'success' | 'warning' | 'neutral';
export type AlignType = 'left' | 'center' | 'right';
export type NotificationResponseType = {
	status: boolean;
	message: string | null;
};
export type RefType = { current: HTMLElement };
export type DateType = 'iso' | 'epoch';
export type PageShareType = 'primary' | 'alt1';
export type CursorType = {
	next: string | null;
	previous: string | null;
};

export type URLViewType = {
	index: number;
	label: string;
	icon: string;
	disabled: boolean;
	url: any;
	view: React.ComponentType;
};

export interface IURLView {
	account: URLViewType[];
	library: URLViewType[];
	poolManage: URLViewType[];
}

export type ResponseType = {
	status: boolean;
	message: string | null;
};

export type ValidationType = {
	status: boolean;
	message: string | null;
};

export type TableHeaderType = {
	[key: string]: { width: string; align: AlignType; display: string | null };
};
export type TableRowType = {
	data: { [key: string]: any };
	active: boolean;
	viewed: boolean;
};

export type ArtifactTableRowType = {
	title?: React.ReactNode;
	type?: React.ReactNode;
	pool?: React.ReactNode;
	dateCreated?: string;
	actions?: React.ReactNode;
	callback?: React.ReactNode;
	stamps?: React.ReactNode;
};

export type ReduxActionType = {
	type: string;
	payload: any;
};

export type ActionDropdownType = {
	fn: () => void;
	closeOnAction: boolean;
	subComponent: { node: React.ReactNode; active: boolean } | null;
	label: string;
	disabled: boolean;
	loading: boolean;
};

export type NavigationComponentType = {
	label: string;
	component: (disabled: boolean) => JSX.Element;
};

export type FileMetadataType = {
	file: any;
	metadata: { [key: string]: string };
};

export type StepType = 'prev' | 'next';

export type UploadingStatusType = 'uploading' | 'complete' | 'error';

export enum WalletEnum {
	arConnect = 'arconnect',
	arweaveApp = 'arweave.app',
}

export type IdPaginatorType = {
	index: string;
	ids: string[];
};

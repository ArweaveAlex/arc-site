export interface IProps {
	owner: string;
	selectedIds: string[];
	setSelectedIds: (ids: string[]) => void;
	title: string | null;
	topic: string | null;
	description: string | null;
}

export interface IAProps {
	component: any;
	header: string;
	handleClose: () => void;
}

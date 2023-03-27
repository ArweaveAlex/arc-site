export interface IProps {
	owner: string;
	selectedIds: string[];
	setSelectedIds: (ids: string[]) => void;
}

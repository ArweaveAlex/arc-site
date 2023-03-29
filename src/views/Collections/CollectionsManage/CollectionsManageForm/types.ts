export interface IProps {
	title: string | null;
	setTitle: (e: any) => void;
	topic: string | null;
	setTopic: (e: any) => void;
	description: string | null;
	setDescription: (e: any) => void;
	selectedIds: string[];
	handleSave: () => void;
}

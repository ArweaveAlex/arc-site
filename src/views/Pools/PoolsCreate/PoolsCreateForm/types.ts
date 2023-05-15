export interface IProps {
	title: string | null;
	setTitle: (e: any) => void;
	topics: string[] | null;
	setTopics: (e: any) => void;
	description: string | null;
	setDescription: (e: any) => void;
	handleSave: () => void;
}

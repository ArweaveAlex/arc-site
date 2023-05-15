export interface IProps {
	image: any;
	setImage: (e: any) => void;
	title: string | null;
	setTitle: (e: any) => void;
	contributionPercentage: number | null;
	setContributionPercentage: (e: any) => void;
	topics: string[] | null;
	setTopics: (e: any) => void;
	description: string | null;
	setDescription: (e: any) => void;
	handleSave: () => void;
	loading: boolean;
}

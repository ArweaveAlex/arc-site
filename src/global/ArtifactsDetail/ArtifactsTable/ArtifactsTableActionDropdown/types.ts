export interface IProps {
	artifactId: string;
	tags: { [key: string]: any }[];
	owner: string | null;
	bookmarksDisabled: boolean;
	handleStampCallback: () => void;
	handleViewedCallback: () => void;
	usePreviewModal: boolean;
}

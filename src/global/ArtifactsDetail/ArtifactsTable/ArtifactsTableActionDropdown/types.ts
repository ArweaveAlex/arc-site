export interface IProps {
	artifactId: string;
	tags: { [key: string]: any }[];
	owner: string | null;
	ownerActionDisabled: boolean;
	handleStampCallback: () => void;
	handleViewedCallback: () => void;
	usePreviewModal: boolean;
}

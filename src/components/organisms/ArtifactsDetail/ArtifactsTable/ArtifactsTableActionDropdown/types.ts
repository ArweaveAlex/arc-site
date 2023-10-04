export interface IProps {
	artifactId: string;
	artifactType: string;
	artifactName: string;
	artifactContractSrc: string;
	dateCreated: string;
	tags: { [key: string]: any }[];
	owner: string | null;
	ownerActionDisabled: boolean;
	handleStampCallback: () => void;
	handleViewedCallback: () => void;
	usePreviewModal: boolean;
}

import { ArtifactDetailType } from "helpers/types";

export interface IProps {
	data: ArtifactDetailType;
	isListItem: boolean;
	active: boolean;
	showArtifactLink: boolean;
	showOwnerLink: boolean;
}

export interface IMProps {
	mediaIds: string | null;
}

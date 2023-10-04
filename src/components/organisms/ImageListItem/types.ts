import { ArtifactDetailType } from 'arcframework';

export interface IProps {
	data: ArtifactDetailType;
	isListItem: boolean;
	active: boolean;
	showArtifactLink: boolean;
	showOwnerLink: boolean;
}

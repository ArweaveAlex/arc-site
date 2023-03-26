import { ArtifactDetailType } from 'arcframework';

export interface IProps {
	data: ArtifactDetailType[];
	loading: boolean;
	updateSequence: () => void;
	updateDisabled: boolean;
}

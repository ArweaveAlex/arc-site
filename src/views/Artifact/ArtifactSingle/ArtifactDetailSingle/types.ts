import { ArtifactDetailType } from 'arcframework';

export interface IProps {
	data: ArtifactDetailType;
	type: { label: string; icon: string } | null;
}

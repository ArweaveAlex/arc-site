import { ArtifactDetailType } from 'arcframework';

export interface IProps {
	data: ArtifactDetailType | null;
	type: { label: string; icon: string } | null;
	onTabPropClick: (label: string) => void;
}

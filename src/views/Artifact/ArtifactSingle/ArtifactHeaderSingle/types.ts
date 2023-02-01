import { ArtifactDetailType } from 'helpers/types';

export interface IProps {
	data: ArtifactDetailType | null;
	type: { label: string; icon: string } | null;
	onTabPropClick: (label: string) => void;
}

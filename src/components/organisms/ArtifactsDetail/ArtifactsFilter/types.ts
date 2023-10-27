export interface IProps {
	disabled: boolean;
	currentFilteredArtifactTypes: string[];
	setFilteredArtifactTypes: (artifactTypes: string[]) => void;
}

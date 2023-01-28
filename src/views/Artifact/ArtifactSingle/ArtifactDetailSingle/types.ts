import { ArtifactDetailType } from "helpers/types";

export interface IProps {
	data: ArtifactDetailType;
	type: { label: string; icon: string } | null;
}

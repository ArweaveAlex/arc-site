import { ArtifactDetailType } from "helpers/types";

export interface IProps {
    data: ArtifactDetailType[];
    loading: boolean;
    updateSequence: () => void;
    hideUpdate: boolean;
}
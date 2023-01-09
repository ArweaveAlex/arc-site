import { ArtifactDetailType } from "config/types";

export interface IProps {
    data: ArtifactDetailType;
    type: { label: string, icon: string } | null;
}
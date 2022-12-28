import { ArtifactType } from "config/types";

export interface IProps {
    data: ArtifactType;
    type: { label: string, icon: string } | null;
}
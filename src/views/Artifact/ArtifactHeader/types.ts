import { ArtifactType } from "@/types";

export interface IProps {
    data: ArtifactType;
    onTabPropClick: (label: string) => void
}
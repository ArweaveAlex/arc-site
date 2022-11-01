import { ArtifactType } from "types";

export interface IProps {
    data: ArtifactType | null;
    type: { label: string, icon: string } | null;
    onTabPropClick: (label: string) => void
}
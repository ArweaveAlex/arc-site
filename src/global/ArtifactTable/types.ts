import { ArtifactResponseType } from "types";

export interface IProps {
    data: ArtifactResponseType;
    showBookmarks: boolean;
    handleUpdateFetch: () => void;
}
import { ArtifactResponseType, CursorType } from "types";

export interface IProps {
    data: ArtifactResponseType;
    handleUpdateFetch: (cursor: string | null) => void;
    cursors: CursorType
}
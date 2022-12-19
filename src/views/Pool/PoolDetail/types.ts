import { ArtifactResponseType, CursorType } from "types";

export interface IProps {
    data: ArtifactResponseType;
    handleCursorFetch: (cursor: string | null) => void;
    handleSearchFetch: (term: string | null) => void;
    cursors: CursorType;
}
import { ArtifactResponseType, CursorType } from "types";

export interface IProps {
    data: ArtifactResponseType;
    showBookmarks: boolean;
    showPoolIds: boolean;
    handleCursorFetch: (cursor: string | null) => void;
    handleSearchFetch: (term: string | null) => void;
    cursors: CursorType;
    owner: string | null
}
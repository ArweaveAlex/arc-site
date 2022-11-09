import { ArtifactResponseType, CursorType } from "types";

export interface IProps {
    data: ArtifactResponseType;
    showBookmarks: boolean;
    showCollectionId: boolean;
    handleUpdateFetch: (cursor: string | null) => void;
    cursors: CursorType;
    owner: string | null
}
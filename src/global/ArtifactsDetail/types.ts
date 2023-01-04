import { ArtifactResponseType, ArtifactArgsType, CursorObjectType, TableIdType } from "config/types";

export interface IProps {
    id: TableIdType;
    indexIds: string [] | null;
    cursorObject: CursorObjectType;
    defaultFetch: {
        ids: string[] | null,
        fn: (args: ArtifactArgsType) => Promise<ArtifactResponseType>
    };
    showCollections: boolean;
    showPoolIds: boolean;
    owner: string | null;
    uploader: string | null;
}
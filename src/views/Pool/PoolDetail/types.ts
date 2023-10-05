import { CursorObjectType, GQLResponseType, TableIdType } from 'arcframework';

export interface IProps {
	id: TableIdType;
	cursorObject: CursorObjectType;
	uploaders: string[] | null;
	setCount?: (count: number) => void;
	setArtifacts: ((artifacts: GQLResponseType[]) => void) | null;
}

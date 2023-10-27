import { GQLNodeResponseType, TableIdType } from 'arcframework';

import { CursorObjectType } from 'helpers/types';

export interface IProps {
	id: TableIdType;
	cursorObject: CursorObjectType;
	uploaders: string[] | null;
	setCount?: (count: number) => void;
	setArtifacts: ((artifacts: GQLNodeResponseType[]) => void) | null;
}

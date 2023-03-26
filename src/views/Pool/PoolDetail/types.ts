import { CursorObjectType, TableIdType } from 'arcframework';

export interface IProps {
	id: TableIdType;
	cursorObject: CursorObjectType;
	uploader: string | null;
}

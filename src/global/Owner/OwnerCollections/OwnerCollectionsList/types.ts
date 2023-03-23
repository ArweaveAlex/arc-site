import { CollectionType } from 'arcframework';

export interface IProps {
	owner: string | null;
	data: CollectionType[] | null;
	showCreateCollections: boolean;
}

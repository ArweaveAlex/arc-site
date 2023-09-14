import { CollectionType } from '../../../../lib/clients/mint';

export interface IProps {
	owner: string | null;
	data: CollectionType[] | null;
	showCreateCollections: boolean;
}

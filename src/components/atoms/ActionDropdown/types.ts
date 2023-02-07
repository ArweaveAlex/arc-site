import { ActionDropdownType } from 'helpers/types';

export interface IProps {
	handleCallback: () => void;
	handleShowDropdown: () => void | null;
	actions: ActionDropdownType[];
}

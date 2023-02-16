import { ActionDropdownType } from 'helpers/types';

export interface IProps {
	open: boolean;
	handleCallback: () => void;
	handleShowDropdown: () => void | null;
	actions: ActionDropdownType[];
	closeDisabled: boolean;
}

import { ActionDropdownType } from 'helpers/types';

export interface IProps {
    handleCallback: () => void;
    actions: ActionDropdownType[];
}
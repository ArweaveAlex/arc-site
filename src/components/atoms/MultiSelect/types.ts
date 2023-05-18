import { ValidationType } from 'arcframework';

export interface IProps {
	onChange: (e: any) => void;
	label?: string;
	display: string;
	disabled: boolean;
	values: string[];
	options: string[];
	invalid: ValidationType;
}

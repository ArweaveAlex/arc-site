import { ButtonType } from 'helpers/types';

export interface IProps {
	src: string;
	type: ButtonType;
	handlePress: any;
	sm?: boolean;
	warning?: boolean;
	disabled?: boolean;
	testingCtx?: string;
	dimensions?: {
		wrapper: number;
		icon: number;
	};
}

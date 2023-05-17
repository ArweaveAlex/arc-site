import { NavigationComponentType } from 'helpers/types';

export interface IProps {
	currentSource: NavigationComponentType;
	setCurrentSource: (label: string) => void;
}

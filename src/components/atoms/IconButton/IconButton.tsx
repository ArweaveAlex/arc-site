import { ReactSVG } from 'react-svg';

import * as S from './styles';
import { IProps } from './types';

export default function IconButton(props: IProps) {
	const buttonStyle = getType();
	const StyledButton = buttonStyle.wrapper;

	function getType() {
		let buttonObj: {
			wrapper: any;
		};
		switch (props.type) {
			case 'alt1':
				buttonObj = {
					wrapper: S.Alt1,
				};
				return buttonObj;
			case 'alt2':
				buttonObj = {
					wrapper: S.Alt2,
				};
				return buttonObj;
			default:
				buttonObj = {
					wrapper: S.Primary,
				};
				return buttonObj;
		}
	}

	return (
		<StyledButton
			onClick={props.handlePress}
			disabled={props.disabled}
			sm={props.sm}
			warning={props.warning}
			data-testid={props.testingCtx}
			dimensions={props.dimensions}
		>
			<ReactSVG src={props.src} />
		</StyledButton>
	);
}

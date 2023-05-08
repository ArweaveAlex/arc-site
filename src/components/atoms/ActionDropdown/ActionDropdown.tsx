import React from 'react';

import { IconButton } from 'components/atoms/IconButton';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';
import { IProps } from './types';

export default function ActionDropdown(props: IProps) {
	const dropdownRef = React.useRef(null);
	const dropdownHeight = 32.5 * props.actions.length + 10;

	const [topHalfClicked, setTopHalfClicked] = React.useState<boolean>(true);

	const escFunction = React.useCallback(
		(e: any) => {
			if (e.key === 'Escape' && props.open && !props.closeDisabled) {
				props.handleCallback();
			}
		},
		[props]
	);

	React.useEffect(() => {
		document.addEventListener('keydown', escFunction, false);

		return () => {
			document.removeEventListener('keydown', escFunction, false);
		};
	}, [escFunction]);

	function handleCallback() {
		if (!props.closeDisabled) {
			props.handleCallback();
		}
	}

	function handleShowDropdown(e: any) {
		if (!props.closeDisabled) {
			if (e) {
				let m = window.innerHeight / 1.325;
				if (e.clientY > m) {
					setTopHalfClicked(false);
				} else {
					setTopHalfClicked(true);
				}
			}
			props.handleShowDropdown();
		}
	}

	function runAction(action: () => void, closeOnAction: boolean) {
		action();
		if (closeOnAction) {
			props.handleCallback();
		}
	}

	return (
		<CloseHandler callback={() => handleCallback()} active={props.open} disabled={props.closeDisabled}>
			<S.Wrapper>
				<IconButton type={'primary'} src={ASSETS.menuAction} handlePress={(e: any) => handleShowDropdown(e)} />
				<S.Dropdown open={props.open} openDown={topHalfClicked} height={dropdownHeight} ref={dropdownRef}>
					{props.actions.map((action, index) => {
						return (
							<S.Container key={index}>
								{action.subComponent && action.subComponent.active && action.subComponent.node}
								<S.LI
									disabled={action.disabled || action.loading}
									onClick={() => runAction(action.fn, action.closeOnAction)}
								>
									{action.loading ? `${language.loading} ...` : action.label}
								</S.LI>
							</S.Container>
						);
					})}
				</S.Dropdown>
			</S.Wrapper>
		</CloseHandler>
	);
}

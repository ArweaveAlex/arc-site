import React from 'react';
import { IconButton } from '../IconButton';

import { Portal } from '../Portal';

import { IProps } from './types';
import { ASSETS, DOM } from 'helpers/config';
import * as S from './styles';

export default function Notification(props: IProps) {
	const [show, setShow] = React.useState<boolean>(true);

	function handleClose() {
		setShow(false);
		props.callback();
	}

	return show ? (
		<Portal node={DOM.notification}>
			<S.Wrapper>
				<S.Message type={props.type}>{props.message}</S.Message>
				<S.Close>
					<IconButton type={'primary'} sm warning src={ASSETS.close} handlePress={handleClose} />
				</S.Close>
			</S.Wrapper>
		</Portal>
	) : null;
}

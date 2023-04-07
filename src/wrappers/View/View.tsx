import React from 'react';

import { DOM } from 'helpers/config';
import { useMutation } from 'hooks/useMutation';

import * as S from './styles';

export default function View(props: { children: React.ReactNode }) {
	const hasSubheader = useMutation(DOM.subheader);
	return <S.Wrapper hasSubheader={hasSubheader}>{props.children}</S.Wrapper>;
}

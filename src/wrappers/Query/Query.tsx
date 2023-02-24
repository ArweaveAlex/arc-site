import React from 'react';

import { useQuery } from 'hooks/useQuery';

import { LANGUAGE } from 'helpers/language';
import { IProps } from './types';
import * as S from './styles';

export default function Query(props: IProps) {
	const query = useQuery();

	const [invalid, setInvalid] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (!query.get(props.value)) {
			setInvalid(true);
		}
		if (props.check && !props.check.includes(query.get(props.value))) {
			setInvalid(true);
		}
	}, [props.value, props.check, query]);

	return invalid ? (
		<S.InvalidWrapper>
			<p>{LANGUAGE.invalidQuery}</p>
		</S.InvalidWrapper>
	) : (
		<>{props.children}</>
	);
}

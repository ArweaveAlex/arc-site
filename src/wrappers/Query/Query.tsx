import React from 'react';

import { language } from 'helpers/language';
import { useQuery } from 'hooks/useQuery';

import * as S from './styles';
import { IProps } from './types';

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
			<p>{language.invalidQuery}</p>
		</S.InvalidWrapper>
	) : (
		<>{props.children}</>
	);
}

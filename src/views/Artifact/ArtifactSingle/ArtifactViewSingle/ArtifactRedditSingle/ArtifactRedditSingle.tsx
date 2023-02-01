import React from 'react';

import { traverse } from 'helpers/utils';
import { IProps } from '../../types';
import * as S from './styles';

export default function ArtifactRedditSingle(props: IProps) {
	const [messageData, setMessageData] = React.useState<any>(null);



	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setMessageData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	React.useEffect(() => {
		(async function () {
			if (messageData) {
				await traverse(['author'], messageData, (obj: any, field: string) => console.log(obj))
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageData])

	return (
		<S.Wrapper>
			<p>Reddit thread</p>
		</S.Wrapper>
	);
}

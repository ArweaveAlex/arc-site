import React from 'react';

import { Loader } from 'components/atoms/Loader';

import { IProps } from '../../types';
import * as S from './styles';

// TODO - Styling
export default function ArtifactNostrEventSingle(props: IProps) {
    const [parsedJsonData, setParsedJsonData] = React.useState<any>(null);
    const [data, setData] = React.useState<any>([]);

    React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setParsedJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

    React.useEffect(() => {
		(async function () {
			if (parsedJsonData) {
				setData(parsedJsonData);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parsedJsonData]);

	function getDetailData() {
		if (!props.data || !parsedJsonData) {
			return <Loader sm />;
		} else {
			return <div>{parsedJsonData.content}</div>;
		}
	}

	console.log(data);

	return (
		<S.Wrapper>
			<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}

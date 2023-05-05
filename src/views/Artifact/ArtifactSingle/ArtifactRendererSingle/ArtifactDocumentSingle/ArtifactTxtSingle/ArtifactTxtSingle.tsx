import React from 'react';

import { getTxEndpoint } from 'arcframework';

import { Loader } from 'components/atoms/Loader';

import { IProps } from '../../../types';

import * as S from './styles';

export default function ArtifactTxtSingle(props: IProps) {
	const [txtData, setTxtData] = React.useState(null);
	const [jsonData, setJsonData] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	React.useEffect(() => {
		(async function () {
			if (jsonData) {
				let txtResponse = await fetch(getTxEndpoint(jsonData.fileTxId));
				let txt = await txtResponse.text();
				setTxtData(txt);
			}
		})();
	}, [jsonData]);

	function getDetailData() {
		if (!props.data) {
			return <Loader />;
		} else {
			return <S.Pre>{txtData}</S.Pre>;
		}
	}

	return (
		<div className={'border-wrapper'}>
			<S.Wrapper>
				<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
			</S.Wrapper>
		</div>
	);
}

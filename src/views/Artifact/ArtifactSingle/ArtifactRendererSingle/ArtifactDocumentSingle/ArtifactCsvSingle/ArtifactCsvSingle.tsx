import React from 'react';

import { getTxEndpoint } from 'arcframework';

import { Loader } from 'components/atoms/Loader';

import { IProps } from '../../../types';

import * as S from './styles';

export default function ArtifactCsvSingle(props: IProps) {
	const [csvData, setCsvData] = React.useState(null);
	const [jsonData, setJsonData] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	React.useEffect(() => {
		(async function () {
			if (jsonData) {
				let csvResponse = await fetch(getTxEndpoint(jsonData.fileTxId));
				let csv = await csvResponse.text();
				setCsvData(csv);
			}
		})();
	}, [jsonData]);

	function getRandomInt() {
		let min = Math.ceil(1);
		let max = Math.floor(10000);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getDetailData() {
		if (!props.data || !csvData) {
			return <Loader />;
		} else {
			const rows = csvData.split('\n');
			const headers = rows[0].split(',');
			const data = rows.slice(1);
			return (
				<S.Table>
					<thead>
						<tr>
							{headers.map((header: string) => (
								<S.Th key={getRandomInt()}>{header}</S.Th>
							))}
						</tr>
					</thead>
					<S.Tbody>
						{data.map((row: string, key: number) => {
							return (
								<S.Tr key={getRandomInt()}>
									{row.split(',').map((cell: string) => (
										<S.Td key={getRandomInt()}>{cell}</S.Td>
									))}
								</S.Tr>
							);
						})}
					</S.Tbody>
				</S.Table>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}

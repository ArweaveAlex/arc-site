import React from 'react';

import { getTxEndpoint } from 'arcframework';

import { Loader } from 'components/atoms/Loader';

import { IProps } from '../../../types';

import * as S from './styles';

export default function ArtifactPdfSingle(props: IProps) {
	const [pdfUrl, setPdfUrl] = React.useState(null);
	const [jsonData, setJsonData] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	React.useEffect(() => {
		(async function () {
			if (jsonData) {
				setPdfUrl(getTxEndpoint(jsonData.fileTxId));
			}
		})();
	}, [jsonData]);

	function getDetailData() {
		if (!props.data || !pdfUrl) {
			return <Loader />;
		} else {
			let altText = props.data.artifactName ? props.data.artifactName : props.data.artifactId;
			return (
				<object data={pdfUrl} type="application/pdf" width="100%" height="100%">
					<p>
						<a href={pdfUrl}>{altText}</a>
					</p>
				</object>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
		</S.Wrapper>
	);
}

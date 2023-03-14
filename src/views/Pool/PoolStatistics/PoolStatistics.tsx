import React from 'react';

import { getArtifactsByIds, getArtifactsByPool } from 'gql/artifacts';
import { TAGS } from 'helpers/config';
import { getRedstoneDescEndpoint } from 'helpers/endpoints';
import { REDUX_TABLES } from 'helpers/redux';
import { ArtifactResponseType } from 'helpers/types';
import { getTagValue } from 'helpers/utils';

import { PoolContributors } from './PoolContributors';
import { PoolRecentlyMinted } from './PoolRecentlyMinted';
import * as S from './styles';
import { IProps } from './types';

export default function PoolStatistics(props: IProps) {
	const [detailData, setDetailData] = React.useState<ArtifactResponseType | null>(null);

	async function getDetailData(contractSrc: string) {
		let page: number = 0;
		let detailData: ArtifactResponseType | null = null;

		do {
			page++;
			const redstoneContracts = await fetch(getRedstoneDescEndpoint(contractSrc, page, 100));

			const ids = (await redstoneContracts.json()).contracts.map((contract: any) => {
				return contract.contractId;
			});
			detailData = await getArtifactsByIds({
				ids: ids,
				owner: null,
				uploader: null,
				cursor: null,
				reduxCursor: null,
			});
		} while (!detailData || (detailData && detailData.contracts.length <= 5));

		return {
			nextCursor: detailData.nextCursor,
			previousCursor: detailData.previousCursor,
			contracts: detailData.contracts.slice(0, 5),
		};
	}

	React.useEffect(() => {
		(async function () {
			if (props.headerData) {
				const dataContractSrc = await getArtifactsByPool({
					ids: [props.headerData.id],
					owner: null,
					uploader: props.headerData.state.owner,
					cursor: null,
					reduxCursor: REDUX_TABLES.poolAll,
				});

				if (dataContractSrc && dataContractSrc.contracts.length > 0) {
					setDetailData(
						await getDetailData(getTagValue(dataContractSrc.contracts[0].node.tags, TAGS.keys.contractSrc))
					);
				} else {
					if (dataContractSrc && dataContractSrc.contracts.length <= 0) {
						setDetailData({
							nextCursor: null,
							previousCursor: null,
							contracts: [],
						});
					}
				}
			}
		})();
	}, [props.headerData]);

	return (
		<S.Wrapper>
			<PoolRecentlyMinted data={detailData} />
			<PoolContributors data={props.headerData} />
		</S.Wrapper>
	);
}

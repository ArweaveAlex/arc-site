import React from 'react';
import { useParams } from 'react-router-dom';

import {
	CursorEnum,
	FALLBACK_IMAGE,
	getPoolById,
	getPoolCount,
	getTagValue,
	getTxEndpoint,
	PoolType,
	TAGS,
} from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { getArtifactsByPool } from 'gql';
import { REDUX_TABLES } from 'helpers/redux';

import { PoolDetail } from './PoolDetail';
import { PoolHeader } from './PoolHeader';
import { PoolStatistics } from './PoolStatistics';

export default function Pool() {
	const { id } = useParams();

	const [headerData, setHeaderData] = React.useState<PoolType | null>(null);

	const [count, setCount] = React.useState<number | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);

	React.useEffect(() => {
		(async function () {
			if (id) {
				setHeaderData(await getPoolById(id));
			}
		})();
	}, [id]);

	React.useEffect(() => {
		(async function () {
			if (id && headerData) {
				const detailData = await getArtifactsByPool({
					ids: [id],
					owner: null,
					uploader: headerData.state.owner,
					cursor: null,
					reduxCursor: REDUX_TABLES.poolAll,
				});

				if (detailData && detailData.contracts.length > 0) {
					setCount(await getPoolCount(getTagValue(detailData.contracts[0].node.tags, TAGS.keys.contractSrc)));
				} else {
					setCount(0);
				}
			}
		})();
	}, [id, headerData]);

	React.useEffect(() => {
		(async function () {
			if (headerData) {
				const imageResponse = await fetch(
					getTxEndpoint(headerData.state.image.length > 0 ? headerData.state.image : FALLBACK_IMAGE)
				);
				setImageUrl(imageResponse.status === 200 ? imageResponse.url : getTxEndpoint(FALLBACK_IMAGE));
			}
		})();
	}, [headerData]);

	function getPoolHeader() {
		return (
			<PoolHeader
				id={headerData.id}
				image={imageUrl}
				title={headerData.state.title}
				description={headerData.state.description}
				dateCreated={headerData.state.timestamp}
				count={count}
				totalContributions={headerData.state.totalContributions}
				contributors={headerData.state.contributors}
				ownerMaintained={headerData.state.ownerMaintained ? headerData.state.ownerMaintained : false}
				contribPercent={headerData.state.contribPercent ? headerData.state.contribPercent : null}
			/>
		);
	}

	function getPoolStatistics() {
		if (headerData && headerData.state.ownerMaintained) {
			return null;
		}
		return <PoolStatistics headerData={headerData} />;
	}

	function getPoolDetail() {
		return (
			<PoolDetail
				id={{ value: id, type: 'poolId' }}
				cursorObject={{
					key: CursorEnum.Search,
					value: REDUX_TABLES.poolAll,
				}}
				uploader={headerData.state.owner}
			/>
		);
	}

	return headerData ? (
		<div className={'view-wrapper max-cutoff'}>
			{getPoolHeader()}
			{getPoolStatistics()}
			{getPoolDetail()}
		</div>
	) : (
		<Loader />
	);
}

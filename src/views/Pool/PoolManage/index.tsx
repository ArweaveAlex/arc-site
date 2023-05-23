import React from 'react';
import { useParams } from 'react-router-dom';

import * as ArcFramework from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { URLTabs } from 'components/organisms/URLTabs';
import { URLS } from 'helpers/config';
import { REDUX_TABLES } from 'helpers/redux';

import { PoolManageHeader } from './PoolManageHeader';

// TODO: wallet block
// TODO: owner block
export default function PoolManage() {
	const { id } = useParams();

	const [headerData, setHeaderData] = React.useState<ArcFramework.PoolType | null>(null);

	const [count, setCount] = React.useState<number | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);

	React.useEffect(() => {
		(async function () {
			if (id) {
				setHeaderData(await ArcFramework.getPoolById(id));
			}
		})();
	}, [id]);

	React.useEffect(() => {
		(async function () {
			if (id && headerData) {
				const detailData = await ArcFramework.getArtifactsByPool({
					ids: [id],
					owner: null,
					uploader: headerData.state.owner,
					cursor: null,
					reduxCursor: REDUX_TABLES.poolAll,
				});

				if (detailData && detailData.contracts.length > 0) {
					setCount(
						await ArcFramework.getPoolCount(
							ArcFramework.getTagValue(detailData.contracts[0].node.tags, ArcFramework.TAGS.keys.contractSrc)
						)
					);
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
					ArcFramework.getTxEndpoint(
						headerData.state.image.length > 0 ? headerData.state.image : ArcFramework.FALLBACK_IMAGE
					)
				);
				setImageUrl(
					imageResponse.status === 200 ? imageResponse.url : ArcFramework.getTxEndpoint(ArcFramework.FALLBACK_IMAGE)
				);
			}
		})();
	}, [headerData]);

	function getPoolManageHeader() {
		return (
			<PoolManageHeader
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

	return headerData ? (
		<div className={'view-wrapper max-cutoff'}>
			{getPoolManageHeader()}
			<URLTabs tabs={URLS.poolManage} activeUrl={URLS.poolManage[0]!.url} />
		</div>
	) : (
		<Loader />
	);
}
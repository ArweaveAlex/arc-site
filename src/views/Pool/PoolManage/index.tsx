import React from 'react';
import { useParams } from 'react-router-dom';

import * as ArcFramework from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { URLTabs } from 'components/organisms/URLTabs';
import { URLS } from 'helpers/config';
import { language } from 'helpers/language';
import { REDUX_TABLES } from 'helpers/redux';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { WalletBlock } from 'wallet/WalletBlock';

import { PoolManageHeader } from './PoolManageHeader';

export default function PoolManage() {
	const { id } = useParams();

	const arProvider = useArweaveProvider();

	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	React.useEffect(() => {
		setTimeout(() => {
			if (!arProvider.walletAddress) {
				setShowWalletBlock(true);
			}
		}, 200);
	}, [arProvider.walletAddress]);

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
				setImageUrl(imageResponse.status ? imageResponse.url : ArcFramework.getTxEndpoint(ArcFramework.FALLBACK_IMAGE));
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

	function getData() {
		if (arProvider.walletAddress) {
			if (headerData) {
				if (arProvider.walletAddress === headerData.state.owner) {
					return (
						<div className={'view-wrapper max-cutoff'}>
							{getPoolManageHeader()}
							<URLTabs tabs={URLS.poolManage} activeUrl={URLS.poolManage[0]!.url} />
						</div>
					);
				} else {
					return (
						<div className={'view-wrapper max-cutoff wrapper-600'}>
							<p>{language.invalidWalletPoolManage}</p>
						</div>
					);
				}
			} else {
				return <Loader />;
			}
		} else {
			if (showWalletBlock) {
				return <WalletBlock />;
			} else {
				return null;
			}
		}
	}

	return getData();
}

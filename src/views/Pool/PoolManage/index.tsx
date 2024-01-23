import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as ArcFramework from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { URLTabs } from 'components/molecules/URLTabs';
import { URLS } from 'helpers/config';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { RootState } from 'store';
import { WalletBlock } from 'wallet/WalletBlock';

import { PoolManageHeader } from './PoolManageHeader';

export default function PoolManage() {
	const { id } = useParams();

	const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

	const arProvider = useArweaveProvider();

	const [showWalletBlock, setShowWalletBlock] = React.useState<boolean>(false);

	const [headerData, setHeaderData] = React.useState<ArcFramework.PoolType | null>(null);

	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [totalContributions, setTotalContributions] = React.useState<string>('0');

	React.useEffect(() => {
		setTimeout(() => {
			if (!arProvider.walletAddress) {
				setShowWalletBlock(true);
			}
		}, 200);
	}, [arProvider.walletAddress]);

	React.useEffect(() => {
		(async function () {
			if (id) {
				setHeaderData(await ArcFramework.getPoolById(id));
			}
		})();
	}, [id]);

	React.useEffect(() => {
		if (id && poolsReducer && poolsReducer.data && poolsReducer.data.length) {
			const existingPool = poolsReducer.data.find((pool: ArcFramework.PoolType) => pool.id === id);
			if (existingPool && existingPool.state.totalContributions) {
				setTotalContributions(existingPool.state.totalContributions);
			}
		}
	}, [id, poolsReducer]);

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
				count={0}
				totalContributions={totalContributions}
				contributors={headerData.state.contributors}
				ownerMaintained={false}
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

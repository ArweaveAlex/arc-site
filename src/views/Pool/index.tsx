import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as ArcFramework from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { REDUX_TABLES } from 'helpers/redux';
import { CursorEnum, GQLNodeResponseType } from 'helpers/types';
import { RootState } from 'store';

import { PoolDetail } from './PoolDetail';
import { PoolHeader } from './PoolHeader';
import { PoolStatistics } from './PoolStatistics';

export default function Pool() {
	const { id } = useParams();

	const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

	const [headerData, setHeaderData] = React.useState<ArcFramework.PoolType | null>(null);
	const [uploaders, setUploaders] = React.useState<string[] | null>(null);

	const [count, setCount] = React.useState<number | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [recentArtifacts, setRecentArtifacts] = React.useState<GQLNodeResponseType[] | null>(null);
	const [totalContributions, setTotalContributions] = React.useState<string>('0');

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
				const stateUploaders: string[] = [headerData.state.owner];
				if (headerData.state.controlPubkey && headerData.state.controlPubkey !== headerData.state.owner)
					stateUploaders.push(headerData.state.controlPubkey);
				setUploaders(stateUploaders);
			}
		})();
	}, [headerData]);

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

	function getPoolHeader() {
		return (
			<PoolHeader
				id={headerData.id}
				image={imageUrl}
				title={headerData.state.title}
				description={headerData.state.description}
				dateCreated={headerData.state.timestamp}
				count={count}
				totalContributions={totalContributions}
				contributors={headerData.state.contributors}
				ownerMaintained={false}
				contribPercent={headerData.state.contribPercent ? headerData.state.contribPercent : null}
			/>
		);
	}

	function getPoolStatistics() {
		return <PoolStatistics headerData={headerData} artifacts={recentArtifacts} />;
	}

	function getPoolDetail() {
		if (uploaders) {
			return (
				<PoolDetail
					id={{ value: id, type: 'poolId' }}
					cursorObject={{
						key: CursorEnum.GQL,
						value: REDUX_TABLES.poolAll,
					}}
					uploaders={uploaders}
					setCount={(count: number) => setCount(count)}
					setArtifacts={!recentArtifacts ? (artifacts: GQLNodeResponseType[]) => setRecentArtifacts(artifacts) : null}
				/>
			);
		}
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

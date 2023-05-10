import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { FALLBACK_IMAGE, getTxEndpoint, PoolClient, PoolFilterType, PoolType } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { Select } from 'components/atoms/Select';
import { PoolContribute } from 'global/PoolContribute';
import { ASSETS, DEFAULT_POOL_FETCH_COUNT, POOL_FILTERS } from 'helpers/config';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { ReduxPoolsUpdate } from 'state/pools/ReduxPoolsUpdate';
import { RootState } from 'state/store';

import * as S from './styles';
import { IProps } from './types';

function PoolTile(props: PoolType) {
	const poolClient = new PoolClient();

	const [poolUrl, setPoolsUrl] = React.useState<string | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [showContributeModal, setShowContributeModal] = React.useState<boolean>(false);

	React.useEffect(() => {
		setPoolsUrl(`${urls.pool}${props.id}`);
	}, [props.id]);

	React.useEffect(() => {
		(async function () {
			const imageResponse = await fetch(
				getTxEndpoint(props.state.image.length > 0 ? props.state.image : FALLBACK_IMAGE)
			);
			setImageUrl(imageResponse.status === 200 ? imageResponse.url : getTxEndpoint(FALLBACK_IMAGE));
		})();
	});

	function getLink() {
		if (imageUrl) {
			return (
				<>
					<S.C2 image={imageUrl} />
					<S.Info>
						<S.InfoTitle>
							<p>{props.state.title}</p>
						</S.InfoTitle>
						<S.InfoCA>
							<p>{language.totalContributed}</p>
							<span>
								{poolClient.getARAmount(props.state.totalContributions)}
								<ReactSVG src={ASSETS.logoAlt2} />
							</span>
						</S.InfoCA>
					</S.Info>
				</>
			);
		} else {
			return <S.LP />;
		}
	}

	return poolUrl ? (
		<>
			<S.PCWrapper>
				<Link to={poolUrl}>{getLink()}</Link>
				<S.Action
					onClick={() => setShowContributeModal(true)}
					disabled={props.state.ownerMaintained ? props.state.ownerMaintained : false}
				>
					<span>{language.contribute}</span>
					<ReactSVG src={ASSETS.logoAlt} />
				</S.Action>
			</S.PCWrapper>
			{showContributeModal && (
				<PoolContribute
					poolId={props.id ? props.id : null}
					header={props.state.title ? props.state.title : null}
					totalContributions={props.state.totalContributions ? props.state.totalContributions : null}
					dateCreated={props.state.timestamp ? props.state.timestamp : null}
					contributors={props.state.contributors ? props.state.contributors : null}
					contribPercent={props.state.contribPercent ? props.state.contribPercent : null}
					handleShowModal={() => setShowContributeModal(false)}
				/>
			)}
		</>
	) : null;
}

export default function PoolsGrid(props: IProps) {
	const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

	const [data, setData] = React.useState<PoolType[] | null>(null);
	const [count, setCount] = React.useState<number | null>(props.fetchCount);
	const [currentFilter, setCurrentFilter] = React.useState<any>(POOL_FILTERS[0]);

	React.useEffect(() => {
		if (poolsReducer.data) {
			setData(poolsReducer.data);
		}
	}, [poolsReducer.data]);

	function getPoolFilter(option: string) {
		for (let i = 0; i < POOL_FILTERS.length; i++) {
			if (POOL_FILTERS[i].title === option) {
				return POOL_FILTERS[i];
			}
		}
	}

	function getData() {
		if (data) {
			return currentFilter.fn(data, count).map((pool: PoolType) => {
				return <PoolTile {...pool} key={pool.id} />;
			});
		} else {
			return Array.from({ length: count ? count : DEFAULT_POOL_FETCH_COUNT }, (_, i) => i + 1).map(
				(element: number) => {
					return (
						<S.PCWrapper key={element}>
							<Loader placeholder />
						</S.PCWrapper>
					);
				}
			);
		}
	}

	return (
		<ReduxPoolsUpdate>
			<S.Wrapper>
				<S.SubheaderFlex>
					<Select
						onChange={(e) => setCurrentFilter(getPoolFilter(e.target.value))}
						display={null}
						value={currentFilter.title}
						options={POOL_FILTERS.map((filter: PoolFilterType) => filter.title)}
						disabled={false}
					/>
				</S.SubheaderFlex>
				<S.Body>{getData()}</S.Body>
				{data && count && data.length > count && (
					<S.FetchAction>
						<Button
							type={'primary'}
							label={language.exploreMore}
							handlePress={() => setCount(count + props.fetchCount)}
							height={52.5}
							width={275}
						/>
					</S.FetchAction>
				)}
			</S.Wrapper>
		</ReduxPoolsUpdate>
	);
}

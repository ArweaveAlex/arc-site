import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { ANSTopicEnum, FALLBACK_IMAGE, getTxEndpoint, PoolClient, PoolFilterType, PoolIndexType } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Portal } from 'components/atoms/Portal';
import { Select } from 'components/atoms/Select';
import { PoolContribute } from 'components/organisms/PoolContribute';
import { ASSETS, DEFAULT_POOL_FETCH_COUNT, DOM, EXISTING_POOLS_FILTER, POOL_SORT_OPTIONS } from 'helpers/config';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import * as windowUtils from 'helpers/window';
import { RootState } from 'store';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';
import { IProps } from './types';

function PoolTile(props: any) {
	const poolClient = new PoolClient();

	const [poolUrl, setPoolUrl] = React.useState<string | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const [showContributeModal, setShowContributeModal] = React.useState<boolean>(false);

	React.useEffect(() => {
		setPoolUrl(`${urls.pool}${props.id}`);
	}, [props.id]);

	React.useEffect(() => {
		(async function () {
			const imageResponse = await fetch(
				getTxEndpoint(props.state.image.length > 0 ? props.state.image : FALLBACK_IMAGE)
			);
			setImageUrl(imageResponse.ok ? imageResponse.url : getTxEndpoint(FALLBACK_IMAGE));
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
				<S.Action onClick={() => setShowContributeModal(true)} disabled={false}>
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
					handleClose={() => setShowContributeModal(false)}
				/>
			)}
		</>
	) : null;
}

export default function PoolsGrid(props: IProps) {
	const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

	const [data, setData] = React.useState<PoolIndexType[] | null>(null);
	const [count, setCount] = React.useState<number | null>(props.fetchCount);
	const [currentSort, setCurrentSort] = React.useState<any>(POOL_SORT_OPTIONS[0]);

	const [currentFilter, setCurrentFilter] = React.useState<string>('All');
	const [filterOpen, setFilterOpen] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (poolsReducer.data) {
			let filteredData: PoolIndexType[] = [];
			if (currentFilter !== 'All') {
				const mergedPoolIds: string[] = EXISTING_POOLS_FILTER[currentFilter];
				for (let i = 0; i < poolsReducer.data.length; i++) {
					if (
						poolsReducer.data[i].state.topics &&
						poolsReducer.data[i].state.topics.includes(currentFilter) &&
						!EXISTING_POOLS_FILTER[currentFilter].includes(poolsReducer.data[i].id)
					) {
						mergedPoolIds.push(poolsReducer.data[i].id);
					}
				}
				filteredData = poolsReducer.data.filter((pool: PoolIndexType) => mergedPoolIds.includes(pool.id));
			} else {
				filteredData = poolsReducer.data;
			}
			setData(filteredData);
		}
	}, [currentFilter, poolsReducer.data]);

	React.useEffect(() => {
		if (filterOpen) {
			windowUtils.hideDocumentBody();
		} else {
			windowUtils.showDocumentBody();
		}
	}, [filterOpen]);

	function getPoolSort(option: string) {
		for (let i = 0; i < POOL_SORT_OPTIONS.length; i++) {
			if (POOL_SORT_OPTIONS[i].title === option) {
				return POOL_SORT_OPTIONS[i];
			}
		}
	}

	function getPoolFilter() {
		return (
			<S.FilterWrapper>
				<Button
					type={'alt2'}
					label={language.filterResults}
					icon={ASSETS.filter}
					handlePress={() => setFilterOpen(!filterOpen)}
					noMinWidth
				/>
				{currentFilter !== 'All' && (
					<S.CurrentFilter>
						<p>{`${language.topic}: ${currentFilter}`}</p>
						<IconButton type={'primary'} sm warning src={ASSETS.close} handlePress={() => setCurrentFilter('All')} />
					</S.CurrentFilter>
				)}
				{filterOpen && (
					<Portal node={DOM.sideNavigation}>
						<S.FOWrapper>
							<S.FOContent>
								<CloseHandler active={filterOpen} callback={() => setFilterOpen(false)} disabled={false}>
									<S.FOTitle>
										<p>{language.filterByPoolTopic}</p>
										<IconButton
											type={'primary'}
											sm
											warning
											src={ASSETS.close}
											handlePress={() => setFilterOpen(false)}
										/>
									</S.FOTitle>
									<S.FOList>
										{Object.keys({ All: 'All', ...ANSTopicEnum }).map((topic: string, index: number) => (
											<S.FOListItem
												key={index}
												disabled={false}
												onClick={() => (setCurrentFilter(topic), setFilterOpen(!filterOpen))}
												active={currentFilter === topic}
											>
												{topic}
											</S.FOListItem>
										))}
									</S.FOList>
								</CloseHandler>
							</S.FOContent>
						</S.FOWrapper>
					</Portal>
				)}
			</S.FilterWrapper>
		);
	}

	function getData() {
		if (data) {
			const sortedData = currentSort.fn(data, count);
			if (sortedData.length > 0) {
				return sortedData.map((pool: PoolIndexType) => {
					return <PoolTile {...pool} key={pool.id} />;
				});
			} else {
				return (
					<S.NoPoolsContainer>
						<p>{language.noPools}</p>
					</S.NoPoolsContainer>
				);
			}
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
		<S.Wrapper>
			<S.SubheaderFlex>
				{getPoolFilter()}
				<S.Select>
					<Select
						onChange={(e) => setCurrentSort(getPoolSort(e.target.value))}
						display={null}
						value={currentSort.title}
						options={POOL_SORT_OPTIONS.map((filter: PoolFilterType) => filter.title)}
						disabled={false}
					/>
				</S.Select>
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
	);
}

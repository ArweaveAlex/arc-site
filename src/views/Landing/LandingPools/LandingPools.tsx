import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import { FALLBACK_IMAGE, getTxEndpoint, PoolType } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { Carousel } from 'components/molecules/Carousel';
import { sortByMostContributed } from 'filters/pools';
import { LANGUAGE } from 'helpers/language';
import * as urls from 'helpers/urls';
import { ReduxPoolsUpdate } from 'state/pools/ReduxPoolsUpdate';
import { RootState } from 'state/store';

import * as S from './styles';

function PoolCard(props: PoolType) {
	const [poolUrl, setPoolsUrl] = React.useState<string | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);

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

	return poolUrl && imageUrl ? (
		<S.PCWrapper>
			<S.C1>
				<S.C1Content>
					<S.Title>{props.state.title}</S.Title>
					<S.Description>{parse(props.state.briefDescription)}</S.Description>
				</S.C1Content>
				<Link to={poolUrl}>
					<S.LinkContainer>
						<span>{LANGUAGE.viewPool}</span>
					</S.LinkContainer>
				</Link>
			</S.C1>
			<S.C2 image={imageUrl} />
		</S.PCWrapper>
	) : null;
}

export default function LandingPools() {
	const poolsReducer = useSelector((state: RootState) => state.poolsReducer);

	const [data, setData] = React.useState<PoolType[] | null>(null);

	React.useEffect(() => {
		if (poolsReducer.data) {
			setData(sortByMostContributed(poolsReducer.data, 5));
		}
	}, [poolsReducer.data]);

	function getPools() {
		return data.map((pool: PoolType) => {
			return <PoolCard {...pool} key={pool.id} />;
		});
	}

	function getData() {
		if (data) {
			return <Carousel title={LANGUAGE.activePools} data={getPools()} />;
		} else {
			return (
				<S.CarouselLoader>
					<S.CP>
						<Loader placeholder />
					</S.CP>
					<S.PCWrapper>
						<S.C1>
							<S.C1Content>
								<S.TP>
									<Loader placeholder />
								</S.TP>
								<S.DP>
									<Loader placeholder />
								</S.DP>
							</S.C1Content>
							<S.LP>
								<Loader placeholder />
							</S.LP>
						</S.C1>
						<S.C2P>
							<Loader placeholder />
						</S.C2P>
					</S.PCWrapper>
				</S.CarouselLoader>
			);
		}
	}

	return (
		<ReduxPoolsUpdate>
			<S.Wrapper>{getData()}</S.Wrapper>
		</ReduxPoolsUpdate>
	);
}

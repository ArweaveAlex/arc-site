import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { FALLBACK_IMAGE, getTxEndpoint, PoolClient, PoolFilterType, PoolType } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { Select } from 'components/atoms/Select';
import { PoolContribute } from 'global/PoolContribute';
import { ASSETS, POOL_FILTERS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import * as urls from 'helpers/urls';

import * as S from './styles';

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
							<p>{LANGUAGE.totalContributed}</p>
							<span>
								{poolClient.getARAmount(props.state.totalContributions)}
								<ReactSVG src={ASSETS.logoAlt2} />
							</span>
						</S.InfoCA>
					</S.Info>
				</>
			);
		} else {
			return <Loader placeholder />;
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
					<span>{LANGUAGE.contribute}</span>
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

export default function PoolsGrid(props: { data: PoolType[]; title: string; setCurrentFilter: (filter: any) => void }) {
	function getPools() {
		return props.data.map((pool: PoolType) => {
			return <PoolTile {...pool} key={pool.id} />;
		});
	}

	return (
		<S.Wrapper>
			<S.SubheaderFlex>
				<Select
					onChange={(e) => props.setCurrentFilter(e.target.value)}
					display={null}
					value={props.title}
					options={POOL_FILTERS.map((filter: PoolFilterType) => filter.title)}
					disabled={false}
				/>
			</S.SubheaderFlex>
			<S.Body>{getPools()}</S.Body>
		</S.Wrapper>
	);
}

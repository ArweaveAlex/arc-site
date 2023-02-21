import React from 'react';
import { Link } from 'react-router-dom';

import { Select } from 'components/atoms/Select';

import { PoolType, PoolFilterType } from 'helpers/types';
import { getTxEndpoint } from 'helpers/endpoints';
import * as urls from 'helpers/urls';
import { FALLBACK_IMAGE, POOL_FILTERS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import * as S from './styles';

function PoolTile(props: PoolType) {
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

	return poolUrl ? (
		<S.PCWrapper>
			<Link to={poolUrl}>
				{imageUrl && <S.C2 image={imageUrl} />}
				<S.Info>
					<S.InfoTitle>
						<p>{props.state.title}</p>
					</S.InfoTitle>
				</S.Info>
			</Link>
		</S.PCWrapper>
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
				<S.SubheaderContainer>
					<S.Subheader1>
						<p>{`${LANGUAGE.showing}:`}</p>
					</S.Subheader1>
					&nbsp;
					<S.Subheader2>
						<p>{props.title}</p>
					</S.Subheader2>
				</S.SubheaderContainer>
				<Select
					onChange={(e) => props.setCurrentFilter(e.target.value)}
					display={LANGUAGE.sortBy}
					value={props.title}
					options={POOL_FILTERS.map((filter: PoolFilterType) => filter.title)}
					disabled={false}
				/>
			</S.SubheaderFlex>
			<S.Body>{getPools()}</S.Body>
		</S.Wrapper>
	);
}

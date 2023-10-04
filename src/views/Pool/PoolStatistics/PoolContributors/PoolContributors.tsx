import React from 'react';
import { Link } from 'react-router-dom';

import { formatAddress, getProfile, PoolClient, UserClient } from 'arcframework';

import { ListPlaceholder } from 'components/atoms/ListPlaceholder';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

const ROW_COUNT = 3;

export default function PoolContributors(props: IProps) {
	let poolClient = new PoolClient();
	const arProvider = useArweaveProvider();

	const [topContributorList, setTopContributorList] = React.useState<React.ReactNode[]>([]);
	const [recentContributorList, setRecentContributorList] = React.useState<React.ReactNode[]>([]);

	React.useEffect(() => {
		async function getContributors(keys: string[]) {
			let userClient = new UserClient({ userWalletAddress: arProvider.walletAddress });

			if (props.data) {
				const contributorsPromises = keys.map(async (key: string, i: number) => {
					const profile = await getProfile(key);
					return (
						<S.Row key={i} isEnd={i !== 2}>
							<S.Number>
								<p>{i + 1}.</p>
							</S.Number>
							<S.Owner>
								<Link to={`${urls.libraryAll(key)}`}>{profile ? profile.handle : formatAddress(key, false)}</Link>
							</S.Owner>
							<S.Amount>
								<p>{poolClient.getARAmount(userClient.calcContributions(props.data.state.contributors[key]))}</p>
								&nbsp;
								<span>{`${language.arTokens} ${language.total}`}</span>
							</S.Amount>
							{/* <Count id={key} /> */}
						</S.Row>
					);
				});

				return await Promise.all(contributorsPromises);
			}
		}

		(async function () {
			let userClient = new UserClient({ userWalletAddress: arProvider.walletAddress });

			const contributors: any = props.data.state.contributors;

			const topContributorKeys: any = Object.keys(contributors)
				.sort(function (a, b) {
					return (
						Number(userClient.calcContributions(contributors[a])) -
						Number(userClient.calcContributions(contributors[b]))
					);
				})
				.reverse();

			const recentContributorKeys = Object.keys(props.data.state.contributors).reverse();

			setTopContributorList(await getContributors(topContributorKeys));
			setRecentContributorList(await getContributors(recentContributorKeys));
		})();
	}, [props.data]);

	function getBody(list: React.ReactNode[]) {
		if (list.length <= 0) {
			return (
				<S.NoContributionsContainer>
					<p>{language.noContributions}</p>
				</S.NoContributionsContainer>
			);
		} else {
			if (list.length >= ROW_COUNT) {
				return list.slice(0, ROW_COUNT);
			} else {
				return list;
			}
		}
	}

	return (
		<S.Wrapper>
			<S.CWrapper>
				<S.Header>
					<h2>{language.contributors.top}</h2>
				</S.Header>
				{topContributorList.length > 0 ? (
					<S.Body>{getBody(topContributorList)}</S.Body>
				) : (
					<ListPlaceholder rowCount={ROW_COUNT} rowHeight={40} rowMargin={10} />
				)}
			</S.CWrapper>
			<S.CWrapper>
				<S.Header>
					<h2>{language.contributors.recent}</h2>
				</S.Header>

				{recentContributorList.length > 0 ? (
					<S.Body>{getBody(recentContributorList)}</S.Body>
				) : (
					<ListPlaceholder rowCount={ROW_COUNT} rowHeight={40} rowMargin={10} />
				)}
			</S.CWrapper>
		</S.Wrapper>
	);
}

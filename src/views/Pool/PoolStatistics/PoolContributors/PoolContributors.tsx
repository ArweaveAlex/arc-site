import React from 'react';
import { Link } from 'react-router-dom';

import { formatAddress, PoolClient, UserClient } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { ListPlaceholder } from 'components/atoms/ListPlaceholder';
import { Modal } from 'components/molecules/Modal';
import { getProfiles } from 'gql';
import { language } from 'helpers/language';
import { ProfileType } from 'helpers/types';
import * as urls from 'helpers/urls';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

const ROW_COUNT = 3;

export default function PoolContributors(props: IProps) {
	let poolClient = new PoolClient();
	const arProvider = useArweaveProvider();

	const [profiles, setProfiles] = React.useState<ProfileType[] | null>(null);
	const [showViewAll, setShowViewAll] = React.useState<boolean>(false);

	const [topContributorList, setTopContributorList] = React.useState<React.ReactNode[]>([]);
	const [recentContributorList, setRecentContributorList] = React.useState<React.ReactNode[]>([]);
	const [fullContributorList, setFullContributorList] = React.useState<React.ReactNode[]>([]);

	React.useEffect(() => {
		(async function () {
			if (props.data && props.data.state.contributors) {
				const addresses = Object.keys(props.data.state.contributors).map((contributor: any) => contributor);
				const profiles = await getProfiles({ addresses: addresses });
				setProfiles(profiles);
			}
		})();
	}, [props.data]);

	React.useEffect(() => {
		function getContributors(addresses: string[]) {
			const userClient = new UserClient({ userWalletAddress: arProvider.walletAddress });
			const contributors = addresses.map((address: string, i: number) => {
				const profile = profiles.find((profile: ProfileType) => profile.walletAddress === address);
				return (
					<S.Row key={i}>
						<S.Number>
							<p>{i + 1}.</p>
						</S.Number>
						<S.Owner>
							<Link to={`${urls.libraryAll(address)}`}>
								{profile && profile.handle ? profile.handle : formatAddress(address, false)}
							</Link>
						</S.Owner>
						<S.Amount>
							<p>{poolClient.getARAmount(userClient.calcContributions(props.data.state.contributors[address]))}</p>
							&nbsp;
							<span>{`${language.arTokens} ${language.total}`}</span>
						</S.Amount>
					</S.Row>
				);
			});

			return contributors;
		}

		if (props.data && props.data.state.contributors && profiles) {
			const userClient = new UserClient({ userWalletAddress: arProvider.walletAddress });
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
			const fullContributorKeys = Object.keys(props.data.state.contributors);

			setTopContributorList(getContributors(topContributorKeys));
			setRecentContributorList(getContributors(recentContributorKeys));
			setFullContributorList(getContributors(fullContributorKeys));
		}
	}, [props.data, profiles]);

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
		<>
			<S.Wrapper>
				<S.TWrapper>
					<S.CWrapper>
						<S.Header>
							<h2>{language.contributors.top}</h2>
						</S.Header>
						{/* {topContributorList.length > 0 ? (
							<S.BWrapper>
								<S.Body>{getBody(topContributorList)}</S.Body>
							</S.BWrapper>
						) : (
							<ListPlaceholder rowCount={ROW_COUNT} rowHeight={40} rowMargin={10} />
						)} */}
						<S.BWrapper>
							<S.Body>{getBody(topContributorList)}</S.Body>
						</S.BWrapper>
					</S.CWrapper>
					<S.CWrapper>
						<S.Header>
							<h2>{language.contributors.recent}</h2>
						</S.Header>
						{/* {recentContributorList.length > 0 ? (
							<S.BWrapper>
								<S.Body>{getBody(recentContributorList)}</S.Body>
							</S.BWrapper>
						) : (
							<ListPlaceholder rowCount={ROW_COUNT} rowHeight={40} rowMargin={10} />
						)} */}
						<S.BWrapper>
							<S.Body>{getBody(recentContributorList)}</S.Body>
						</S.BWrapper>
					</S.CWrapper>
				</S.TWrapper>
				<S.VWrapper>
					<Button
						type={'alt2'}
						label={language.viewAllContributions}
						handlePress={() => setShowViewAll(true)}
						noMinWidth
					/>
				</S.VWrapper>
			</S.Wrapper>
			{showViewAll && props.data && profiles && (
				<Modal header={language.poolContributions(props.data.state.title)} handleClose={() => setShowViewAll(false)}>
					{/* {fullContributorList.length > 0 ? (
						<S.BFull>{fullContributorList}</S.BFull>
					) : (
						<ListPlaceholder rowCount={ROW_COUNT} rowHeight={40} rowMargin={10} />
					)} */}
					<S.BFull>
						{fullContributorList.length ? (
							fullContributorList
						) : (
							<S.NoContributionsContainer>
								<p>{language.noContributions}</p>
							</S.NoContributionsContainer>
						)}
					</S.BFull>
				</Modal>
			)}
		</>
	);
}

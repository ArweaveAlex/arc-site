import React from 'react';
import { Link } from 'react-router-dom';

import { ArweaveClient } from 'clients/arweave';

import { TableLoader } from 'components/atoms/TableLoader';

import { formatAddress } from 'helpers/utils';
import * as urls from 'helpers/urls';
import { LANGUAGE } from 'helpers/language';
import { IProps } from './types';
import * as S from './styles';

const ROW_COUNT = 3;

export default function PoolContributors(props: IProps) {
	const arClient = new ArweaveClient();

	function getBody(list: React.ReactNode[]) {
		if (list.length <= 0) {
			return (
				<S.NoContributionsContainer>
					<p>{LANGUAGE.noContributions}</p>
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

	function getTopContributors() {
		if (props.data) {
			const contributorList: React.ReactNode[] = [];
			const contributors: any = props.data.state.contributors;

			const sortedKeys: any = Object.keys(contributors)
				.sort(function (a, b) {
					return (
						Number(arClient.calcContributions(contributors[a])) -
						Number(arClient.calcContributions(contributors[b]))
					);
				})
				.reverse();

			for (let i = 0; i < sortedKeys.length; i++) {
				contributorList.push(
					<S.Row key={i} isEnd={i !== 2}>
						<S.Number>
							<p>{i + 1}.</p>
						</S.Number>
						<S.Owner>
							<Link to={`${urls.libraryAll(sortedKeys[i])}`}>{formatAddress(sortedKeys[i], false)}</Link>
						</S.Owner>
						<S.Amount>
							<p>
								{arClient.getARAmount(
									arClient.calcContributions(props.data.state.contributors[sortedKeys[i]])
								)}
							</p>
							&nbsp;
							<span>{`${LANGUAGE.arTokens} ${LANGUAGE.total}`}</span>
						</S.Amount>
						{/* <Count id={sortedKeys[i]} /> */}
					</S.Row>
				);
			}
			return <S.Body>{getBody(contributorList)}</S.Body>;
		} else {
			return <TableLoader rowCount={ROW_COUNT} />;
		}
	}

	function getRecentContributors() {
		if (props.data) {
			const contributorList: React.ReactNode[] = [];
			const contributorKeys = Object.keys(props.data.state.contributors);
			for (let i = 0; i < contributorKeys.length; i++) {
				contributorList.push(
					<S.Row key={i} isEnd={i !== 2}>
						<S.RecentOwner>
							<Link to={`${urls.libraryAll(contributorKeys[i])}`}>
								{formatAddress(contributorKeys[i], false)}
							</Link>
						</S.RecentOwner>
						<S.Amount>
							<p>
								{arClient.getARAmount(
									arClient.calcContributions(props.data.state.contributors[contributorKeys[i]])
								)}
							</p>
							&nbsp;
							<span>{`${LANGUAGE.arTokens}`}</span>
						</S.Amount>
					</S.Row>
				);
			}
			return <S.Body>{getBody(contributorList)}</S.Body>;
		} else {
			return <TableLoader rowCount={ROW_COUNT} />;
		}
	}

	return (
		<S.Wrapper>
			<S.CWrapper>
				<S.Header>
					<h2>{LANGUAGE.contributors.top}</h2>
				</S.Header>
				{getTopContributors()}
			</S.CWrapper>
			<S.CWrapper>
				<S.Header>
					<h2>{LANGUAGE.contributors.recent}</h2>
				</S.Header>
				{getRecentContributors()}
			</S.CWrapper>
		</S.Wrapper>
	);
}

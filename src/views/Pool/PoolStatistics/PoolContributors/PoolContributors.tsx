import React from 'react';
import { Link } from 'react-router-dom';

import { formatAddress, PoolClient } from 'arcframework';

import { Placeholder } from 'components/atoms/Placeholder';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';

import * as S from './styles';
import { IProps } from './types';

const ROW_COUNT = 3;

export default function PoolContributors(props: IProps) {
	const poolClient = new PoolClient();

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

	function getTopContributors() {
		if (props.data) {
			const contributorList: React.ReactNode[] = [];
			const contributors: any = props.data.state.contributors;

			const sortedKeys: any = Object.keys(contributors)
				.sort(function (a, b) {
					return (
						Number(poolClient.calcContributions(contributors[a])) -
						Number(poolClient.calcContributions(contributors[b]))
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
								{poolClient.getARAmount(poolClient.calcContributions(props.data.state.contributors[sortedKeys[i]]))}
							</p>
							&nbsp;
							<span>{`${language.arTokens} ${language.total}`}</span>
						</S.Amount>
						{/* <Count id={sortedKeys[i]} /> */}
					</S.Row>
				);
			}
			return <S.Body>{getBody(contributorList)}</S.Body>;
		} else {
			return <Placeholder rowCount={ROW_COUNT} />;
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
							<Link to={`${urls.libraryAll(contributorKeys[i])}`}>{formatAddress(contributorKeys[i], false)}</Link>
						</S.RecentOwner>
						<S.Amount>
							<p>
								{poolClient.getARAmount(
									poolClient.calcContributions(props.data.state.contributors[contributorKeys[i]])
								)}
							</p>
							&nbsp;
							<span>{`${language.arTokens}`}</span>
						</S.Amount>
					</S.Row>
				);
			}
			return <S.Body>{getBody(contributorList)}</S.Body>;
		} else {
			return <Placeholder rowCount={ROW_COUNT} />;
		}
	}

	return (
		<S.Wrapper>
			<S.CWrapper>
				<S.Header>
					<h2>{language.contributors.top}</h2>
				</S.Header>
				{getTopContributors()}
			</S.CWrapper>
			<S.CWrapper>
				<S.Header>
					<h2>{language.contributors.recent}</h2>
				</S.Header>
				{getRecentContributors()}
			</S.CWrapper>
		</S.Wrapper>
	);
}

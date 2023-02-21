import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';

import { getPoolById } from 'gql/pools';
import { getArtifactById } from 'gql/artifacts';
import { sortByAssociationSequence } from 'filters/artifacts';
import { ArtifactDetailType, PoolType } from 'helpers/types';
import { formatAddress, formatDate } from 'helpers/utils';
import { LANGUAGE } from 'helpers/language';
import * as urls from 'helpers/urls';
import { IProps } from '../../types';
import * as S from './styles';

import { MessagingListItem } from 'global/MessagingListItem';

export default function ArtifactMessagingList(props: IProps) {
	const { id } = useParams();

	const [threadData, setThreadData] = React.useState<ArtifactDetailType[]>(null);
	const [headerData, setHeaderData] = React.useState<PoolType | null>(null);
	const [detailData, setDetailData] = React.useState<ArtifactDetailType | null>(null);

	const [showAction, setShowAction] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (props.data) {
			setThreadData(sortByAssociationSequence(props.data));
			setTimeout(() => {
				setShowAction(true);
			}, 100);
		}
	}, [props.data]);

	React.useEffect(() => {
		(async function () {
			if (props.data && props.data.length) {
				setHeaderData(await getPoolById(props.data[0].poolId));
			}
		})();
	}, [props.data]);

	React.useEffect(() => {
		(async function () {
			if (id) {
				setDetailData(await getArtifactById(id));
			}
		})();
	}, [id]);

	function updateSequence() {
		setShowAction(false);
		props.updateSequence();
	}

	function getAction() {
		if (props.loading) {
			return <Loader sm />;
		}
		if (showAction) {
			return (
				<Button
					type={'alt2'}
					label={LANGUAGE.showMoreReplies}
					handlePress={() => updateSequence()}
					disabled={props.updateDisabled}
				/>
			);
		}
		return null;
	}

	function getThreadData() {
		if (!threadData) {
			return (
				<S.LoadingContainerInit>
					<Loader sm />
				</S.LoadingContainerInit>
			);
		} else {
			return (
				<>
					{threadData.map((artifact: ArtifactDetailType, index: number) => {
						return (
							<MessagingListItem
								key={index}
								data={artifact}
								isListItem={true}
								active={detailData ? detailData.artifactId === artifact.artifactId : false}
								showArtifactLink={true}
								showOwnerLink={true}
							/>
						);
					})}
					<S.ActionContainer>{getAction()}</S.ActionContainer>
				</>
			);
		}
	}

	function getHeaderData() {
		if (!headerData) {
			return <Loader sm />;
		} else {
			return (
				<S.HeaderContent>
					<Link to={`${urls.pool}${headerData.id}`}>{headerData.state.title}</Link>
					<S.SubheaderFlex>
						<S.SubheaderContainer>
							<S.Subheader1>
								<p>{LANGUAGE.pool.subheader1}</p>
							</S.Subheader1>
							&nbsp;
							<S.ID>
								<Link to={`${urls.pool}${headerData.id}`}>
									{headerData.id ? formatAddress(headerData.id, false) : null}
								</Link>
							</S.ID>
						</S.SubheaderContainer>
						<S.SubheaderContainer>
							<S.Subheader1>
								<p>{LANGUAGE.createdOn}</p>
							</S.Subheader1>
							&nbsp;
							<S.Subheader2>
								<p>
									{headerData.state.timestamp
										? formatDate(headerData.state.timestamp, 'epoch')
										: null}
								</p>
							</S.Subheader2>
						</S.SubheaderContainer>
					</S.SubheaderFlex>
				</S.HeaderContent>
			);
		}
	}

	function getDetailData() {
		if (!detailData) {
			return <Loader sm />;
		} else {
			return (
				<MessagingListItem
					data={detailData}
					isListItem={false}
					active={true}
					showArtifactLink={true}
					showOwnerLink={true}
				/>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.ListWrapper>{getThreadData()}</S.ListWrapper>
			<S.HDWrapper>
				<S.HDContent>
					<S.HeaderWrapper>{getHeaderData()}</S.HeaderWrapper>
					<S.DetailWrapper>{getDetailData()}</S.DetailWrapper>
				</S.HDContent>
			</S.HDWrapper>
		</S.Wrapper>
	);
}

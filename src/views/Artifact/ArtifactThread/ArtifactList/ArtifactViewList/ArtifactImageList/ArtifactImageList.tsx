import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { ArtifactDetailType, formatAddress, formatDate, getArtifactById, getPoolById, PoolType } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { Carousel } from 'components/molecules/Carousel';
import { ImageListItem } from 'components/organisms/ImageListItem';
import { sortByAssociationSequence } from 'filters/artifacts';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';

import { IProps } from '../../types';

import * as S from './styles';

export default function ArtifactImageList(props: IProps) {
	const { id } = useParams();

	const [listData, setListData] = React.useState<ArtifactDetailType[]>(null);
	const [headerData, setHeaderData] = React.useState<PoolType | null>(null);
	const [detailData, setDetailData] = React.useState<ArtifactDetailType | null>(null);

	const [showAction, setShowAction] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (props.data) {
			setListData(sortByAssociationSequence(props.data));
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

	function getSortedList() {
		if (detailData) {
			let mergedList = [detailData, ...listData];
			const existingArtifact = listData.find((artifact: any) => artifact.artifactId === detailData.artifactId);
			if (existingArtifact) {
				const index = listData.findIndex((artifact: any) => artifact.artifactId === detailData.artifactId);
				if (index !== -1) {
					mergedList = [detailData, ...listData.splice(index, 1)];
				}
			}
			return mergedList;
		} else {
			return listData;
		}
	}

	function getArtifactList() {
		const sortedList = getSortedList();
		return sortedList.map((artifact: ArtifactDetailType, index: number) => {
			return (
				<ImageListItem
					key={index}
					data={artifact}
					isListItem={true}
					active={detailData ? detailData.artifactId === artifact.artifactId : false}
					showArtifactLink={true}
					showOwnerLink={true}
				/>
			);
		});
	}

	function getListData() {
		if (!listData) {
			return <Loader />;
		} else {
			return (
				<Carousel
					title={language.artifactGroup}
					data={getArtifactList()}
					callback={{ fn: updateSequence, disabled: props.updateDisabled || !showAction }}
				/>
			);
		}
	}

	function getHeaderData() {
		if (!headerData) {
			return (
				<S.HContainer>
					<S.TP>
						<Loader placeholder />
					</S.TP>
					<S.DP>
						<Loader placeholder />
					</S.DP>
				</S.HContainer>
			);
		} else {
			return (
				<S.HContainer>
					<Link to={`${urls.pool}${headerData.id}`}>{headerData.state.title}</Link>
					<S.SubheaderFlex>
						<S.SubheaderContainer>
							<S.Subheader1>
								<p>{language.pool.subheader1}</p>
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
								<p>{language.createdOn}</p>
							</S.Subheader1>
							&nbsp;
							<S.Subheader2>
								<p>{headerData.state.timestamp ? formatDate(headerData.state.timestamp, 'epoch') : null}</p>
							</S.Subheader2>
						</S.SubheaderContainer>
					</S.SubheaderFlex>
				</S.HContainer>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.HDWrapper>
				<S.HDContentWrapper>
					<S.HDContent>
						<S.HeaderWrapper>
							<S.HeaderContent>{getHeaderData()}</S.HeaderContent>
						</S.HeaderWrapper>
					</S.HDContent>
				</S.HDContentWrapper>
			</S.HDWrapper>
			<S.ListWrapper>{getListData()}</S.ListWrapper>
		</S.Wrapper>
	);
}

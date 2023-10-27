import React from 'react';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { formatAddress, formatCount, formatDate, PoolClient } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { SocialShare } from 'components/organisms/SocialShare';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import { PoolContribute } from '../../../components/organisms/PoolContribute';

import * as S from './styles';
import { IProps } from './types';

export default function PoolHeader(props: IProps) {
	const poolClient = new PoolClient();

	const [copied, setCopied] = React.useState<boolean>(false);
	const [showContributeModal, setShowContributeModal] = React.useState<boolean>(false);

	const copyAddress = React.useCallback(async () => {
		if (props.id) {
			if (props.id.length > 0) {
				await navigator.clipboard.writeText(props.id);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, [props.id]);

	function getSubheader() {
		return (
			<S.SubheaderFlex>
				<S.SubheaderContainer>
					<S.Subheader1>
						<p>{language.pool.subheader1}</p>
					</S.Subheader1>
					&nbsp;
					<S.ID>
						<p>{props.id ? formatAddress(props.id, false) : null}</p>
						<IconButton type={'primary'} src={ASSETS.copy} handlePress={copyAddress} sm />
						{copied && (
							<S.IDCopied>
								<p>{language.copied}</p>
							</S.IDCopied>
						)}
					</S.ID>
				</S.SubheaderContainer>
				&nbsp; &nbsp;
				<S.SubheaderContainer>
					<S.Subheader1>
						<p>{language.createdOn}</p>
					</S.Subheader1>
					&nbsp;
					<S.Subheader2>
						<p>{props.dateCreated ? formatDate(props.dateCreated, 'epoch') : null}</p>
					</S.Subheader2>
				</S.SubheaderContainer>
			</S.SubheaderFlex>
		);
	}

	function getCount() {
		if (props.count || props.count === 0) {
			return <p>{formatCount(props.count!.toString())}</p>;
		} else {
			return <Loader sm />;
		}
	}

	function getImage() {
		if (props.image) {
			return (
				<S.ImageContainer>
					<S.Image image={props.image} />
				</S.ImageContainer>
			);
		} else {
			return (
				<S.ImageLoading>
					<Loader placeholder />
				</S.ImageLoading>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.HeaderWrapper>
				<S.HeaderContent>
					<h2>{props.title ? props.title : null}</h2>
					<S.SHWrapper>
						<SocialShare type={'primary'} href={window.location.href} title={language.sharePool} />
						<S.SHCWrapper>
							<Button
								type={'alt2'}
								active
								label={language.contribute}
								handlePress={() => setShowContributeModal(true)}
								height={52.5}
								width={275}
								icon={ASSETS.logoAltActive}
								iconLeftAlign
							/>
						</S.SHCWrapper>
					</S.SHWrapper>
				</S.HeaderContent>
				{getSubheader()}
			</S.HeaderWrapper>
			{getImage()}
			<S.LongDescription>
				<S.Header>
					<h2>{language.about}</h2>
				</S.Header>
				<S.LDBody>{props.description ? parse(props.description) : null}</S.LDBody>
			</S.LongDescription>
			<S.Header>
				<h2>{language.contributions}</h2>
			</S.Header>
			<S.FlexTiles>
				<S.Tile>
					<S.TileTitle>
						<p>{language.totalContributed}</p>
					</S.TileTitle>
					<S.TileData>
						<p>{props.totalContributions ? poolClient.getARAmount(props.totalContributions) : null}</p>
						<S.TContainer>
							<p>{language.arTokens}</p>
						</S.TContainer>
					</S.TileData>
				</S.Tile>
				<S.Tile>
					<S.TileTitle>
						<p>{language.artifactCount}</p>
					</S.TileTitle>
					<S.TileData>{getCount()}</S.TileData>
				</S.Tile>
				<S.ContributeTile>
					<S.ContributeAction onClick={() => setShowContributeModal(true)} disabled={props.ownerMaintained}>
						<S.ContributeLabel>
							<S.ContributeLabel>
								<ReactSVG src={ASSETS.logoAltActive} />
								<span>{language.contribute}</span>
							</S.ContributeLabel>
						</S.ContributeLabel>
					</S.ContributeAction>
					{showContributeModal && (
						<PoolContribute
							poolId={props.id ? props.id : null}
							header={props.title ? props.title : null}
							dateCreated={props.dateCreated ? props.dateCreated : null}
							totalContributions={props.totalContributions ? props.totalContributions : null}
							contributors={props.contributors ? props.contributors : null}
							contribPercent={props.contribPercent ? props.contribPercent : null}
							handleShowModal={() => setShowContributeModal(false)}
						/>
					)}
				</S.ContributeTile>
			</S.FlexTiles>
		</S.Wrapper>
	);
}

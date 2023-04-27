import React from 'react';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import { formatAddress, formatCount, PoolClient } from 'arcframework';

import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { SocialShare } from 'global/SocialShare';
import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';

import { PoolContribute } from '../../../global/PoolContribute';

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
						<p>{LANGUAGE.pool.subheader1}</p>
					</S.Subheader1>
					&nbsp;
					<S.ID>
						<p>{props.id ? formatAddress(props.id, false) : null}</p>
						<IconButton type={'primary'} src={ASSETS.copy} handlePress={copyAddress} sm />
						{copied && (
							<S.IDCopied>
								<p>{LANGUAGE.copied}</p>
							</S.IDCopied>
						)}
					</S.ID>
				</S.SubheaderContainer>
				&nbsp; &nbsp;
				<S.SubheaderContainer>
					<S.Subheader1>
						<p>{LANGUAGE.createdOn}</p>
					</S.Subheader1>
					&nbsp;
					<S.Subheader2>
						<p>{props.dateCreated ? props.dateCreated : null}</p>
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
					<SocialShare type={'primary'} href={window.location.href} title={LANGUAGE.sharePool} />
				</S.HeaderContent>
				{getSubheader()}
			</S.HeaderWrapper>
			{getImage()}
			<S.FlexTiles>
				<S.Tile>
					<S.TileTitle>
						<p>{LANGUAGE.totalContributed}</p>
					</S.TileTitle>
					<S.TileData>
						<p>{props.totalContributions ? poolClient.getARAmount(props.totalContributions) : null}</p>
						<S.TContainer>
							<p>{LANGUAGE.arTokens}</p>
						</S.TContainer>
					</S.TileData>
				</S.Tile>
				<S.Tile>
					<S.TileTitle>
						<p>{LANGUAGE.pool.artifactsCreated}</p>
					</S.TileTitle>
					<S.TileData>{getCount()}</S.TileData>
				</S.Tile>
				<S.ContributeTile>
					<S.ContributeAction onClick={() => setShowContributeModal(true)} disabled={props.ownerMaintained}>
						<S.ContributeLabel>
							<S.ContributeLabel>
								<ReactSVG src={ASSETS.logoAltActive} />
								<span>{LANGUAGE.contribute}</span>
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
			<S.LongDescription>
				<S.LDHeader>
					<h2>{LANGUAGE.about}</h2>
				</S.LDHeader>
				<S.LDBody>{props.description ? parse(props.description) : null}</S.LDBody>
			</S.LongDescription>
		</S.Wrapper>
	);
}

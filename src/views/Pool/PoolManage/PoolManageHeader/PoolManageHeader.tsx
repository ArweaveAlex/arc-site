import React from 'react';

import { formatAddress, formatCount, formatDate, PoolClient } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

// TODO: get balances
// TODO: eject
export default function PoolManageHeader(props: IProps) {
	const poolClient = new PoolClient();

	const [copied, setCopied] = React.useState<boolean>(false);

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

	return (
		<S.Wrapper>
			<S.HeaderWrapper>
				<S.HeaderContent>
					<S.Header>
						<h2>{props.title ? `${language.managePool}: ${props.title}` : null}</h2>
						{getSubheader()}
					</S.Header>
					<S.Actions>
						<Button
							type={'alt1'}
							label={'Eject Pool Configuration'}
							handlePress={() => console.log('Eject')}
							height={52.5}
							width={275}
						/>
					</S.Actions>
				</S.HeaderContent>
				<S.InfoWrapper>
					<S.FlexTiles>
						<S.TileAlt>
							<S.TileTitle>
								<p>{`${language.poolBalance}:`}</p>
							</S.TileTitle>
							&nbsp;
							<S.TileData>
								<p>{6.56}</p>
								<S.TContainer>
									<p>{language.arTokens}</p>
								</S.TContainer>
							</S.TileData>
						</S.TileAlt>
						<S.Tile>
							<S.TileTitle>
								<p>{`${language.walletBalance}:`}</p>
							</S.TileTitle>
							&nbsp;
							<S.TileData>
								<p>{10}</p>
								<S.TContainer>
									<p>{language.arTokens}</p>
								</S.TContainer>
							</S.TileData>
						</S.Tile>
						<S.Tile>
							<S.TileTitle>
								<p>{`${language.totalContributed}:`}</p>
							</S.TileTitle>
							&nbsp;
							<S.TileData>
								<p>{props.totalContributions ? poolClient.getARAmount(props.totalContributions) : null}</p>
								<S.TContainer>
									<p>{language.arTokens}</p>
								</S.TContainer>
							</S.TileData>
						</S.Tile>
						<S.Tile>
							{(props.count || props.count === 0) && (
								<S.TileTitle>
									<p>{`${language.pool.artifactsCreated}:`}</p>
								</S.TileTitle>
							)}
							&nbsp;
							<S.TileData>{getCount()}</S.TileData>
						</S.Tile>
					</S.FlexTiles>
				</S.InfoWrapper>
			</S.HeaderWrapper>
		</S.Wrapper>
	);
}

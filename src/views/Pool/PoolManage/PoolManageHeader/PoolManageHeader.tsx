import React from 'react';
import { ReactSVG } from 'react-svg';

import * as ArcFramework from 'arcframework';

import { Button } from 'components/atoms/Button';
import { ButtonLink } from 'components/atoms/ButtonLink';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Modal } from 'components/molecules/Modal';
import { APP, ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';

import * as S from './styles';
import { IProps } from './types';

// TODO: fund bundlr
// TODO: get balances
// TODO: progress bar
export default function PoolManageHeader(props: IProps) {
	const [poolClient, setPoolClient] = React.useState<any>(null);
	const [copied, setCopied] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [balances, setBalances] = React.useState<ArcFramework.PoolBalancesType | null>(null);
	const [showPoolBalanceInfo, setShowPoolBalanceInfo] = React.useState<boolean>(false);

	// React.useEffect(() => {
	// 	ArcFramework.initPoolConfigFromContract(props.id).then((poolConfig) => {
	// 		setPoolClient(new ArcFramework.PoolClient({ poolConfig }));
	// 	});
	// }, []);

	React.useEffect(() => {
		(async function () {
			const poolConfig = await ArcFramework.initPoolConfigFromContract(props.id);
			poolConfig.walletKey = window.arweaveWallet;
			setPoolClient(new ArcFramework.PoolClient({ poolConfig }));
		})();
	}, []);

	React.useEffect(() => {
		(async function () {
			if (poolClient) {
				await poolClient.arClient.bundlr.ready();
				setBalances(await poolClient.balances());
			}
		})();
	}, [poolClient]);

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
						<p>{props.id ? ArcFramework.formatAddress(props.id, false) : null}</p>
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
						<p>{props.dateCreated ? ArcFramework.formatDate(props.dateCreated, 'epoch') : null}</p>
					</S.Subheader2>
				</S.SubheaderContainer>
			</S.SubheaderFlex>
		);
	}

	function getCount() {
		if (props.count || props.count === 0) {
			return <p>{ArcFramework.formatCount(props.count!.toString())}</p>;
		} else {
			return <Loader sm />;
		}
	}

	// TODO: calc pool balance
	function getPoolBalance() {
		if (balances && poolClient) {
			return poolClient.getARAmount(balances.bundlrBalance).toFixed(3);
		} else {
			return '-';
		}
	}

	const downloadPoolConfig = async () => {
		setLoading(true);
		const poolConfig = await ArcFramework.initPoolConfigFromContract(props.id);
		const blob = new Blob([JSON.stringify(poolConfig, null, 4)], { type: 'application/json' });
		const href = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = href;
		link.download = APP.poolConfig;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		setLoading(false);
	};

	console.log(balances);

	const hasArweaveBalance = balances && balances.arweaveBalance > 0;
	const hasBundlrBalance = balances && balances.bundlrBalance > 0;

	return (
		<>
			{showPoolBalanceInfo && (
				<Modal header={language.poolBalance} handleClose={() => setShowPoolBalanceInfo(false)}>
					<S.PoolBalanceInfo>
						<p>{language.poolBalanceInfo}</p>
					</S.PoolBalanceInfo>
				</Modal>
			)}
			<S.Wrapper>
				<S.HeaderWrapper>
					<S.HeaderContent>
						<S.H1>
							<h2>{props.title ? `${language.managePool}: ${props.title}` : null}</h2>
							{getSubheader()}
						</S.H1>
						<S.H2>
							{balances ? (
								<>
									<S.PoolBalance>
										<S.TileTitle>
											<p>{`${language.poolBalance}:`}</p>
										</S.TileTitle>
										&nbsp;
										<S.TileData>
											<p>{getPoolBalance()}</p>
											<S.TContainer>
												<p>{language.arTokens}</p>
											</S.TContainer>
										</S.TileData>
										<S.TileInfo>
											<IconButton
												type={'primary'}
												src={ASSETS.info}
												handlePress={() => setShowPoolBalanceInfo(!showPoolBalanceInfo)}
												sm
											/>
										</S.TileInfo>
									</S.PoolBalance>
									<S.ProgressWrapper>
										<S.PIWrapper>
											<S.ProgressIndicator completed={hasArweaveBalance}>
												{hasArweaveBalance && <ReactSVG src={ASSETS.checkmark} />}
											</S.ProgressIndicator>
											<p>{language.funded}</p>
										</S.PIWrapper>
										<S.PD1 />
										<S.PIWrapper>
											<S.ProgressIndicator completed={hasBundlrBalance}>
												{hasBundlrBalance && <ReactSVG src={ASSETS.checkmark} />}
											</S.ProgressIndicator>
											<p>{language.transferred}</p>
										</S.PIWrapper>
										<S.PD2 />
										<S.PIWrapper>
											<S.ProgressIndicator completed={hasArweaveBalance && hasBundlrBalance}>
												{hasArweaveBalance && hasBundlrBalance && <ReactSVG src={ASSETS.checkmark} />}
											</S.ProgressIndicator>
											<p>{language.ready}</p>
										</S.PIWrapper>
									</S.ProgressWrapper>
								</>
							) : (
								<Loader sm />
							)}
						</S.H2>
					</S.HeaderContent>
					<S.InfoWrapper>
						<S.FlexTiles>
							<S.Tile>
								<S.TileTitle>
									<p>{`${language.totalContributed}:`}</p>
								</S.TileTitle>
								&nbsp;
								<S.TileData>
									<p>
										{poolClient && props.totalContributions ? poolClient.getARAmount(props.totalContributions) : null}
									</p>
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
						<S.Actions>
							<Button
								type={'alt1'}
								label={language.fundPool}
								handlePress={() => console.log('Fund pool')}
								disabled={loading}
								noMinWidth
							/>
							<ButtonLink type={'alt1'} label={language.viewPool} href={`${urls.pool}${props.id}`} noMinWidth />
							<ButtonLink type={'alt1'} label={language.viewAccount} href={`${urls.accountPools}`} noMinWidth />
							<Button
								type={'alt1'}
								label={language.downloadPoolConfig}
								handlePress={() => downloadPoolConfig()}
								disabled={loading}
								tooltip={language.downloadPoolConfigTooltip}
							/>
						</S.Actions>
					</S.InfoWrapper>
				</S.HeaderWrapper>
			</S.Wrapper>
		</>
	);
}

import React from 'react';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';

import * as ArcFramework from 'arcframework';

import { Button } from 'components/atoms/Button';
import { ButtonLink } from 'components/atoms/ButtonLink';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Modal } from 'components/molecules/Modal';
import { APP, ASSETS, POOL_TEST_MODE } from 'helpers/config';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

export default function PoolManageHeader(props: IProps) {
	const arProvider = useArweaveProvider();

	const [poolClient, setPoolClient] = React.useState<any>(null);
	const [copied, setCopied] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(false);

	const [balances, setBalances] = React.useState<ArcFramework.PoolBalancesType | null>(null);

	const [showTransfer, setShowTransfer] = React.useState<boolean>(false);
	const [transferAmount, setTransferAmount] = React.useState<number>(0);

	const [showPoolBalanceInfo, setShowPoolBalanceInfo] = React.useState<boolean>(false);
	const [fundsNotification, setFundsNotification] = React.useState<ArcFramework.NotificationResponseType | null>(null);

	const [showPoolIdInput, setShowPoolIdInput] = React.useState<boolean>(false);
	const [poolIdInput, setPoolIdInput] = React.useState<string>('');

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress) {
				const poolConfigClient = new ArcFramework.PoolConfigClient({ testMode: POOL_TEST_MODE });
				const poolConfig = await poolConfigClient.initFromContract({ poolId: props.id });
				if (poolConfig) {
					poolConfig.walletKey = window.arweaveWallet;
					setPoolClient(new ArcFramework.PoolClient({ poolConfig }));
				}
			}
		})();
	}, [props.id, arProvider.walletAddress]);

	React.useEffect(() => {
		(async function () {
			if (poolClient) {
				await poolClient.arClient.bundlr.ready();
				setBalances(await poolClient.balances());
			} else {
				setBalances({
					totalBalance: 0,
					arweaveBalance: 0,
					bundlrBalance: 0,
					usedFunds: 0,
					userBalance: 0,
					poolBalance: 0,
					transferBalance: 0,
				});
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

	function getPoolBalance() {
		if (balances && balances.bundlrBalance > 0 && poolClient) {
			return poolClient.getARAmount(balances.bundlrBalance).toFixed(2);
		} else {
			return '0';
		}
	}

	function getTransferDisabled() {
		if (balances) {
			return balances.poolBalance <= 0 || balances.transferBalance <= 0;
		}
		return true;
	}

	function calcTransferAmount() {
		return transferAmount * 1e12;
	}

	async function transferFunds(e: any) {
		e.preventDefault();
		if (balances && poolClient && transferAmount) {
			setLoading(true);
			try {
				await poolClient.fundBundlr(calcTransferAmount());
				setFundsNotification({
					status: true,
					message: language.fundsTransferInitiatedMessage,
				});
			} catch (e: any) {
				console.error(e);
				setFundsNotification({
					status: false,
					message: language.fundsTransferFailedMessage,
				});
			}
			setLoading(false);
		}
	}

	async function downloadPoolConfig(e: any) {
		e.preventDefault();
		if (poolIdInput) {
			const poolId = poolIdInput.replace(/ /g, '-');
			setLoading(true);
			const poolConfigClient = new ArcFramework.PoolConfigClient({ testMode: POOL_TEST_MODE });
			const poolConfig = await poolConfigClient.initFromContract({ poolId: props.id });

			if (poolConfig) {
				const blob = new Blob([JSON.stringify({ [poolId]: poolConfig }, null, 4)], { type: 'application/json' });
				const href = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = href;
				link.download = APP.poolConfig;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} else {
				alert(language.poolConfigurationNotFound);
			}
			setLoading(false);
		}
	}

	const hasPoolBalance = balances && (balances.poolBalance > 0 || balances.bundlrBalance > 0);
	const hasBundlrBalance = balances && balances.bundlrBalance > 0;

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

	// function getCount() {
	// 	if (props.count || props.count === 0) {
	// 		return <p>{ArcFramework.formatCount(props.count!.toString())}</p>;
	// 	} else {
	// 		return <Loader sm />;
	// 	}
	// }

	function getInvalidTransferAmount() {
		if (!balances || !transferAmount) return { status: false, message: null };
		if (calcTransferAmount() > balances.poolBalance)
			return { status: true, message: language.amountExceedsMaxTransferAmount };
		return { status: false, message: null };
	}

	return (
		<>
			{showPoolBalanceInfo && (
				<Modal header={language.poolBalance} handleClose={() => setShowPoolBalanceInfo(false)}>
					<S.PoolBalanceInfo>
						<p>{parse(language.poolBalanceInfo)}</p>
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
											<S.ProgressIndicator completed={hasPoolBalance}>
												{hasPoolBalance && <ReactSVG src={ASSETS.checkmark} />}
											</S.ProgressIndicator>
											<p>{language.funded}</p>
										</S.PIWrapper>
										<S.PD1 />
										<S.PIWrapper>
											<S.ProgressIndicator completed={hasPoolBalance && hasBundlrBalance}>
												{hasPoolBalance && hasBundlrBalance && <ReactSVG src={ASSETS.checkmark} />}
											</S.ProgressIndicator>
											<p>{language.transferred}</p>
										</S.PIWrapper>
										<S.PD2 />
										<S.PIWrapper>
											<S.ProgressIndicator completed={hasPoolBalance && hasBundlrBalance}>
												{hasPoolBalance && hasBundlrBalance && <ReactSVG src={ASSETS.checkmark} />}
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
										{poolClient && props.totalContributions ? poolClient.getARAmount(props.totalContributions) : `0`}
									</p>
									<S.TContainer>
										<p>{language.arTokens}</p>
									</S.TContainer>
								</S.TileData>
							</S.Tile>
							{/* <S.Tile>
								{(props.count || props.count === 0) && (
									<S.TileTitle>
										<p>{`${language.pool.artifactsCreated}:`}</p>
									</S.TileTitle>
								)}
								&nbsp;
								<S.TileData>{getCount()}</S.TileData>
							</S.Tile> */}
						</S.FlexTiles>
						<S.Actions>
							<Button
								type={'alt1'}
								label={language.transferFunds}
								handlePress={() => setShowTransfer(true)}
								disabled={loading || getTransferDisabled()}
								noMinWidth
							/>
							<Button
								type={'alt1'}
								label={language.downloadPoolConfig}
								handlePress={() => setShowPoolIdInput(true)}
								disabled={loading}
								tooltip={language.downloadPoolConfigTooltip}
							/>
							<ButtonLink
								type={'alt1'}
								label={language.viewPool}
								href={`${urls.pool}${props.id}`}
								disabled={loading}
								noMinWidth
							/>
						</S.Actions>
					</S.InfoWrapper>
				</S.HeaderWrapper>
			</S.Wrapper>
			{showPoolIdInput && (
				<Modal header={language.poolConfiguration} handleClose={() => setShowPoolIdInput(false)}>
					<S.MWrapper>
						<S.MText>
							<p>{parse(language.poolConfigurationInfo)}</p>
						</S.MText>
						<S.MForm
							onSubmit={(e: any) => {
								downloadPoolConfig(e);
							}}
						>
							<S.MFormField>
								<FormField
									value={poolIdInput}
									label={language.poolId}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPoolIdInput(e.target.value)}
									disabled={loading || !arProvider.walletAddress}
									invalid={{ status: false, message: null }}
								/>
							</S.MFormField>
							<S.MActions>
								<ButtonLink
									type={'primary'}
									label={language.viewDocs}
									href={`${urls.docs}creating-a-pool/pool-creation-ui`}
									targetBlank
									noMinWidth
								/>
								<Button
									type={'alt1'}
									label={language.download}
									handlePress={(e: any) => {
										downloadPoolConfig(e);
									}}
									formSubmit
									disabled={!poolIdInput || loading}
									noMinWidth
								/>
							</S.MActions>
						</S.MForm>
					</S.MWrapper>
				</Modal>
			)}
			{showTransfer && (
				<Modal header={language.transferFunds} handleClose={() => setShowTransfer(false)}>
					<S.MWrapper>
						<S.MHeader>
							<S.MHeaderFlex>
								<S.MH2>{language.transferPoolFunds}</S.MH2>
							</S.MHeaderFlex>
						</S.MHeader>
						<S.MText>
							<p>{language.transferPoolFundsInfo}</p>
						</S.MText>
						{balances && balances.poolBalance && (
							<S.BalanceWrapper>
								<S.AvailableBalance>{language.maxTransferAmount}:&nbsp;</S.AvailableBalance>
								<S.BalanceAmount>{poolClient.getARAmount(balances.poolBalance).toFixed(2)}&nbsp;</S.BalanceAmount>
								<S.ARTokens>{language.arTokens}</S.ARTokens>
							</S.BalanceWrapper>
						)}
						<S.MForm
							onSubmit={(e: any) => {
								transferFunds(e);
							}}
						>
							<S.MFormField>
								<FormField
									type={'number'}
									value={transferAmount}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTransferAmount(parseFloat(e.target.value))}
									disabled={loading || !arProvider.walletAddress}
									invalid={getInvalidTransferAmount()}
									endText={language.arTokens}
								/>
							</S.MFormField>
							<S.MActions>
								<Button
									type={'alt1'}
									label={language.confirmTransfer}
									handlePress={(e: any) => {
										transferFunds(e);
									}}
									formSubmit
									disabled={loading || !transferAmount || transferAmount <= 0 || fundsNotification !== null}
									loading={loading}
								/>
							</S.MActions>
							{fundsNotification && (
								<S.FundsNotificationMessage>
									<p>{fundsNotification.message}</p>
								</S.FundsNotificationMessage>
							)}
						</S.MForm>
					</S.MWrapper>
				</Modal>
			)}
		</>
	);
}

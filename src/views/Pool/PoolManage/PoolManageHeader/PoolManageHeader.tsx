import React from 'react';
import parse from 'html-react-parser';

import * as ArcFramework from 'arcframework';

import { Button } from 'components/atoms/Button';
import { ButtonLink } from 'components/atoms/ButtonLink';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Notification } from 'components/atoms/Notification';
import { Modal } from 'components/molecules/Modal';
import { APP, ASSETS, POOL_TEST_MODE } from 'helpers/config';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';
import { getTurboBalance } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

export default function PoolManageHeader(props: IProps) {
	const arProvider = useArweaveProvider();

	const [poolClient, setPoolClient] = React.useState<any>(null);
	const [copied, setCopied] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(false);

	const [showPoolBalanceInfo, setShowPoolBalanceInfo] = React.useState<boolean>(false);
	const [evolveNotification, setEvolveNotification] = React.useState<ArcFramework.NotificationResponseType | null>(
		null
	);

	const [showPoolIdInput, setShowPoolIdInput] = React.useState<boolean>(false);
	const [poolIdInput, setPoolIdInput] = React.useState<string>('');

	React.useEffect(() => {
		(async function () {
			if (arProvider.walletAddress) {
				const poolConfigClient = new ArcFramework.PoolConfigClient({ testMode: POOL_TEST_MODE });
				const poolConfig = await poolConfigClient.initFromContract({ poolId: props.id });
				if (poolConfig) {
					let controlWalletJwk = global.window.arweaveWallet;
					let signedControlWallet = new ArcFramework.ArweaveClient().warpPluginInjectedArweaveSigner(controlWalletJwk);
					await signedControlWallet.setPublicKey();

					setPoolClient(new ArcFramework.PoolClient({ poolConfig, signedPoolWallet: signedControlWallet }));
				}
			}
		})();
	}, [props.id, arProvider.walletAddress]);

	const copyAddress = React.useCallback(async () => {
		if (props.id) {
			if (props.id.length > 0) {
				await navigator.clipboard.writeText(props.id);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, [props.id]);

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

	async function handleEvolve() {
		setLoading(true);
		const poolConfigClient = new ArcFramework.PoolConfigClient({ testMode: POOL_TEST_MODE });
		const poolConfig = await poolConfigClient.initFromContract({ poolId: props.id });
		if (poolConfig) {
			try {
				await poolClient.evolve();
				setEvolveNotification({
					status: true,
					message: language.poolContractEvolved,
				});
			} catch (e: any) {
				console.error(e);
				setEvolveNotification({
					status: true,
					message: e.message,
				});
			}
		} else {
			alert(language.poolConfigurationNotFound);
		}
		setLoading(false);
	}

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
						<S.H2 className={'border-wrapper'}>
							<>
								<S.PoolBalance>
									<S.TileTitle>
										<p>{`${language.poolBalance}:`}</p>
									</S.TileTitle>
									&nbsp;
									<S.TileData>
										<p>{getTurboBalance(arProvider.turboBalance)}</p>
									</S.TileData>
									<S.TileInfo>
										<IconButton
											type={'primary'}
											src={ASSETS.info}
											handlePress={() => setShowPoolBalanceInfo(!showPoolBalanceInfo)}
											sm
										/>
										<S.TAction>
											<Button
												type={'alt1'}
												label={language.show}
												handlePress={() => arProvider.getTurboBalance()}
												disabled={arProvider.turboBalance !== null}
												height={25}
												noMinWidth
											/>
										</S.TAction>
									</S.TileInfo>
								</S.PoolBalance>
							</>
						</S.H2>
					</S.HeaderContent>
					<S.InfoWrapper>
						<S.FlexTiles>
							<S.Tile className={'border-wrapper'}>
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
						</S.FlexTiles>
						<S.Actions>
							<Button
								type={'alt1'}
								label={language.evolvePool}
								handlePress={handleEvolve}
								disabled={loading}
								loading={loading}
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
			{evolveNotification && (
				<Notification
					type={evolveNotification.status ? 'success' : 'warning'}
					message={evolveNotification.message}
					callback={() => setEvolveNotification(null)}
				/>
			)}
		</>
	);
}

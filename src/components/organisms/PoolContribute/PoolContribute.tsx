import React from 'react';

import {
	formatAddress,
	formatDate,
	getPoolById,
	NotificationResponseType,
	PoolClient,
	PoolConfigClient,
	UserClient,
} from 'arcframework';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Notification } from 'components/atoms/Notification';
import { Modal } from 'components/molecules/Modal';
import { ASSETS, POOL_TEST_MODE } from 'helpers/config';
import { getTurboCheckoutEndpoint, getTurboPriceWincEndpoint } from 'helpers/endpoints';
import { language } from 'helpers/language';
import { formatTurboAmount, formatUSDAmount, getARAmountFromWinc } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

const DEFAULT_AMOUNTS = [5, 10, 25, 50, 75];

export default function PoolContribute(props: IProps) {
	const arProvider = useArweaveProvider();
	const userClient = new UserClient({ userWalletAddress: arProvider.walletAddress });

	const [loading, setLoading] = React.useState<boolean>(false);
	const [receivingPercent, setReceivingPercent] = React.useState<string | null>(null);

	const [contributionResult, setContributionResult] = React.useState<NotificationResponseType | null>(null);

	const [copied, setCopied] = React.useState<boolean>(false);

	const [checkout, setCheckout] = React.useState<any>(null);
	const [checkoutStep, setCheckoutStep] = React.useState<'amount' | 'payment'>('amount');

	const [currency, _setCurrency] = React.useState<string>('usd');
	const [amount, setAmount] = React.useState<number>(0);
	const [customAmount, setCustomAmount] = React.useState<number>(0);
	const [paymentSubmitted, setPaymentSubmitted] = React.useState<boolean>(false);

	const [wincConversion, setWincConversion] = React.useState<number>(0);
	const [fetchingConversion, setFetchingConversion] = React.useState<boolean>(false);

	// React.useEffect(() => {
	// 	(async function () {
	// 		if (checkout && checkout.paymentSession && checkout.paymentSession.id) {
	// 			const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${checkout.paymentSession.id}`);
	// 			console.log(response);
	// 		}
	// 	})();

	// 	const handleBeforeUnload = (e: any) => {
	// 		if (checkout) {
	// 			e.preventDefault();
	// 			e.returnValue = '';
	// 		}
	// 	};

	// 	window.addEventListener('beforeunload', handleBeforeUnload);

	// 	return () => {
	// 		window.removeEventListener('beforeunload', handleBeforeUnload);
	// 	};
	// }, [checkout]);

	React.useEffect(() => {
		(async function () {
			if (currency && amount) {
				setFetchingConversion(true);
				try {
					const priceResponse = await fetch(getTurboPriceWincEndpoint(currency, amount));
					if (priceResponse.ok) {
						const price = await priceResponse.json();
						setWincConversion(getARAmountFromWinc(price.winc ? price.winc : 0));
					}
				} catch (e: any) {
					console.error(e);
				}
				setFetchingConversion(false);
			}
		})();
	}, [amount]);

	React.useEffect(() => {
		if (customAmount) setAmount(Number(customAmount));
	}, [customAmount]);

	React.useEffect(() => {
		(async function () {
			if (checkoutStep === 'payment' && amount && !getInvalidAmount().status && currency) {
				const poolConfigClient = new PoolConfigClient({ testMode: POOL_TEST_MODE });
				const poolConfig = await poolConfigClient.initFromContract({ poolId: props.poolId });
				try {
					const checkoutResponse = await fetch(
						getTurboCheckoutEndpoint(poolConfig.state.owner.pubkey, currency, amount)
					);
					if (checkoutResponse.ok) {
						setCheckout(await checkoutResponse.json());
					}
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
	}, [checkoutStep]);

	React.useEffect(() => {
		(async function () {
			let contributors: any;
			if (!props.contributors) {
				contributors = (await getPoolById(props.poolId)).state.contributors;
			}
			if (arProvider.walletAddress && (props.contributors || contributors)) {
				const priceResponse = await fetch(getTurboPriceWincEndpoint(currency, amount));
				if (priceResponse.ok) {
					const price = await priceResponse.json();
					setReceivingPercent(
						userClient.getReceivingPercent(
							arProvider.walletAddress,
							props.contributors ? props.contributors : contributors,
							props.totalContributions,
							price.winc
						)
					);
				}
			}
		})();
	}, [arProvider, arProvider.walletAddress, props.poolId, props.contributors, props.totalContributions, amount]);

	const copyAddress = React.useCallback(async () => {
		if (props.poolId) {
			if (props.poolId.length > 0) {
				await navigator.clipboard.writeText(props.poolId);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, [props.poolId]);

	async function handleSubmit() {
		if (checkout && checkout.paymentSession && checkout.paymentSession.url && amount && currency && arProvider.wallet) {
			const response = await fetch(getTurboPriceWincEndpoint(currency, amount));
			if (response.ok) {
				try {
					setLoading(true);
					const wincAmount = (await response.json()).winc;
					const poolConfigClient = new PoolConfigClient({ testMode: POOL_TEST_MODE });
					const poolConfig = await poolConfigClient.initFromContract({ poolId: props.poolId });
					poolConfig.walletKey = 'use_wallet';
					const poolClient = new PoolClient({ poolConfig });
					setContributionResult(await poolClient.handlePoolContribute({ wincAmount: wincAmount }));
					window.open(checkout.paymentSession.url, '_blank');
					setLoading(false);
					setPaymentSubmitted(true);
				} catch (e: any) {
					console.error(e);
				}
			}
		}
	}

	function handleGoBack() {
		setCheckout(null);
		setCheckoutStep('amount');
	}

	function getReceivingPercent() {
		if (receivingPercent) {
			return (
				<S.RPWrapper>
					<span>{language.willBeReceiving}:</span>
					<p>
						~&nbsp;{receivingPercent}% {language.ofArtifactsCreated}
					</p>
				</S.RPWrapper>
			);
		} else {
			return <p>{language.fetchingReceivingPercentage}&nbsp;...</p>;
		}
	}

	function getInvalidAmount() {
		if (amount && (amount < 5 || amount > 10000)) return { status: true, message: language.invalidAmountTurbo };
		return { status: false, message: null };
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
						<p>{props.poolId ? formatAddress(props.poolId, false) : null}</p>
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

	function getCheckoutStep() {
		switch (checkoutStep) {
			case 'amount':
				return (
					<S.MWrapper>
						<S.DWrapper>
							<S.DHeader>
								<span>{language.amount}</span>
							</S.DHeader>
							<S.DElements>
								{DEFAULT_AMOUNTS.map((defaultAmount: number, index: number) => {
									return (
										<Button
											key={index}
											type={'primary'}
											label={formatUSDAmount(defaultAmount)}
											handlePress={() => {
												setAmount(defaultAmount);
												setCustomAmount(0);
											}}
											active={Number(defaultAmount) === Number(amount)}
											height={40}
											width={125}
										/>
									);
								})}
							</S.DElements>
						</S.DWrapper>
						<S.CWrapper>
							<FormField
								label={`${language.customAmount} (${language.customAmountTurboInfo})`}
								type={'number'}
								value={customAmount}
								onChange={(e: any) => setCustomAmount(e.target.value)}
								disabled={false}
								invalid={getInvalidAmount()}
								sm
							/>
						</S.CWrapper>
						<S.COWrapper className={'border-wrapper-alt'}>
							<S.COHeader>
								<span>{language.conversion}</span>
							</S.COHeader>
							<span>
								{fetchingConversion
									? `${language.fetching}...`
									: `${formatUSDAmount(amount)} = ${formatTurboAmount(wincConversion)}`}
							</span>
						</S.COWrapper>
						{arProvider.walletAddress && <S.RPWrapper>{getReceivingPercent()}</S.RPWrapper>}
						<S.MActions>
							<Button
								type={'primary'}
								label={language.cancel}
								handlePress={props.handleClose}
								disabled={false}
								noMinWidth
							/>
							<Button
								type={'alt1'}
								label={language.next}
								handlePress={() => setCheckoutStep('payment')}
								disabled={amount <= 0 || getInvalidAmount().status || !currency || !arProvider.walletAddress}
								loading={false}
								formSubmit
								noMinWidth
							/>
						</S.MActions>
					</S.MWrapper>
				);
			case 'payment':
				if (checkout && checkout.paymentSession && checkout.paymentSession.url) {
					return (
						<S.MWrapper>
							<S.MInfo>
								<p>{language.fundTurboPaymentHeader}</p>
								<span>{language.fundTurboPaymentDetail}</span>
							</S.MInfo>
							<S.DWrapper>
								<S.DHeader>
									<span>{`${language.amount}: ${formatUSDAmount(amount)}`}</span>
								</S.DHeader>
							</S.DWrapper>
							<S.COWrapperAlt className={'border-wrapper-alt'}>
								<S.COHeader>
									<span>{language.conversion}</span>
								</S.COHeader>
								<span>
									{fetchingConversion
										? `${language.fetching}...`
										: `${formatUSDAmount(amount)} = ${formatTurboAmount(wincConversion)}`}
								</span>
							</S.COWrapperAlt>
							<S.MActions>
								<Button
									type={'primary'}
									label={language.back}
									handlePress={handleGoBack}
									disabled={loading || contributionResult !== null || paymentSubmitted}
									noMinWidth
								/>
								<Button
									type={'alt1'}
									label={language.goToPayment}
									handlePress={handleSubmit}
									disabled={loading || contributionResult !== null || paymentSubmitted}
									loading={loading}
									formSubmit
									noMinWidth
								/>
							</S.MActions>
						</S.MWrapper>
					);
				} else {
					return (
						<S.LWrapper>
							<Loader sm relative />
						</S.LWrapper>
					);
				}
		}
	}

	return (
		<>
			{contributionResult && (
				<Notification
					type={contributionResult.status === true ? 'success' : 'warning'}
					message={contributionResult.message!}
					callback={() => setContributionResult(null)}
				/>
			)}

			<Modal header={language.contributeTo} handleClose={() => props.handleClose()}>
				<S.ModalWrapper>
					<S.Header>
						<S.HeaderFlex>
							<S.Header1>{props.header}</S.Header1>
						</S.HeaderFlex>
						{getSubheader()}
					</S.Header>
					{getCheckoutStep()}
				</S.ModalWrapper>
			</Modal>
		</>
	);
}

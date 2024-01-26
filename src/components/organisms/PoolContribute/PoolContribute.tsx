import React from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useTheme } from 'styled-components';

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
import { ASSETS, POOL_TEST_MODE, STRIPE_PUBLISHABLE_KEY } from 'helpers/config';
import { getTurboCheckoutEndpoint, getTurboPriceWincEndpoint } from 'helpers/endpoints';
import { language } from 'helpers/language';
import { STYLING } from 'helpers/styling';
import { formatTurboAmount, formatUSDAmount, getARAmountFromWinc } from 'helpers/utils';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

const DEFAULT_AMOUNTS = [5, 10, 25, 50, 75];

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

function CheckoutForm(props: {
	poolId: string;
	handleGoBack: () => void;
	amount: number;
	wincConversion: number;
	currency: string;
	handleClose: () => void;
}) {
	const stripe = useStripe();
	const elements = useElements();

	const arProvider = useArweaveProvider();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [contributionResult, setContributionResult] = React.useState<NotificationResponseType | null>(null);

	const [mounting, setMounting] = React.useState<boolean>(true);

	React.useEffect(() => {
		(async function () {
			await new Promise((r) => setTimeout(r, 500));
			setMounting(false);
		})();
	}, []);

	async function handleSubmit(e: any) {
		e.preventDefault();
		setLoading(true);
		if (!stripe || !elements) {
			return;
		}
		try {
			if (arProvider.walletAddress) {
				const paymentResponse = await stripe.confirmPayment({
					elements,
					confirmParams: {
						return_url: `https://alex.arweave.dev/#/pool${props.poolId}`,
					},
					redirect: 'if_required',
				});

				if (paymentResponse.error) {
					console.error(paymentResponse.error.message);
				} else {
					if (paymentResponse && paymentResponse.paymentIntent && paymentResponse.paymentIntent.status) {
						if (paymentResponse.paymentIntent.status === 'succeeded') {
							const priceResponse = await fetch(getTurboPriceWincEndpoint(props.currency, props.amount));
							if (priceResponse.ok) {
								try {
									setLoading(true);
									const wincAmount = (await priceResponse.json()).winc;
									const poolConfigClient = new PoolConfigClient({ testMode: POOL_TEST_MODE });
									const poolConfig = await poolConfigClient.initFromContract({ poolId: props.poolId });
									poolConfig.walletKey = 'use_wallet';
									const poolClient = new PoolClient({ poolConfig });
									setContributionResult(await poolClient.handlePoolContribute({ wincAmount: wincAmount }));
									setLoading(false);
								} catch (e: any) {
									console.error(e);
								}
							}
						} else {
							setContributionResult({ status: false, message: language.errorOccurred });
						}
					}
				}
			}
		} catch (e: any) {
			console.error(e);
		}
		setLoading(false);
	}

	return (
		<>
			<S.COWrapperAlt className={'border-wrapper-alt'}>
				<S.COHeader>
					<span>{language.amount}</span>
				</S.COHeader>
				<span>{`${formatUSDAmount(props.amount)} = ${formatTurboAmount(props.wincConversion)}`}</span>
			</S.COWrapperAlt>
			<S.CheckoutForm disabled={loading || contributionResult !== null} className={'border-wrapper'}>
				{mounting ? <Loader sm relative /> : <PaymentElement />}
			</S.CheckoutForm>
			<S.MActions>
				<Button
					type={'primary'}
					label={language.back}
					handlePress={props.handleGoBack}
					disabled={loading || contributionResult !== null}
					noMinWidth
				/>
				<Button
					type={'alt1'}
					label={language.submit}
					handlePress={handleSubmit}
					disabled={loading || contributionResult !== null}
					loading={loading}
					formSubmit
					noMinWidth
				/>
			</S.MActions>
			{contributionResult && (
				<Notification
					type={contributionResult.status === true ? 'success' : 'warning'}
					message={contributionResult.message!}
					callback={() => {
						setContributionResult(null);
						props.handleClose();
					}}
				/>
			)}
		</>
	);
}

export default function PoolContribute(props: IProps) {
	const theme = useTheme();

	const arProvider = useArweaveProvider();
	const userClient = new UserClient({ userWalletAddress: arProvider.walletAddress });

	const [receivingPercent, setReceivingPercent] = React.useState<string | null>(null);

	const [copied, setCopied] = React.useState<boolean>(false);

	const [checkout, setCheckout] = React.useState<any>(null);
	const [checkoutStep, setCheckoutStep] = React.useState<'amount' | 'payment'>('amount');

	const [currency, _setCurrency] = React.useState<string>('usd');
	const [amount, setAmount] = React.useState<number>(0);
	const [customAmount, setCustomAmount] = React.useState<number>(0);
	const [clientSecret, setClientSecret] = React.useState<string>('');

	const [wincConversion, setWincConversion] = React.useState<number>(0);
	const [fetchingConversion, setFetchingConversion] = React.useState<boolean>(false);

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
						const checkoutResponseJson = await checkoutResponse.json();
						setCheckout(checkoutResponseJson);
						setClientSecret(checkoutResponseJson.paymentSession.client_secret);
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

	function handleGoBack() {
		setCheckout(null);
		setCheckoutStep('amount');
	}

	function getReceivingPercent() {
		return (
			<S.RPWrapper>
				{receivingPercent ? (
					<>
						<span>{language.willBeReceiving}:</span>
						<p>
							~&nbsp;{receivingPercent}% {language.ofArtifactsCreated}
						</p>
					</>
				) : (
					<p>{language.fetchingReceivingPercentage}&nbsp;...</p>
				)}
			</S.RPWrapper>
		);
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
				if (checkout && checkout.paymentSession && clientSecret) {
					return (
						<S.MWrapper>
							<S.MInfo>
								<p>{language.fundTurboPaymentHeader}</p>
								<span>{language.fundTurboPaymentDetail}</span>
							</S.MInfo>
							<Elements
								stripe={stripePromise}
								options={{
									clientSecret: clientSecret,
									appearance: {
										theme: 'flat',
										variables: {
											fontSizeBase: theme.typography.size.small,
											fontWeightLight: theme.typography.weight.medium,
											fontWeightNormal: theme.typography.weight.medium,
											fontWeightMedium: theme.typography.weight.medium,
											fontWeightBold: theme.typography.weight.medium,
											borderRadius: STYLING.dimensions.borderRadiusField,
											spacingUnit: '3.5px',
										},
									},
								}}
							>
								<CheckoutForm
									poolId={props.poolId}
									handleGoBack={handleGoBack}
									wincConversion={wincConversion}
									currency={currency}
									amount={amount}
									handleClose={props.handleClose}
								/>
							</Elements>
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

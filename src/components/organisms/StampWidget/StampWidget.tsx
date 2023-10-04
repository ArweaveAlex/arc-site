import React from 'react';
import { ReactSVG } from 'react-svg';
import Stamps from '@permaweb/stampjs';

import { formatFloat, NotificationResponseType } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { Notification } from 'components/atoms/Notification';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import { WalletBlock } from 'wallet/WalletBlock';

import * as S from './styles';
import { IProps } from './types';

function StampAction(props: { balance: number; handleSubmit: (amount: number) => void; handleClose: () => void }) {
	const [amount, setAmount] = React.useState<string>('0');

	const invalid = Number(amount) > props.balance;

	return (
		<S.SAContainer>
			<S.SAInfoContainer>
				<S.SABalanceContainer>
					<ReactSVG src={ASSETS.stamp.super} />
					<p>{formatFloat(props.balance, 2)}</p>
				</S.SABalanceContainer>
				<S.SACloseContainer>
					<IconButton type={'primary'} sm warning src={ASSETS.close} handlePress={props.handleClose} />
				</S.SACloseContainer>
			</S.SAInfoContainer>
			<S.SAFormContainer onSubmit={() => props.handleSubmit(Number(amount))}>
				<S.SAInput>
					<FormField
						type={'number'}
						value={amount}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
						disabled={false}
						invalid={{
							status: invalid,
							message: invalid ? language.amountExceedsBalance : null,
						}}
						sm
					/>
				</S.SAInput>
				<S.SASubmit>
					<Button
						type={'alt1'}
						label={'Submit'}
						handlePress={() => props.handleSubmit(Number(amount))}
						disabled={invalid || Number(amount) <= 0 || Number(amount) % 1 !== 0}
						formSubmit
						noMinWidth
					/>
				</S.SASubmit>
			</S.SAFormContainer>
		</S.SAContainer>
	);
}

export default function StampWidget(props: IProps) {
	const stamps = Stamps.init({ warp: props.warp, arweave: props.arweave });

	const [loading, setLoading] = React.useState<boolean>(true);
	const [count, setCount] = React.useState<any>(null);
	const [updateCount, setUpdateCount] = React.useState<boolean>(false);
	const [balance, setBalance] = React.useState<number>(0);

	const [showWalletConnect, setShowWalletConnect] = React.useState<boolean>(false);
	const [showStampAction, setShowStampAction] = React.useState<boolean>(false);

	const [stampDisabled, setStampDisabled] = React.useState<boolean>(true);
	const [stampCheckLoading, setStampCheckLoading] = React.useState<boolean>(false);
	const [stampNotification, setStampNotification] = React.useState<NotificationResponseType | null>(null);

	React.useEffect(() => {
		if (!props.walletAddress && props.showWalletConnect) {
			setShowWalletConnect(true);
		} else {
			setShowWalletConnect(false);
		}
	}, [props.showWalletConnect]);

	React.useEffect(() => {
		(async function () {
			if (props.txId) {
				const hasStamped = await stamps.hasStamped(props.txId);
				if (!hasStamped) {
					setStampDisabled(false);
				}
			}
		})();
	}, [props.txId]);

	React.useEffect(() => {
		(async function () {
			if (props.walletAddress) {
				try {
					setBalance(await stamps.balance());
				} catch (e: any) {
					console.error(e);
				}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	React.useEffect(() => {
		(async function () {
			if (props.txId) {
				try {
					setStampCheckLoading(true);
					setCount(await stamps.count(props.txId));
					setStampCheckLoading(false);
				} catch {}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.txId, updateCount]);

	React.useEffect(() => {
		if (count && !stampCheckLoading) {
			setLoading(false);
		} else {
			setLoading(true);
		}
	}, [count, stampCheckLoading]);

	const handleStamp = React.useCallback(
		async (amount?: number) => {
			if (props.txId) {
				setStampCheckLoading(true);
				let stamp: any = await stamps.stamp(props.txId, amount ? amount : 0, [{ name: '', value: '' }]);
				const stampSuccess = stamp && stamp.bundlrResponse && stamp.bundlrResponse.id;

				setStampCheckLoading(false);
				setStampDisabled(true);
				setUpdateCount(!updateCount);
				setStampNotification({
					status: stampSuccess ? true : false,
					message: stampSuccess ? language.artifactStamped : language.errorOccurred,
				});
			}
		},
		[stamps, updateCount, props]
	);

	function handleStampCallback() {
		setStampNotification(null);
		props.handleStampCallback();
	}

	function handleStampAction(amount: number) {
		handleStamp(amount);
		setShowStampAction(false);
	}

	function getWidget() {
		const disabled = stampDisabled || stampCheckLoading || !props.walletAddress || !props.txId;

		if (showWalletConnect) {
			return (
				<S.WalletConnectWrapper>
					<WalletBlock />
				</S.WalletConnectWrapper>
			);
		} else {
			if (loading) {
				return (
					<S.LoadingContainer>
						<Loader xSm />
					</S.LoadingContainer>
				);
			} else {
				return (
					<>
						{showStampAction && (
							<StampAction
								balance={balance}
								handleClose={() => setShowStampAction(false)}
								handleSubmit={(amount: number) => handleStampAction(amount)}
							/>
						)}
						<S.WidgetContainer>
							<S.Action>
								<IconButton
									type={'alt1'}
									src={ASSETS.stamp.default}
									handlePress={() => handleStamp()}
									disabled={disabled}
									info={count ? count.total.toString() : '0'}
									tooltip={language.stamp}
								/>
							</S.Action>
							<S.ActionNoInfo>
								<IconButton
									type={'alt1'}
									src={ASSETS.stamp.super}
									handlePress={() => setShowStampAction(!showStampAction)}
									disabled={disabled || balance <= 0 || showStampAction}
									tooltip={language.superStamp}
								/>
							</S.ActionNoInfo>
							<S.Action>
								<IconButton
									type={'alt3'}
									src={ASSETS.stamp.vouched}
									handlePress={null}
									disabled={true}
									info={count ? count.vouched.toString() : '0'}
									tooltip={language.stampsVouched}
								/>
							</S.Action>
						</S.WidgetContainer>
					</>
				);
			}
		}
	}

	return (
		<>
			{stampNotification && (
				<Notification
					message={stampNotification.message}
					type={stampNotification.status ? 'success' : 'warning'}
					callback={handleStampCallback}
				/>
			)}
			<S.Wrapper>{getWidget()}</S.Wrapper>
		</>
	);
}

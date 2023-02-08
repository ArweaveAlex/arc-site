import React from 'react';

import Stamps from '@permaweb/stampjs';

import { Loader } from 'components/atoms/Loader';
import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { Notification } from 'components/atoms/Notification';

import { LANGUAGE } from 'helpers/language';
import { NotificationResponseType } from 'helpers/types';
import { IProps } from './types';
import * as S from './styles';
import { ASSETS } from 'helpers/config';

export default function StampWidget(props: IProps) {
	const stamps = Stamps.init({ warp: props.warp });

	const [loading, setLoading] = React.useState<boolean>(true);
	const [count, setCount] = React.useState<{ total: number; vouched: number; super: number } | null>(null);
	const [updateCount, setUpdateCount] = React.useState<boolean>(false);
	const [balance, setBalance] = React.useState<number>(0);

	const [showWalletConnect, setShowWalletConnect] = React.useState<boolean>(false);
	const [stampDisabled, setStampDisabled] = React.useState<boolean>(true);
	const [stampCheckLoading, setStampCheckLoading] = React.useState<boolean>(false);
	const [stampNotification, setStampNotification] = React.useState<NotificationResponseType | null>(null);

	React.useEffect(() => {
		if (!props.walletAddress) {
			setShowWalletConnect(true);
		}
	}, [props.walletAddress]);

	// TODO - Check Balance super stamps disabled if none or <= 0
	React.useEffect(() => {
		(async function () {
			if (props.walletAddress) {
				try {
					setBalance(await stamps.balance(props.walletAddress));
                    console.log(`Stamp Balance: ${balance}`);
				} catch {}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.walletAddress]);

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
		(async function () {
			if (props.txId) {
				setStampCheckLoading(true);
				const hasStamped = await stamps.hasStamped(props.walletAddress, props.txId);
				setStampCheckLoading(false);
				if (!hasStamped) {
					setStampDisabled(false);
				}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.txId]);

	React.useEffect(() => {
		if (count && !stampCheckLoading) {
			setLoading(false);
		} else {
			setLoading(true);
		}
	}, [count, stampCheckLoading]);

	const handleStamp = React.useCallback(async () => {
		if (props.txId) {
			setStampCheckLoading(true);
			const stamp = await stamps.stamp(props.txId);
			const stampSuccess = stamp && stamp.bundlrResponse && stamp.bundlrResponse.id;
			setStampCheckLoading(false);
			setStampDisabled(true);
			setUpdateCount(!updateCount);
			setStampNotification({
				status: stampSuccess ? 200 : 500,
				message: stampSuccess ? LANGUAGE.artifactStamped : LANGUAGE.errorOccurred,
			});
			props.handleStampCallback();
		}
	}, [stamps, updateCount, props]);

	function handleStampCallback() {
		setStampNotification(null);
		props.handleStampCallback();
	}

	function getWidget() {
		if (showWalletConnect) {
			return (
				<S.WalletConnectWrapper>
					<p>{LANGUAGE.walletNotConnected}</p>
					<Button
						type={'alt2'}
						label={LANGUAGE.connect}
						handlePress={() => props.setWalletModalVisible(true)}
						useMaxWidth
					/>
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
					<S.WidgetContainer>
						<S.Action>
							<IconButton
								type={'alt1'}
								src={ASSETS.stamp.default}
								handlePress={handleStamp}
								disabled={stampDisabled || stampCheckLoading}
								info={count.total.toString()}
							/>
						</S.Action>
						<S.Action>
							<IconButton
								type={'alt1'}
								src={ASSETS.stamp.super}
								handlePress={() => console.log('Super Stamp dropdown')}
								// disabled={balance <= 0 || stampDisabled || stampCheckLoading}
                                disabled={true}
								info={count.super.toString()}
							/>
						</S.Action>
						<S.Action>
							<IconButton
								type={'alt3'}
								src={ASSETS.stamp.vouched}
								handlePress={null}
								disabled={true}
								info={count.vouched.toString()}
							/>
						</S.Action>
					</S.WidgetContainer>
				);
			}
		}
	}

	return (
		<>
			{stampNotification && (
				<Notification
					message={stampNotification.message}
					type={stampNotification.status === 200 ? 'success' : 'warning'}
					callback={handleStampCallback}
				/>
			)}
			<S.Wrapper>{getWidget()}</S.Wrapper>
		</>
	);
}

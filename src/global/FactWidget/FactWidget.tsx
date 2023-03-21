import React from 'react';
import * as facts from '@facts-kit/facts-sdk';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { Notification } from 'components/atoms/Notification';
import { LANGUAGE } from 'helpers/language';
import { NotificationResponseType } from 'helpers/types';
import { WalletBlock } from 'wallet/WalletBlock';

import * as S from './styles';
import { IProps } from './types';

export default function FactWidget(props: IProps) {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [showWalletConnect, setShowWalletConnect] = React.useState<boolean>(false);

	const [existingFactMarket, setExistingFactMarket] = React.useState<{ tx?: string; link?: string } | null>(null);

	const [updateFactCheck, setUpdateFactCheck] = React.useState<boolean>(true);
	const [factDisabled, setFactDisabled] = React.useState<boolean>(true);
	const [factCheckLoading, setFactCheckLoading] = React.useState<boolean>(false);
	const [factNotification, setFactNotification] = React.useState<NotificationResponseType | null>(null);

	React.useEffect(() => {
		if (!props.walletAddress && props.showWalletConnect) {
			setShowWalletConnect(true);
		} else {
			setShowWalletConnect(false);
		}
	}, [props.walletAddress, props.showWalletConnect]);

	React.useEffect(() => {
		(async function () {
			if (props.txId) {
				setFactCheckLoading(true);
				const factMarketCheck = await facts.hasFactMarket(props.txId);
				setFactCheckLoading(false);
				if (factMarketCheck && !factMarketCheck.tx) {
					setFactDisabled(false);
				} else {
					setExistingFactMarket(factMarketCheck);
				}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.txId, updateFactCheck, props.walletAddress]);

	React.useEffect(() => {
		if (!factCheckLoading) {
			setLoading(false);
		} else {
			setLoading(true);
		}
	}, [factCheckLoading]);

	const handleFactMarketAssertion = React.useCallback(
		async (position: string) => {
			if (props.txId) {
				setLoading(true);
				const factMarket: any = await facts.attach({
					tx: props.txId,
					position: position as any,
					useConnectedWallet: true,
				});
				const factMarketSuccess = factMarket && factMarket.tx;
				setFactNotification({
					status: factMarketSuccess ? 200 : 500,
					message: factMarketSuccess ? LANGUAGE.factMarketCreated : LANGUAGE.errorOccurred,
				});
				setUpdateFactCheck(!updateFactCheck);
			}
		},
		[props]
	);

	function handleFactCallback() {
		setFactNotification(null);
	}

	function getWidgetContent() {
		const disabled = factDisabled || factCheckLoading || !props.walletAddress || !props.txId;

		if (existingFactMarket) {
			return (
				<S.Action>
					<Button
						type={'alt2'}
						label={LANGUAGE.viewOnPermafacts}
						handlePress={() => window.open(existingFactMarket.link, '_blank')}
						disabled={false}
						noMinWidth
					/>
				</S.Action>
			);
		} else {
			return (
				<>
					<S.Action>
						<Button
							type={'success'}
							label={LANGUAGE.support}
							handlePress={() => handleFactMarketAssertion('support')}
							disabled={disabled}
							noMinWidth
						/>
					</S.Action>
					<S.Action>
						<Button
							type={'warning'}
							label={LANGUAGE.oppose}
							handlePress={() => handleFactMarketAssertion('oppose')}
							disabled={disabled}
							noMinWidth
						/>
					</S.Action>
				</>
			);
		}
	}

	function getWidget() {
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
				return <S.WidgetContainer>{getWidgetContent()}</S.WidgetContainer>;
			}
		}
	}

	return (
		<>
			{factNotification && (
				<Notification
					message={factNotification.message}
					type={factNotification.status === 200 ? 'success' : 'warning'}
					callback={handleFactCallback}
				/>
			)}
			<S.Wrapper>{getWidget()}</S.Wrapper>
		</>
	);
}

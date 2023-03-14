import React from 'react';
import { attach } from '@facts-kit/facts-sdk';

import { Button } from 'components/atoms/Button';
import { Loader } from 'components/atoms/Loader';
import { LANGUAGE } from 'helpers/language';
import { WalletBlock } from 'wallet/WalletBlock';

import * as S from './styles';
import { IProps } from './types';

// TODO: Check if already attached
export default function FactWidget(props: IProps) {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [showWalletConnect, setShowWalletConnect] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (!props.walletAddress && props.showWalletConnect) {
			setShowWalletConnect(true);
		}
	}, [props.walletAddress, props.showWalletConnect]);

	const handleAttach = React.useCallback(
		async (position: string) => {
			if (props.txId) {
				setLoading(true);
				const factMarket = await attach({
					tx: props.txId,
					position: position as any,
				});
				console.log(factMarket);
				setLoading(false);
			}
		},
		[props]
	);

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
				return (
					<S.WidgetContainer>
						<S.Action>
							<Button
								type={'success'}
								label={LANGUAGE.support}
								handlePress={() => handleAttach('support')}
								disabled={!props.txId}
								noMinWidth
							/>
						</S.Action>
						<S.Action>
							<Button
								type={'warning'}
								label={LANGUAGE.oppose}
								handlePress={() => handleAttach('oppose')}
								disabled={!props.txId}
								noMinWidth
							/>
						</S.Action>
					</S.WidgetContainer>
				);
			}
		}
	}

	return <S.Wrapper>{getWidget()}</S.Wrapper>;
}

// import React from 'react';

// import Stamps from '@permaweb/stampjs';

// import { Button } from 'components/atoms/Button';
// import { IconButton } from 'components/atoms/IconButton';
// import { Notification } from 'components/atoms/Notification';

// import { LANGUAGE } from 'helpers/language';
// import { NotificationResponseType } from 'helpers/types';
// import { IProps } from './types';
// import * as S from './styles';
// import { ASSETS } from 'helpers/config';

// export default function StampWidget(props: IProps) {
// 	const stamps = Stamps.init({ warp: props.warp });

// 	const [showWalletConnect, setShowWalletConnect] = React.useState<boolean>(false);
// 	const [stampDisabled, setStampDisabled] = React.useState<boolean>(true);
// 	const [stampCheckLoading, setStampCheckLoading] = React.useState<boolean>(false);
// 	const [stampNotification, setStampNotification] = React.useState<NotificationResponseType | null>(null);

// 	React.useEffect(() => {
// 		setTimeout(() => {
// 			if (!props.walletAddress) {
// 				setShowWalletConnect(true);
// 			}
// 		}, 0);
// 	}, [props.walletAddress]);

// 	// TODO - Check Balance super stamps disabled if none or <= 0
// 	React.useEffect(() => {
// 		(async function () {
// 			if (props.walletAddress) {
// 				try {
// 					console.log(await stamps.balance(props.walletAddress));
// 				} catch {}
// 			}
// 		})();
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [props.walletAddress]);

// 	// TODO - Disabled if connected wallet has stamped not stamp total
// 	React.useEffect(() => {
// 		(async function () {
// 			if (props.txId) {
// 				setStampCheckLoading(true);
// 				const hasStamped = await stamps.hasStamped(props.walletAddress, props.txId);
// 				setStampCheckLoading(false);
// 				if (!hasStamped) {
// 					setStampDisabled(false);
// 				}
// 			}
// 		})();
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [props.txId]);

// 	const handleStamp = React.useCallback(async () => {
// 		if (props.txId) {
// 			setStampCheckLoading(true);
// 			const stamp = await stamps.stamp(props.txId);
// 			const stampSuccess = stamp && stamp.bundlrResponse && stamp.bundlrResponse.id;
// 			setStampCheckLoading(false);
// 			setStampDisabled(true);
// 			setStampNotification({
// 				status: stampSuccess ? 200 : 500,
// 				message: stampSuccess ? LANGUAGE.artifactStamped : LANGUAGE.errorOccurred,
// 			});
// 			props.handleStampCallback();
// 		}
// 	}, [stamps, props]);

// 	function handleStampCallback() {
// 		setStampNotification(null);
// 		props.handleStampCallback();
// 	}

//     function getTotalCount() {
//         return '0'
//     }

// 	function getWidget() {
// 		if (!showWalletConnect) {
// 			return (
// 				<S.WidgetContainer>
//                     {/* <S.Title>
//                         <p>{props.txId ? formatAddress(props.txId, false) : `-`}</p>
//                     </S.Title>
// 					<Button
// 						type={'alt2'}
// 						label={LANGUAGE.stamp}
//                         loading={stampCheckLoading}
// 						handlePress={handleStamp}
// 						disabled={stampDisabled || stampCheckLoading}
//                         noMinWidth
// 					/> */}
//                     <IconButton
//                         type={'alt1'}
//                         src={ASSETS.stamp}
// 						handlePress={handleStamp}
// 						disabled={stampDisabled || stampCheckLoading}
//                         info={getTotalCount()}
//                     />
// 				</S.WidgetContainer>
// 			);
// 		} else {
// 			return (
// 				<S.WalletConnectWrapper>
// 					<p>{LANGUAGE.walletNotConnected}</p>
// 					<Button
// 						type={'alt2'}
// 						label={LANGUAGE.connect}
// 						handlePress={() => props.setWalletModalVisible(true)}
// 						useMaxWidth
// 					/>
// 				</S.WalletConnectWrapper>
// 			);
// 		}
// 	}

// 	return (
// 		<>
// 			{stampNotification && (
// 				<Notification
// 					message={stampNotification.message}
// 					type={stampNotification.status === 200 ? 'success' : 'warning'}
// 					callback={handleStampCallback}
// 				/>
// 			)}
// 			<S.Wrapper>{getWidget()}</S.Wrapper>
// 		</>
// 	);
// }

export default function StampWidget() {
     return null;
}

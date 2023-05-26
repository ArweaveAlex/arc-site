import React from 'react';

import { ArweaveClient } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { Modal } from 'components/molecules/Modal';
import { FactWidget } from 'global/FactWidget';
import { StampWidget } from 'global/StampWidget';
import { language } from 'helpers/language';
import { checkDesktop } from 'helpers/window';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';
import { IProps } from './types';

export default function ArtifactActionsSingle(props: IProps) {
	const arClient = new ArweaveClient();
	const arProvider = useArweaveProvider();

	const [copied, setCopied] = React.useState<boolean>(false);
	const [showStampWidget, setShowStampWidget] = React.useState<boolean>(false);
	const [showFactWidget, setShowFactWidget] = React.useState<boolean>(false);

	const copyArtifactId = React.useCallback(async () => {
		if (props.data.artifactId) {
			await navigator.clipboard.writeText(props.data.artifactId);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	}, [props.data]);

	function handleShowStampWidget() {
		setShowFactWidget(false);
		setShowStampWidget(!showStampWidget);
	}

	function handleShowFactWidget() {
		setShowStampWidget(false);
		setShowFactWidget(!showFactWidget);
	}

	const stampWidget = () => {
		return (
			<StampWidget
				txId={props.data.artifactId}
				walletAddress={arProvider.walletAddress}
				warp={arClient.warpDefault}
				arweave={arClient.arweavePost}
				handleStampCallback={() => setShowStampWidget(false)}
				showWalletConnect={true}
			/>
		);
	};

	const factWidget = () => {
		return (
			<FactWidget txId={props.data.artifactId} walletAddress={arProvider.walletAddress} showWalletConnect={true} />
		);
	};

	function getWidget(widget: any, container: any, handleClose: () => void) {
		if (checkDesktop()) {
			const Container = container;
			return <Container>{widget()}</Container>;
		} else {
			return (
				<Modal header={null} handleClose={() => handleClose()}>
					<S.MobileWidget>{widget()}</S.MobileWidget>
				</Modal>
			);
		}
	}

	return props.data ? (
		<S.Wrapper>
			<S.ButtonsContainer>
				<S.ButtonContainer>
					<Button
						type={'alt2'}
						label={copied ? language.copied : language.copyArtifactId}
						handlePress={copyArtifactId}
						width={140}
					/>
				</S.ButtonContainer>
				<S.ButtonContainer>
					<Button
						type={'alt2'}
						label={showStampWidget ? language.close : language.stamp}
						handlePress={handleShowStampWidget}
						width={100}
					/>
					{showStampWidget && getWidget(stampWidget, S.StampWidgetContainer, () => setShowStampWidget(false))}
				</S.ButtonContainer>
				<S.ButtonContainer>
					<Button
						type={'alt2'}
						label={showFactWidget ? language.close : language.factMarket}
						handlePress={handleShowFactWidget}
						width={110}
					/>
					{showFactWidget && getWidget(factWidget, S.FactWidgetContainer, () => setShowFactWidget(false))}
				</S.ButtonContainer>
			</S.ButtonsContainer>
		</S.Wrapper>
	) : null;
}

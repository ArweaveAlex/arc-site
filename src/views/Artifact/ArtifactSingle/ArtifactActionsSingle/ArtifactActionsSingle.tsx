import React from 'react';

import { ARTIFACT_CONTRACT, ArweaveClient, getTxEndpoint, STORAGE } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { TradeDisclaimer } from 'components/atoms/TradeDisclaimer';
import { Modal } from 'components/molecules/Modal';
import { ArtifactSell } from 'components/organisms/ArtifactSell';
import { StampWidget } from 'components/organisms/StampWidget';
import { APP } from 'helpers/config';
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
	const [showArtifactSell, setShowArtifactSell] = React.useState<boolean>(false);
	const [sellDisabled, setSellDisabled] = React.useState<boolean>(false);

	const [showDisclaimer, setShowDisclaimer] = React.useState<boolean>(
		localStorage.getItem(APP.disclaimerShown) ? false : true
	);

	const copyArtifactId = React.useCallback(async () => {
		if (props.data.artifactId) {
			await navigator.clipboard.writeText(props.data.artifactId);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	}, [props.data]);

	function handleShowStampWidget() {
		setShowStampWidget(!showStampWidget);
		setShowArtifactSell(false);
	}

	function handleShowArtifactSell() {
		setShowStampWidget(false);
		setShowArtifactSell(!showArtifactSell);
	}

	function handleDisclaimerClose() {
		setShowDisclaimer(false);
		localStorage.setItem(APP.disclaimerShown, 'true');
	}

	const stampWidget = () => {
		return (
			<StampWidget
				txId={props.data.artifactId}
				contractSrc={props.data.artifactContractSrc}
				walletAddress={arProvider.walletAddress}
				warp={arClient.warpDefault}
				arweave={arClient.arweavePost}
				handleStampCallback={() => setShowStampWidget(false)}
				showWalletConnect={true}
			/>
		);
	};

	const artifactSell = () => {
		if (props.data && arProvider.walletAddress && props.data.owner === arProvider.walletAddress) {
			return (
				<>
					<ArtifactSell
						artifactId={props.data.artifactId}
						handleClose={() => setShowArtifactSell(false)}
						artifactName={props.data.artifactName}
						dateCreated={props.data.minted}
						setSellDisabled={() => setSellDisabled(true)}
					/>
					{showDisclaimer && <TradeDisclaimer handleClose={handleDisclaimerClose} />}
				</>
			);
		} else {
			return null;
		}
	};

	function getArtifactSell() {
		if (
			props.data &&
			arProvider.walletAddress &&
			props.data.owner === arProvider.walletAddress &&
			props.data.claimable !== null &&
			props.data.claimable !== undefined &&
			props.data.artifactContractSrc === ARTIFACT_CONTRACT.srcTradeable
		) {
			return (
				<S.ButtonContainer>
					<Button
						type={'alt2'}
						label={language.sellArtifact}
						handlePress={handleShowArtifactSell}
						disabled={sellDisabled}
						noMinWidth
					/>
					{showArtifactSell && artifactSell()}
				</S.ButtonContainer>
			);
		} else {
			return null;
		}
	}

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

	function handleDownload() {
		const link = document.createElement('a');
		link.href = getTxEndpoint(JSON.parse(props.data.rawData).fileTxId);
		link.download = `${props.data.artifactName}.${props.data.fileType}`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function getArtifactDownload() {
		if (props.data.fileType && props.data.fileType !== STORAGE.none && JSON.parse(props.data.rawData).fileTxId) {
			return (
				<S.ButtonContainer>
					<Button type={'alt2'} label={language.download} handlePress={handleDownload} width={110} />
				</S.ButtonContainer>
			);
		} else {
			return null;
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
				{getArtifactSell()}
				{getArtifactDownload()}
			</S.ButtonsContainer>
		</S.Wrapper>
	) : null;
}

import React from 'react';
import { ArweaveClient } from 'clients/arweave';

import { Button } from 'components/atoms/Button';
import { FactWidget } from 'global/FactWidget';
import { StampWidget } from 'global/StampWidget';
import { LANGUAGE } from 'helpers/language';
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
		setShowStampWidget(!showStampWidget)
	}
	
	function handleShowFactWidget() {
		setShowStampWidget(false);
		setShowFactWidget(!showFactWidget)
	}

	return props.data ? (
		<S.Wrapper>
			<S.ButtonsContainer>
				<S.ButtonContainer>
					<Button
						type={'alt2'}
						label={copied ? LANGUAGE.copied : LANGUAGE.copyArtifactId}
						handlePress={copyArtifactId}
					/>
				</S.ButtonContainer>
				<S.ButtonContainer>
					<Button
						type={'alt2'}
						label={showStampWidget ? LANGUAGE.close : LANGUAGE.stamp}
						handlePress={handleShowStampWidget}
						width={100}
					/>
				</S.ButtonContainer>
				<S.ButtonContainer>
					<Button
						type={'alt2'}
						label={showFactWidget ? LANGUAGE.close : LANGUAGE.factMarket}
						handlePress={handleShowFactWidget}
						width={110}
					/>
				</S.ButtonContainer>
			</S.ButtonsContainer>
			{showStampWidget && (
				<S.StampWidgetContainer>
					<StampWidget
						txId={props.data.artifactId}
						walletAddress={arProvider.walletAddress}
						setWalletModalVisible={() => arProvider.setWalletModalVisible(true)}
						warp={arClient.warp}
						handleStampCallback={null}
						showWalletConnect={false}
					/>
				</S.StampWidgetContainer>
			)}
			{showFactWidget && (
				<S.FactWidgetContainer>
					<FactWidget
						txId={props.data.artifactId}
						walletAddress={arProvider.walletAddress}
						setWalletModalVisible={() => arProvider.setWalletModalVisible(true)}
						showWalletConnect={false}
					/>
				</S.FactWidgetContainer>
			)}
		</S.Wrapper>
	) : null;
}

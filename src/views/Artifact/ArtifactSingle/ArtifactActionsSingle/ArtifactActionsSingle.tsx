import React from 'react';
import { ArweaveClient } from 'clients/arweave';

import { Button } from 'components/atoms/Button';
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

	const copyArtifactId = React.useCallback(async () => {
		if (props.data.artifactId) {
			await navigator.clipboard.writeText(props.data.artifactId);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	}, [props.data]);

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
						handlePress={() => setShowStampWidget(!showStampWidget)}
						width={100}
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
		</S.Wrapper>
	) : null;
}

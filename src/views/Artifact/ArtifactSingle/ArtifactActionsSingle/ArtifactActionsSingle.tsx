import { useArweaveProvider } from 'providers/ArweaveProvider';
import { ArweaveClient } from 'clients/arweave';

import { StampWidget } from 'global/StampWidget';

import { IProps } from './types';
import * as S from './styles';

export default function ArtifactActionsSingle(props: IProps) {
    const arClient = new ArweaveClient();
	const arProvider = useArweaveProvider();

    return props.data ? (
        <S.Wrapper>
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
        </S.Wrapper>
    ) : null
}
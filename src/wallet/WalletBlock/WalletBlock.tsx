import { Button } from 'components/atoms/Button';
import { LANGUAGE } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';

export default function WalletBlock() {
	const arProvider = useArweaveProvider();

	return (
		<S.Wrapper>
			<p>{LANGUAGE.walletNotConnected}</p>
			<Button
				type={'alt2'}
				label={LANGUAGE.connect}
				handlePress={() => arProvider.setWalletModalVisible(true)}
				useMaxWidth
			/>
		</S.Wrapper>
	);
}

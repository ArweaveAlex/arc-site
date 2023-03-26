import React from 'react';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD
import { Button } from 'components/atoms/Button';
import { URLS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { formatAddress } from 'helpers/utils';
=======
import { formatAddress } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { URLS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
>>>>>>> dev
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';

export default function WalletConnect(props: { callback?: () => void }) {
	const navigate = useNavigate();

	const arProvider = useArweaveProvider();

	const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
	const [copied, setCopied] = React.useState<boolean>(false);

	function handlePress() {
		if (arProvider.walletAddress) {
			setShowDropdown(true);
		} else {
			arProvider.setWalletModalVisible(true);
		}
	}

	const copyAddress = React.useCallback(async () => {
		if (arProvider.walletAddress) {
			if (arProvider.walletAddress.length > 0) {
				await navigator.clipboard.writeText(arProvider.walletAddress);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		}
	}, [arProvider.walletAddress]);

	function handleDisconnect() {
		arProvider.handleDisconnect();
		setShowDropdown(false);
	}

	function handleViewAccount() {
		navigate(URLS.account[0]!.url);
		setShowDropdown(false);
		if (props.callback) {
			props.callback();
		}
	}

	return (
		<CloseHandler callback={() => setShowDropdown(!showDropdown)} active={showDropdown} disabled={false}>
			<S.Wrapper>
				<Button
					type={'alt2'}
					label={arProvider.walletAddress ? formatAddress(arProvider.walletAddress, false) : LANGUAGE.connectWallet}
					handlePress={handlePress}
					useMaxWidth
					active={true}
				/>
				{showDropdown && (
					<S.WalletDropdown>
						<li onClick={handleViewAccount}>{LANGUAGE.viewAccount}</li>
						<li onClick={copyAddress}>{copied ? LANGUAGE.copied : LANGUAGE.copyAddress}</li>
						<li onClick={handleDisconnect}>{LANGUAGE.disconnect}</li>
					</S.WalletDropdown>
				)}
			</S.Wrapper>
		</CloseHandler>
	);
}

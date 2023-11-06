import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { formatAddress, getTxEndpoint } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { ASSETS, URLS } from 'helpers/config';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { CloseHandler } from 'wrappers/CloseHandler';

import * as S from './styles';

export default function WalletConnect(props: { callback?: () => void }) {
	const navigate = useNavigate();

	const arProvider = useArweaveProvider();

	const [showWallet, setShowWallet] = React.useState<boolean>(false);
	const [showDropdown, setShowDropdown] = React.useState<boolean>(false);

	const [copied, setCopied] = React.useState<boolean>(false);
	const [label, setLabel] = React.useState<string | null>(null);

	React.useEffect(() => {
		setTimeout(() => {
			setShowWallet(true);
		}, 400);
	}, [arProvider.walletAddress]);

	React.useEffect(() => {
		if (!showWallet) {
			setLabel(`${language.fetching}...`);
		} else {
			if (arProvider.walletAddress) {
				if (arProvider.arProfile && arProvider.arProfile.handle) {
					setLabel(arProvider.arProfile.handle);
				} else {
					setLabel(formatAddress(arProvider.walletAddress, false));
				}
			} else {
				setLabel(language.connect);
			}
		}
	}, [showWallet, arProvider.walletAddress, arProvider.arProfile]);

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
				<Button type={'alt2'} label={label} handlePress={handlePress} useMaxWidth />
				{showDropdown && (
					<S.WalletDropdown className={'border-wrapper'}>
						<S.DHeaderWrapper>
							<S.AvatarWrapper>
								{!arProvider.arProfile ||
								!arProvider.arProfile.avatar ||
								arProvider.arProfile.avatar === 'ar://OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA' ? (
									<ReactSVG src={ASSETS.user} />
								) : (
									<S.Avatar src={getTxEndpoint(arProvider.arProfile.avatar.substring(5))} />
								)}
							</S.AvatarWrapper>
							<S.DHeader>
								<p>{label}</p>
								<span>{formatAddress(arProvider.walletAddress, false)}</span>
							</S.DHeader>
						</S.DHeaderWrapper>
						<S.DBodyWrapper>
							<li onClick={handleViewAccount}>{language.account.header1}</li>
							<li onClick={copyAddress}>{copied ? `${language.copied}!` : language.copyAddress}</li>
						</S.DBodyWrapper>
						<S.DFooterWrapper>
							<li onClick={handleDisconnect}>{language.disconnect}</li>
						</S.DFooterWrapper>
					</S.WalletDropdown>
				)}
			</S.Wrapper>
		</CloseHandler>
	);
}

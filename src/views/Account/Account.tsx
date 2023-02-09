import React from 'react';

import { useArweaveProvider } from 'providers/ArweaveProvider';
import { WalletBlock } from 'wallet/WalletBlock';

import { Button } from 'components/atoms/Button';
import { URLTabs } from 'components/organisms/URLTabs';

import * as urls from 'helpers/urls';
import { formatAddress, getHashUrl } from 'helpers/utils';
import { ASSETS, URLS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import * as S from './styles';

export default function Account() {
	const arProvider = useArweaveProvider();

	const [copied, setCopied] = React.useState<boolean>(false);
	const [showWalletConnect, setShowWalletConnect] = React.useState<boolean>(false);

	React.useEffect(() => {
		setTimeout(() => {
			if (!arProvider.walletAddress) {
				setShowWalletConnect(true);
			}
		}, 200);
	}, [arProvider.walletAddress]);

	const copyUrl = React.useCallback(async () => {
		if (arProvider.walletAddress) {
			await navigator.clipboard.writeText(
				`${getHashUrl(window.location.origin)}${urls.libraryAll(arProvider.walletAddress)}`
			);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	}, [arProvider.walletAddress]);

	return arProvider.walletAddress ? (
		<S.Wrapper>
			<S.HeaderWrapper>
				<S.HeaderContent>
					<S.HeaderContainer>
						<S.FlexHeader>
							<S.Header1>{LANGUAGE.account.header1}</S.Header1>
							&nbsp; &nbsp;
							<S.Header2Container>
								<S.Header2>{formatAddress(arProvider.walletAddress, true)}</S.Header2>
							</S.Header2Container>
						</S.FlexHeader>
					</S.HeaderContainer>
					<S.ShareWrapper>
						{copied && (
							<S.URLCopied>
								<p>{LANGUAGE.urlCopied}</p>
							</S.URLCopied>
						)}
						<Button
							type={'primary'}
							label={LANGUAGE.shareUrlLabel}
							handlePress={copyUrl}
							icon={ASSETS.shareLink}
							iconLeftAlign
						/>
					</S.ShareWrapper>
				</S.HeaderContent>
			</S.HeaderWrapper>
			<S.TabsWrapper>
				<URLTabs tabs={URLS.account} activeUrl={URLS.account[0]!.url} />
			</S.TabsWrapper>
		</S.Wrapper>
	) : (
		showWalletConnect && <WalletBlock />
	);
}

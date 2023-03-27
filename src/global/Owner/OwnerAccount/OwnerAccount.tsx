import React from 'react';
import { ReactSVG } from 'react-svg';

import { formatAddress, getHashUrl, getProfile, getTxEndpoint, ProfileType } from 'arcframework';

import { Button } from 'components/atoms/Button';
import { IconButton } from 'components/atoms/IconButton';
import { Loader } from 'components/atoms/Loader';
import { URLTabs } from 'components/organisms/URLTabs';
import { ASSETS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { TWITTER_ACCOUNT_REDIRECT } from 'helpers/paths';
import * as urls from 'helpers/urls';

import * as S from './styles';
import { IProps } from './types';

export default function OwnerAccount(props: IProps) {
	const [arProfile, setArProfile] = React.useState<ProfileType | null>(null);

	const [loading, setLoading] = React.useState<boolean>(true);
	const [urlCopied, setUrlCopied] = React.useState<boolean>(false);
	const [discordHandleCopied, setDiscordHandleCopied] = React.useState<boolean>(false);

	React.useEffect(() => {
		(async function () {
			if (props.walletAddress) {
				const profile = await getProfile(props.walletAddress);
				if (profile) {
					setArProfile(profile);
				}
				setLoading(false);
			}
		})();
	}, [props.walletAddress]);

	const copyUrl = React.useCallback(async () => {
		if (props.walletAddress) {
			await navigator.clipboard.writeText(
				`${getHashUrl(window.location.origin)}${urls.libraryAll(props.walletAddress)}`
			);
			setUrlCopied(true);
			setTimeout(() => setUrlCopied(false), 2000);
		}
	}, [props.walletAddress]);

	function handleTwitterAction() {
		window.open(TWITTER_ACCOUNT_REDIRECT(arProfile.twitter), '_blank');
	}

	const handleDiscordAction = React.useCallback(async () => {
		if (arProfile && arProfile.discord) {
			await navigator.clipboard.writeText(arProfile.discord);
			setDiscordHandleCopied(true);
			setTimeout(() => setDiscordHandleCopied(false), 2000);
		}
	}, [arProfile]);

	function getHeader() {
		if (loading) {
			return (
				<S.LP>
					<Loader placeholder />
				</S.LP>
			)
		}
		else {
			if (arProfile) {
				return (
					<S.ProfileWrapper>
						<S.ProfileFlex>
							<S.AvatarWrapper>
								{arProfile.avatar === 'ar://OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA' ? (
									<ReactSVG src={ASSETS.user} />
								) : (
									<S.Avatar src={getTxEndpoint(arProfile.avatar.substring(4))} />
								)}
							</S.AvatarWrapper>
							<S.Info>
								<p>{arProfile.handle}</p>
								&nbsp; &nbsp;
								<span>{formatAddress(props.walletAddress, true)}</span>
							</S.Info>
						</S.ProfileFlex>
						<S.SocialLinks>
							{arProfile.twitter && (
								<S.SocialLink>
									<IconButton type={'alt1'} src={ASSETS.social.twitter} handlePress={() => handleTwitterAction()} />
								</S.SocialLink>
							)}
							{arProfile.discord && (
								<S.SocialLink>
									{discordHandleCopied && (
										<S.DiscordHandleCopied>
											<p>{LANGUAGE.copied}</p>
										</S.DiscordHandleCopied>
									)}
									<IconButton type={'alt1'} src={ASSETS.social.discord} handlePress={() => handleDiscordAction()} />
								</S.SocialLink>
							)}
						</S.SocialLinks>
					</S.ProfileWrapper>
				);
			} else {
				return (
					<S.FlexHeader>
						<S.Header1>{props.header}</S.Header1>
						&nbsp; &nbsp;
						<S.Header2Container>
							<S.Header2>{formatAddress(props.walletAddress, true)}</S.Header2>
						</S.Header2Container>
					</S.FlexHeader>
				);
			}
		}
	}

	return (
		<S.Wrapper>
			<S.HeaderWrapper>
				<S.HeaderContent>
					<S.HeaderContainer>{getHeader()}</S.HeaderContainer>
					<S.ShareWrapper>
						{urlCopied && (
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
				<URLTabs tabs={props.tabs} activeUrl={props.tabs[0]!.url} />
			</S.TabsWrapper>
		</S.Wrapper>
	);
}

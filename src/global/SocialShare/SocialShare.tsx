import React from 'react';
import { TwitterShareButton } from 'react-share';
import { ReactSVG } from 'react-svg';

import { IconButton } from 'components/atoms/IconButton';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';

import * as S from './styles';
import { IProps } from './types';

export default function SocialShare(props: IProps) {
	const [copied, setCopied] = React.useState<boolean>(false);

	const copyUrl = React.useCallback(async () => {
		await navigator.clipboard.writeText(props.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [props.href]);

	return (
		<S.Wrapper>
			<S.Info alt1={props.type === 'alt1'}>
				{props.type === 'primary' && <ReactSVG src={ASSETS.shareLink} />}
				<p>{language.share.toUpperCase()}</p>
			</S.Info>
			<S.Actions>
				{copied && (
					<S.URLCopied>
						<p>{language.urlCopied}</p>
					</S.URLCopied>
				)}
				<IconButton type={props.type === 'primary' ? 'alt1' : 'alt2'} src={ASSETS.link} handlePress={copyUrl} />
				<TwitterShareButton title={props.title} url={props.href}>
					<S.Icon alt1={props.type === 'alt1'}>
						<ReactSVG src={ASSETS.social.twitter} />
					</S.Icon>
				</TwitterShareButton>
			</S.Actions>
		</S.Wrapper>
	);
}

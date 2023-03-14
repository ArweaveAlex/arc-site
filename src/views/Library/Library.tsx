import React from 'react';
import { useParams } from 'react-router-dom';

import { Button } from 'components/atoms/Button';
import { URLTabs } from 'components/organisms/URLTabs';
import { ASSETS, URLS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { formatAddress } from 'helpers/utils';

import * as S from './styles';

export default function Library() {
	const { id } = useParams();

	const [copied, setCopied] = React.useState<boolean>(false);

	const copyUrl = React.useCallback(async () => {
		await navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, []);

	return (
		<S.Wrapper>
			<S.HeaderWrapper>
				<S.HeaderContent>
					<S.HeaderContainer>
						<S.FlexHeader>
							<S.Header1>{LANGUAGE.library.header1}</S.Header1>
							&nbsp; &nbsp;
							<S.Header2Container>
								<S.Header2>{id ? formatAddress(id, true) : 'N/A'}</S.Header2>
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
				<URLTabs tabs={URLS.library} activeUrl={URLS.library[0]!.url(id)} />
			</S.TabsWrapper>
		</S.Wrapper>
	);
}

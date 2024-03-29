import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { formatAddress, formatDataSize, formatDate, getTxEndpoint, STORAGE } from 'arcframework';

import { IconButton } from 'components/atoms/IconButton';
import { ASSETS } from 'helpers/config';
import { language } from 'helpers/language';
import * as urls from 'helpers/urls';

import * as S from './styles';
import { IProps } from './types';

export default function ArtifactDetailSingle(props: IProps) {
	const [viewRaw, setViewRaw] = React.useState<boolean>(false);
	const [copied, setCopied] = React.useState<boolean>(false);

	const copyRawData = React.useCallback(async () => {
		await navigator.clipboard.writeText(props.data.rawData!);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [props.data.rawData]);

	return props.type && props.data ? (
		<S.Wrapper>
			<S.IconWrapper>
				<S.Icon>
					<ReactSVG src={props.type.icon} />
				</S.Icon>
			</S.IconWrapper>
			<S.Content>
				<S.ContentLine className={'border-wrapper-alt'}>
					<S.InfoData>
						<S.DataWrapper>
							<S.DataLine>
								<S.DataHeader>{language.owner}:&nbsp;</S.DataHeader>
								<Link to={`${urls.libraryAll(props.data.owner!)}`}>{formatAddress(props.data.owner, false)}</Link>
							</S.DataLine>
						</S.DataWrapper>
					</S.InfoData>
				</S.ContentLine>
				<S.ContentLine className={'border-wrapper-alt'}>
					<S.InfoData>
						<S.DataWrapper>
							<S.DataLine>
								<S.DataHeader>{language.createdOn}:&nbsp;</S.DataHeader>
								<p>{formatDate(props.data.minted, 'epoch')}</p>
							</S.DataLine>
							<S.WrapElement>
								<S.DataHeader>{language.pool.subheader1}:&nbsp;</S.DataHeader>
								<Link to={`${urls.pool}${props.data.poolId}`}>{props.data.poolName}</Link>
							</S.WrapElement>
						</S.DataWrapper>
					</S.InfoData>
				</S.ContentLine>
				<S.ContentLine className={'border-wrapper-alt'}>
					<S.InfoData>
						<span>{language.artifactDetail.title}</span>
						<S.BodyData>{props.data.ansTitle}</S.BodyData>
					</S.InfoData>
				</S.ContentLine>
				<S.ContentLine className={'border-wrapper-alt'}>
					{copied && (
						<S.RawDataCopied>
							<p>{language.copied}</p>
						</S.RawDataCopied>
					)}
					<S.InfoData>
						<S.RawContainer>
							<button onClick={() => setViewRaw(!viewRaw)}>{language.artifactDetail.viewRaw}</button>
							<IconButton type={'primary'} src={ASSETS.copy} handlePress={copyRawData} />
						</S.RawContainer>
						{viewRaw && (
							<S.RawData>
								<code>{props.data.rawData}</code>
							</S.RawData>
						)}
					</S.InfoData>
				</S.ContentLine>
				{JSON.parse(props.data.keywords).length > 1 && JSON.parse(props.data.keywords)[0] !== '' && (
					<S.ContentLine className={'border-wrapper-alt'}>
						<S.InfoData>
							<span>{language.artifactDetail.tags}</span>
							<S.Tags>
								{JSON.parse(props.data.keywords!).map((keyword: string, index: number) => [
									<S.Tag key={index}>
										<p>{keyword}</p>
									</S.Tag>,
								])}
							</S.Tags>
						</S.InfoData>
					</S.ContentLine>
				)}
				<S.ContentLine className={'border-wrapper-alt'}>
					<S.InfoData>
						<span>{language.artifactDetail.fileInformation}</span>
						<S.LinkWrapper>
							<S.DataLine>
								<ReactSVG src={ASSETS.artifact} />
								<p>{props.data.artifactName}</p>
							</S.DataLine>
						</S.LinkWrapper>
						<S.LinkWrapperAlt>
							<S.DataLine>
								<ReactSVG src={ASSETS.logoAlt2} />
								<S.DataUrl target={'_blank'} rel={'noreferrer'} href={getTxEndpoint(props.data.artifactId)}>
									{getTxEndpoint(props.data.artifactId)}
								</S.DataUrl>
							</S.DataLine>
						</S.LinkWrapperAlt>
						<S.LinkWrapper>
							<S.DataLine>
								<ReactSVG src={ASSETS.data} />
								<p>{formatDataSize(props.data.dataSize!)}</p>
							</S.DataLine>
						</S.LinkWrapper>
					</S.InfoData>
				</S.ContentLine>
				{props.data.originalUrl && props.data.originalUrl !== STORAGE.none && (
					<S.ContentLine className={'border-wrapper-alt'}>
						<S.InfoData>
							<S.DataWrapper>
								<S.DataLine>
									<S.DataHeader>{language.originalUrl}:&nbsp;</S.DataHeader>
									<Link to={props.data.originalUrl} target={'_blank'}>
										{props.data.originalUrl}
									</Link>
								</S.DataLine>
							</S.DataWrapper>
						</S.InfoData>
					</S.ContentLine>
				)}
			</S.Content>
		</S.Wrapper>
	) : null;
}

import React from 'react';
import { ReactSVG } from 'react-svg';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

import { formatNostrData } from 'helpers/utils';
import { formatDate, formatAddress } from 'helpers/utils';
import { LANGUAGE } from 'helpers/language';
import { STORAGE, ASSETS } from 'helpers/config';

import * as urls from 'helpers/urls';
import { IProps } from './types';
import * as S from './styles';


// TODO: Nostr Icon
export default function NostrListItem(props: IProps) {
	const [jsonData, setJsonData] = React.useState<any>(null);

	React.useEffect(() => {
		if (props.data && props.data.rawData) {
			setJsonData(JSON.parse(props.data.rawData));
		}
	}, [props.data]);

	function getProfileImage() {
		if (props.data && props.data.profileImagePath && props.data.profileImagePath !== STORAGE.none) {
			return (
				<S.ProfileImage>
					<img src={props.data.profileImagePath} alt={''} />
				</S.ProfileImage>
			);
		} else {
			return null;
		}
	}

	const artifactLink = props.data ? `${urls.artifact}${props.data.artifactId}` : '#';
	const ownerLink = props.data ? `${urls.libraryAll(props.data.owner)}` : '#';
	return props.data && jsonData ? (
		<S.LIWrapper isListItem={props.isListItem} active={props.active}>
			<S.LIContent>
				<S.LIHeader>
					<S.ProfileWrapper>
						{getProfileImage()}
						<S.NUContainer>
							<S.Name>
								{jsonData.profile && jsonData.profile.name
									? jsonData.profile.name
									: jsonData.profile.slice(0, 7) + '..' + jsonData.profile.slice(-3)}
							</S.Name>
							<S.Username>
								{jsonData.profile && jsonData.profile.name
									? jsonData.profile.name
									: jsonData.profile.slice(0, 7) + '..' + jsonData.profile.slice(-3)}
							</S.Username>
						</S.NUContainer>
					</S.ProfileWrapper>
					<S.AInfoWrapper>
						<S.ALinkWrapper>
							{props.active && (
								<S.ActiveContainer>
									<ReactSVG src={ASSETS.star} />
								</S.ActiveContainer>
							)}
							{props.showArtifactLink && (
								<>
									<S.ALink>
										<span>{`${LANGUAGE.artifact}:`}&nbsp;</span>
										<Link to={artifactLink}>
											{props.data ? formatAddress(props.data.artifactId, false) : null}
										</Link>
									</S.ALink>
									<S.ALinkNT>
										<Link to={artifactLink} target={'_blank'} tabIndex={-1}>
											<ReactSVG src={ASSETS.newTab} />
										</Link>
									</S.ALinkNT>
								</>
							)}
						</S.ALinkWrapper>
						<S.ALinkWrapper>
							{props.showOwnerLink && (
								<>
									<S.ALink>
										<span>{`${LANGUAGE.owner}:`}&nbsp;</span>
										<Link to={ownerLink}>
											{props.data ? formatAddress(props.data.owner, false) : null}
										</Link>
									</S.ALink>
									<S.ALinkNT>
										<Link to={ownerLink} target={'_blank'} tabIndex={-1}>
											<ReactSVG src={ASSETS.newTab} />
										</Link>
									</S.ALinkNT>
								</>
							)}
						</S.ALinkWrapper>
					</S.AInfoWrapper>
				</S.LIHeader>
				<S.LIBody>
					<S.Message>
						<p>{parse(formatNostrData(jsonData))}</p>
					</S.Message>
					{jsonData.post.created_at && (
						<S.PostDate>{formatDate(jsonData.post.created_at * 1000, 'iso')}</S.PostDate>
					)}
				</S.LIBody>
			</S.LIContent>
		</S.LIWrapper>
	) : null;
}

import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

<<<<<<< HEAD
import { ARTIFACT_TYPES, STORAGE, TAGS } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import { GQLResponseType, KeyValueType } from 'helpers/types';
import * as urls from 'helpers/urls';
import { formatArtifactType, getTagValue } from 'helpers/utils';
=======
import { formatArtifactType, getTagValue, GQLResponseType, STORAGE, TAGS } from 'arcframework';

import { ARTIFACT_TYPES } from 'helpers/config';
import { LANGUAGE } from 'helpers/language';
import * as urls from 'helpers/urls';
>>>>>>> dev

import * as S from './styles';
import { IProps } from './types';

export default function PoolRecentlyMinted(props: IProps) {
	function getArtifactType(type: string) {
		let artifactType = ARTIFACT_TYPES[type];
		if (artifactType) {
			return artifactType;
		} else {
			return ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
		}
	}

	function getArtifactLink(id: string, tags: { [key: string]: any }[]) {
		let redirect: string;
		const associationId = getTagValue(tags, TAGS.keys.associationId);
		const artifactType = getTagValue(tags, TAGS.keys.artifactType);

		if (associationId && associationId !== STORAGE.none) {
			redirect = `${urls.thread}${associationId}/${id}?type=${artifactType}`;
		} else {
			redirect = `${urls.artifact}${id}`;
		}

		return redirect;
	}

	function getData() {
		if (props.data && props.data.contracts.length > 0) {
			return (
				<>
					{props.data.contracts.map((element: GQLResponseType, index: number) => {
						const type = getArtifactType(getTagValue(element.node.tags, TAGS.keys.artifactType));
						return (
							<S.NLWrapper key={index}>
								<S.NodeWrapper>
									<Link to={getArtifactLink(element.node.id, element.node.tags)}>
										<S.TypeLabel>
											<p>{formatArtifactType(type.label)}</p>
										</S.TypeLabel>
										<S.Icon>
											<ReactSVG src={type.icon} />
										</S.Icon>
										<S.Info>
											<S.InfoTitle>
												<p>{getTagValue(element.node.tags, TAGS.keys.artifactName)}</p>
											</S.InfoTitle>
										</S.Info>
									</Link>
								</S.NodeWrapper>
								<S.ALinkNT>
									<Link to={getArtifactLink(element.node.id, element.node.tags)} target={'_blank'}>
										{LANGUAGE.openInNewTab}
									</Link>
								</S.ALinkNT>
							</S.NLWrapper>
						);
					})}
				</>
			);
		} else if (props.data && props.data.contracts.length <= 0) {
			return (
				<S.NoArtifactsContainer>
					<p>{LANGUAGE.noArtifacts}</p>
				</S.NoArtifactsContainer>
			);
		} else {
			return (
				<>
					{Array.from({ length: 5 }, (_, i) => i + 1).map((element: number) => {
						return <S.Placeholder key={element} />;
					})}
				</>
			);
		}
	}

	return (
		<S.Wrapper>
			<S.Header>
				<h2>{LANGUAGE.recentlyMintedArtifacts}</h2>
			</S.Header>
			<S.Body>{getData()}</S.Body>
		</S.Wrapper>
	);
}

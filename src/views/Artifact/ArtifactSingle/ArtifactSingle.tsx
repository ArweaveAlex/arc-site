import React from 'react';

import { ArtifactEnum, checkNullValues, TAGS } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { FileMetadata } from 'global/FileMetadata';
import { ARTIFACT_TABS, ARTIFACT_TYPES, TAB_OPTIONS } from 'helpers/config';
import { language } from 'helpers/language';
import { useFileTx } from 'hooks/useFileTx';

import { ArtifactActionsSingle } from './ArtifactActionsSingle';
import { ArtifactDetailSingle } from './ArtifactDetailSingle';
import { ArtifactHeaderSingle } from './ArtifactHeaderSingle';
import { ArtifactRendererSingle } from './ArtifactRendererSingle';
import * as S from './styles';
import { IProps } from './types';

// TODO: file download
export default function ArtifactSingle(props: IProps) {
	const txData = useFileTx(props.data.rawData);

	const [currentTab, setCurrentTab] = React.useState<string>(ARTIFACT_TABS[0]!.label);

	const [artifactType, setArtifactType] = React.useState<{ label: string; icon: string } | null>(null);

	React.useEffect(() => {
		if (props.data) {
			let artifactType = ARTIFACT_TYPES[props.data.artifactType];
			if (artifactType) {
				setArtifactType(artifactType);
			} else {
				setArtifactType(ARTIFACT_TYPES[TAGS.values.defaultArtifactType]);
			}
		}
	}, [props.data]);

	function handleTabClick(label: string) {
		setCurrentTab(label);
	}

	function getArtifactType() {
		if (props.data) {
			let artifactType = ARTIFACT_TYPES[props.data.artifactType];
			if (artifactType) {
				return artifactType;
			} else {
				return ARTIFACT_TYPES[TAGS.values.defaultArtifactType]!;
			}
		} else {
			return null;
		}
	}

	function getArtifact() {
		if (props.data && artifactType) {
			switch (currentTab) {
				case TAB_OPTIONS.view:
					return <ArtifactRendererSingle artifactId={props.data.artifactId} artifactType={artifactType.label} />;
				case TAB_OPTIONS.details:
					return <ArtifactDetailSingle data={props.data} type={artifactType} />;
				default:
					return <ArtifactDetailSingle data={props.data} type={getArtifactType()} />;
			}
		} else {
			return <Loader />;
		}
	}

	function getMetadata() {
		switch (artifactType.label) {
			case ArtifactEnum.Image:
			case ArtifactEnum.Ebook:
			case ArtifactEnum.Audio:
			case ArtifactEnum.Video:
			case ArtifactEnum.Document:
			case ArtifactEnum.File:
				return <FileMetadata metadata={txData.metadata} />;
			default:
				return null;
		}
	}

	function validateData() {
		if (props.data) {
			return !checkNullValues(props.data);
		} else {
			return false;
		}
	}

	function getData() {
		if (validateData()) {
			return (
				<S.Wrapper>
					<S.Content>
						<ArtifactHeaderSingle
							data={props.data}
							type={getArtifactType()}
							onTabPropClick={(label: string) => handleTabClick(label)}
						/>
						<ArtifactActionsSingle data={props.data} />
						<S.FlexWrapper>
							<S.ArtifactWrapper>{getArtifact()}</S.ArtifactWrapper>
						</S.FlexWrapper>
						{getMetadata()}
					</S.Content>
				</S.Wrapper>
			);
		} else {
			return (
				<S.MessageContainer>
					<p>{language.errorFetchingArtifact}</p>
				</S.MessageContainer>
			);
		}
	}

	return props.data && artifactType ? <>{getData()}</> : <Loader />;
}

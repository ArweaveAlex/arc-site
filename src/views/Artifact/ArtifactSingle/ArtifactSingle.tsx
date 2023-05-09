import React from 'react';

import { ArtifactDetailType, checkNullValues, TAGS } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { ARTIFACT_TABS, ARTIFACT_TYPES, TAB_OPTIONS } from 'helpers/config';
import { language } from 'helpers/language';

import { ArtifactActionsSingle } from './ArtifactActionsSingle';
import { ArtifactDetailSingle } from './ArtifactDetailSingle';
import { ArtifactHeaderSingle } from './ArtifactHeaderSingle';
import { ArtifactRendererSingle } from './ArtifactRendererSingle';
import * as S from './styles';
import { IProps } from './types';

export default function ArtifactSingle(props: IProps) {
	const [data, setData] = React.useState<ArtifactDetailType | null>(null);
	const [currentTab, setCurrentTab] = React.useState<string>(ARTIFACT_TABS[0]!.label);

	React.useEffect(() => {
		if (props.data) {
			setData(props.data);
		}
	}, [props.data]);

	function handleTabClick(label: string) {
		setCurrentTab(label);
	}

	function getArtifactType() {
		if (data) {
			let artifactType = ARTIFACT_TYPES[data.artifactType];
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
		if (data) {
			switch (currentTab) {
				case TAB_OPTIONS.view:
					return <ArtifactRendererSingle artifactId={data.artifactId} />;
				case TAB_OPTIONS.details:
					return <ArtifactDetailSingle data={data} type={getArtifactType()} />;
				default:
					return <ArtifactDetailSingle data={data} type={getArtifactType()} />;
			}
		} else {
			return <Loader />;
		}
	}

	function validateData() {
		if (data) {
			return !checkNullValues(data);
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
							data={data}
							type={getArtifactType()}
							onTabPropClick={(label: string) => handleTabClick(label)}
						/>
						<ArtifactActionsSingle data={data} />
						<S.FlexWrapper>
							<S.ArtifactWrapper>{getArtifact()}</S.ArtifactWrapper>
						</S.FlexWrapper>
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

	return data ? <>{getData()}</> : <Loader />;
}

import { TAGS } from 'arcframework';

import { Loader } from 'components/atoms/Loader';
import { ARTIFACT_TYPES } from 'helpers/config';

import { ArtifactDetailSingle } from '../../ArtifactDetailSingle';
import { IProps } from '../../types';

import ArtifactCsvSingle from './ArtifactCsvSingle/ArtifactCsvSingle';
import ArtifactPdfSingle from './ArtifactPdfSingle/ArtifactPdfSingle';
import ArtifactTxtSingle from './ArtifactTxtSingle/ArtifactTxtSingle';

// TODO: useFile hook
export default function ArtifactDocumentSingle(props: IProps) {
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

	function getDetailData() {
		if (!props.data) {
			return <Loader />;
		} else {
			let renderer = <ArtifactDetailSingle data={props.data} type={getArtifactType()} />;
			switch (props.data.fileType) {
				case 'txt':
					renderer = <ArtifactTxtSingle data={props.data}></ArtifactTxtSingle>;
					break;
				case 'pdf':
					renderer = <ArtifactPdfSingle data={props.data}></ArtifactPdfSingle>;
					break;
				case 'csv':
					renderer = <ArtifactCsvSingle data={props.data}></ArtifactCsvSingle>;
					break;
			}
			return renderer;
		}
	}

	return <>{getDetailData()}</>;
}

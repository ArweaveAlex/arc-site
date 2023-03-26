import { getArtifactsByPool } from 'arcframework';

import { ArtifactsDetail } from 'global/ArtifactsDetail';

import { IProps } from './types';

export default function PoolDetail(props: IProps) {
	return (
		<ArtifactsDetail
			id={props.id}
			indexIds={[props.id.value]}
			cursorObject={props.cursorObject}
			defaultFetch={{
				ids: [props.id.value],
				fn: getArtifactsByPool,
			}}
			showActions={true}
			showPoolIds={false}
			showSearch={false}
			bookmarksDisabled={true}
			selectCallback={null}
			selectedCallbackIds={null}
			disabledSelectedCallbackIds={null}
			owner={null}
			uploader={props.uploader}
			usePreviewModal={true}
		/>
	);
}
